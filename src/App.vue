<script setup>
import { Icon } from '@iconify/vue';
import AppNavbar from './components/partials/AppNavbar.vue';
import BaseCard from './components/base/BaseCard.vue';
import BaseButton from './components/base/BaseButton.vue';
import BaseDropdownItem from './components/base/BaseDropdownItem.vue';
import HabitDeleteConfirm from './features/habit/components/HabitDeleteConfirm.vue';
import { onUnmounted, reactive, ref } from 'vue';
import HabitFormModal from './features/habit/components/HabitFormModal.vue';
import { HabitService } from './features/habit/habit.service';
import { emitter } from './core/emitter';

const habits = ref([]);

const deleteConfirm = reactive({
  visible: false,
});
const formModal = reactive({
  visible: false,
  habit: null,
});

function getPercent(done, target) {
  if (done >= target) {
    return 100;
  }

  return (done / target) * 100;
}
function loadHabits() {
  habits.value = HabitService.getAll();
}

function onOpenCreate() {
  formModal.habit = null;
  formModal.visible = true;
}
function onOpenEdit(habit) {
  formModal.habit = habit;
  formModal.visible = true;
}

emitter.on('create-habit', onOpenCreate);

onUnmounted(() => {
  emitter.off('create-habit', onOpenCreate);
});

loadHabits();
</script>

<template>
  <div
    class="text-gray-900 min-h-screen bg-gray-100 pb-8 dark:bg-gray-900 dark:text-white"
  >
    <AppNavbar />
    <div class="container px-4 mx-auto py-6 xl:py-8 space-y-4">
      <div
        v-if="!habits.length"
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
      <template v-else>
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <BaseCard
            v-for="(habit, index) in habits"
            :key="habit.id"
            class="border border-gray-200 p-4 flex flex-col justify-between gap-4"
          >
            <div class="flex items-center justify-between">
              <p class="font-bold flex items-center gap-2 text-lg">
                <Icon :icon="habit.icon" />
                {{ habit.name }}
              </p>
              <VDropdown placement="bottom-end">
                <button class="text-gray-500 dark:text-gray-400 cursor-pointer">
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
                      @click="deleteConfirm.visible = true"
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
              <p class="text-sm text-gray-500 dark:text-gray-400">Hari ini</p>
              <div class="flex items-center justify-end gap-2">
                <button
                  :disabled="habit.done === 0"
                  class="w-8 h-8 flex items-center justify-center rounded border border-gray-200 cursor-poiner hover:bg-gray-100 disabled:bg-gray-100 disabled:opacity-50 dark:border-gray-700"
                  @click="habits[index].done--"
                >
                  <Icon icon="tabler:minus" />
                </button>
                <p class="font-bold text-xl">{{ habit.done }}x</p>
                <button
                  class="w-8 h-8 flex items-center justify-center rounded border border-gray-200 cursor-poiner hover:bg-gray-100 disabled:bg-gray-100 disabled:opacity-50 dark:border-gray-700"
                  @click="habits[index].done++"
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
      </template>
    </div>
  </div>

  <HabitDeleteConfirm v-model:visible="deleteConfirm.visible" />
  <HabitFormModal
    :habit="formModal.habit"
    v-model:visible="formModal.visible"
    @saved="loadHabits"
  />
</template>
