<script setup>
import { Icon } from '@iconify/vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseDropdownItem from '../../../components/base/BaseDropdownItem.vue';
import HabitDeleteConfirm from '../components/HabitDeleteConfirm.vue';
import { onUnmounted, reactive, ref } from 'vue';
import HabitFormModal from '../components/HabitFormModal.vue';
import { HabitService } from '../habit.service';
import { emitter } from '../../../core/emitter';
import { getPercent } from '../../../utils/math';
import { habits, loaded, loadHabits, updateDone } from '../habit.compose.js';
import BaseSkeleton from '../../../components/base/BaseSkeleton.vue';
import BaseWidget from '../../../components/base/BaseWidget.vue';
import {
  currentStreak,
  todayStreak,
} from '../../user-streak/user-streak.compose.js';

const loadingPage = ref(true);

const deleteConfirm = reactive({
  id: null,
  visible: false,
});
const formModal = reactive({
  visible: false,
  habit: null,
});

const targetLabel = {
  daily: 'Hari ini',
  weekly: 'Minggu ini',
  yearly: 'Bulan ini',
};

function onOpenCreate() {
  formModal.habit = null;
  formModal.visible = true;
}
function onOpenEdit(habit) {
  formModal.habit = habit;
  formModal.visible = true;
}
function onOpenDelete(habit) {
  deleteConfirm.id = habit.id;
  deleteConfirm.visible = true;
}

emitter.on('create-habit', onOpenCreate);

onUnmounted(() => {
  emitter.off('create-habit', onOpenCreate);
});
</script>

<template>
  <div class="space-y-4 pb-8">
    <div v-if="!loaded" class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <BaseSkeleton v-for="i in 6" :key="i" class="h-40" />
    </div>

    <template v-else>
      <div
        v-if="!habits.data.length"
        class="flex flex-col items-center text-center gap-4"
      >
        <Icon
          icon="tabler:clipboard-plus"
          class="size-14 text-gray-300 dark:text-gray-700"
        />
        <p class="font-bold text-3xl">Belum ada habit</p>
        <p class="text-gray-600 dark:text-gray-400">
          Anda belum memiliki habit untuk dilakukan, tambahkan satu habit.
        </p>
        <BaseButton color="primary" icon="tabler:plus" @click="onOpenCreate">
          Tambah Habit
        </BaseButton>
      </div>
      <div v-else class="space-y-6">
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <BaseWidget
            icon="twemoji:fire"
            name="Streak Saat Ini"
            :value="currentStreak"
            unit="hari"
          >
            <template #add-content>
              <p
                class="text-sm text-gray-600 dark:text-gray-400 flex gap-1.5 items-center"
              >
                <Icon
                  :icon="
                    currentStreak === 0
                      ? 'tabler:info-square-rounded'
                      : todayStreak
                        ? 'tabler:check'
                        : 'tabler:alert-triangle'
                  "
                  :class="
                    currentStreak === 0
                      ? ''
                      : todayStreak
                        ? 'text-green-600'
                        : 'text-yellow-600'
                  "
                />
                {{
                  currentStreak === 0
                    ? 'Tambah aktivitas untuk mulai streak'
                    : todayStreak
                      ? 'Streak lanjut hari ini'
                      : 'Tambah aktivitas untuk lanjut streak'
                }}
              </p>
            </template>
          </BaseWidget>
          <BaseWidget
            icon="twemoji:check-mark-button"
            name="Target Hari Ini"
            :value="80"
            unit="%"
          >
            <template #add-content>
              <p class="text-sm text-gray-600 dark:text-gray-400">8/10</p>
            </template>
          </BaseWidget>
        </div>
        <hr class="border-gray-300 border-dashed dark:border-gray-800" />
        <div class="space-y-4">
          <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <BaseCard
              v-for="habit in habits.data"
              :key="habit.id"
              bordered
              class="flex flex-col justify-between gap-4"
            >
              <div class="flex items-center justify-between">
                <p class="font-bold flex items-center gap-2 text-lg">
                  <Icon :icon="habit.icon" />
                  {{ habit.name }}
                </p>
                <VDropdown placement="bottom-end">
                  <button
                    class="text-gray-500 dark:text-gray-400 cursor-pointer"
                  >
                    <Icon icon="tabler:dots" />
                  </button>

                  <template #popper>
                    <div class="py-1 min-w-30">
                      <BaseDropdownItem
                        icon="tabler:edit"
                        @click="onOpenEdit(habit)"
                        >Edit</BaseDropdownItem
                      >
                      <BaseDropdownItem
                        icon="tabler:trash"
                        @click="onOpenDelete(habit)"
                        >Delete</BaseDropdownItem
                      >
                    </div>
                  </template>
                </VDropdown>
              </div>
              <div v-if="habit.target" class="space-y-1">
                <div class="w-full h-1.5 bg-gray-100 rounded dark:bg-gray-700">
                  <div
                    class="bg-sky-600 h-full rounded dark:bg-sky-400"
                    :style="{
                      width: `${getPercent(habit.done, habit.target)}%`,
                    }"
                  ></div>
                </div>
                <div
                  class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400"
                >
                  <span>{{ habit.done }}/{{ habit.target }}</span>
                  <span>{{ getPercent(habit.done, habit.target) }} %</span>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ targetLabel[habit.reset] }}
                </p>
                <div class="flex items-center justify-end gap-2">
                  <button
                    :disabled="habit.done === 0"
                    class="w-8 h-8 flex items-center justify-center rounded border border-gray-200 cursor-poiner hover:bg-gray-100 disabled:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-700 dark:disabled:bg-gray-700"
                    @click="updateDone(habit.id, -1)"
                  >
                    <Icon icon="tabler:minus" />
                  </button>
                  <p class="font-bold text-xl">{{ habit.done }}x</p>
                  <button
                    class="w-8 h-8 flex items-center justify-center rounded border border-gray-200 cursor-poiner hover:bg-gray-100 disabled:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:hover:bg-gray-700 dark:disabled:bg-gray-700"
                    @click="updateDone(habit.id, 1)"
                  >
                    <Icon icon="tabler:plus" />
                  </button>
                </div>
              </div>
            </BaseCard>
          </div>
          <BaseButton
            class="hidden md:flex items-center gap-2"
            color="primary"
            icon="tabler:plus"
            @click="onOpenCreate"
          >
            Tambah Habit
          </BaseButton>
        </div>
      </div>
    </template>

    <HabitDeleteConfirm
      :id="deleteConfirm.id"
      v-model:visible="deleteConfirm.visible"
    />
    <HabitFormModal
      :habit="formModal.habit"
      v-model:visible="formModal.visible"
    />
  </div>
</template>
