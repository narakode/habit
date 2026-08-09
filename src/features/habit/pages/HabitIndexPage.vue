<script setup>
import { Icon } from '@iconify/vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseDropdownItem from '../../../components/base/BaseDropdownItem.vue';
import HabitDeleteConfirm from '../components/HabitDeleteConfirm.vue';
import { onUnmounted, reactive, ref } from 'vue';
import HabitFormModal from '../components/HabitFormModal.vue';
import { HabitService } from '../habit.service';
import { emitter } from '../../../core/emitter';
import { getPercent } from '../../../utils/math';
import {
  habits,
  progress,
  loaded,
  loadHabits,
  updateDone,
} from '../habit.compose.js';
import BaseSkeleton from '../../../components/base/BaseSkeleton.vue';
import BaseWidget from '../../../components/base/BaseWidget.vue';
import {
  currentStreak,
  todayStreak,
} from '../../user-streak/user-streak.compose.js';
import HabitCard from '../components/HabitCard.vue';

const loadingPage = ref(true);

const deleteConfirm = reactive({
  id: null,
  visible: false,
});
const formModal = reactive({
  visible: false,
  habit: null,
});

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
            name="Target"
            :value="progress.value"
            unit="%"
          >
            <template #add-content>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {{ progress.done }}/{{ progress.total }}
              </p>
            </template>
          </BaseWidget>
        </div>
        <hr class="border-gray-300 border-dashed dark:border-gray-800" />
        <div class="space-y-4">
          <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <HabitCard
              v-for="habit in habits.data"
              :key="habit.id"
              :habit="habit"
              @edit="onOpenEdit(habit)"
              @delete="onOpenDelete(habit)"
            />
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
