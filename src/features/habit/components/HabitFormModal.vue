<script setup>
import { reactive, ref } from 'vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseFormItem from '../../../components/base/BaseFormItem.vue';
import BaseInput from '../../../components/base/BaseInput.vue';
import BaseModal from '../../../components/base/BaseModal.vue';
import BaseRadio from '../../../components/base/BaseRadio.vue';
import HabitIconDropdown from './HabitIconDropdown.vue';
import { useHabit } from '../habit.compose.js';
import BaseAlert from '../../../components/base/BaseAlert.vue';

const props = defineProps({
  habit: Object,
});
const emit = defineEmits(['saved']);
const visible = defineModel('visible');

const { createHabit, updateHabit } = useHabit();

const form = reactive({
  name: null,
  icon: 'twemoji:star',
  reset: 'daily',
  target: null,
});
const loadingSubmit = ref(false);
const error = ref(null);

function resetForm() {
  form.name = null;
  form.icon = 'twemoji:star';
  form.reset = 'daily';
  form.target = null;
}
function setEditForm() {
  form.name = props.habit.name;
  form.icon = props.habit.icon;
  form.reset = props.habit.reset;
  form.target = props.habit.target;
}

function onOpen() {
  error.value = null;

  if (props.habit) {
    setEditForm();
  } else {
    resetForm();
  }
}
async function onSubmit() {
  loadingSubmit.value = true;
  error.value = null;

  const [res, err] = props.habit
    ? await updateHabit(props.habit.id, form)
    : await createHabit(form);

  if (err) {
    error.value = 'Gagal membuat habit baru, silakan coba lagi';
  } else {
    emit('saved');

    visible.value = false;
  }

  loadingSubmit.value = false;
}
</script>

<template>
  <BaseModal
    :title="`${props.habit ? 'Edit' : 'Tambah'} Habit`"
    width="md"
    v-model:visible="visible"
    @open="onOpen"
  >
    <form class="space-y-4" id="habit_form" @submit.prevent="onSubmit">
      <BaseAlert v-if="error" with-close>
        {{ error }}
      </BaseAlert>
      <BaseFormItem label="Name" v-slot="{ id }">
        <div class="flex items-stretch">
          <HabitIconDropdown container="#habit_form" v-model="form.icon" />
          <BaseInput
            type="text"
            :id="id"
            placeholder="Ngoding"
            class="rounded-l-none border-l-0"
            required
            v-model="form.name"
          />
        </div>
      </BaseFormItem>
      <BaseFormItem label="Reset">
        <div class="flex gap-4">
          <BaseRadio
            name="habit_form_reset"
            input-value="daily"
            label="Harian"
            required
            v-model="form.reset"
          />
          <BaseRadio
            name="habit_form_reset"
            input-value="weekly"
            label="Mingguan"
            required
            v-model="form.reset"
          />
          <BaseRadio
            name="habit_form_reset"
            input-value="monthly"
            label="Bulanan"
            required
            v-model="form.reset"
          />
        </div>
      </BaseFormItem>
      <BaseFormItem label="Target" v-slot="{ id }">
        <BaseInput
          type="number"
          :id="id"
          placeholder="10"
          required
          v-model="form.target"
        />
      </BaseFormItem>
    </form>

    <template #footer="{ close }">
      <div class="flex justify-end gap-2">
        <BaseButton
          :loading="loadingSubmit"
          type="submit"
          form="habit_form"
          color="primary"
          >Simpan</BaseButton
        >
        <BaseButton @click="close">Tutup</BaseButton>
      </div>
    </template>
  </BaseModal>
</template>
