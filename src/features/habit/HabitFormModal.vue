<script setup>
import { reactive } from 'vue';
import BaseButton from '../../components/base/BaseButton.vue';
import BaseFormItem from '../../components/base/BaseFormItem.vue';
import BaseInput from '../../components/base/BaseInput.vue';
import BaseModal from '../../components/base/BaseModal.vue';
import BaseRadio from '../../components/base/BaseRadio.vue';
import HabitIconDropdown from './HabitIconDropdown.vue';

const form = reactive({
  name: null,
  icon: 'twemoji:star',
  reset: 'daily',
  target: null,
});

function resetForm() {
  form.name = null;
  form.icon = 'twemoji:star';
  form.reset = 'daily';
  form.target = null;
}
</script>

<template>
  <BaseModal title="Tambah Habit Baru" width="md" @open="resetForm">
    <form action="" class="space-y-4" id="habbit_form">
      <BaseFormItem label="Name" v-slot="{ id }">
        <div class="flex items-stretch">
          <HabitIconDropdown container="#habbit_form" v-model="form.icon" />
          <BaseInput
            type="text"
            :id="id"
            placeholder="Ngoding"
            class="rounded-l-none border-l-0"
            v-model="form.name"
          />
        </div>
      </BaseFormItem>
      <BaseFormItem label="Reset">
        <div class="flex gap-4">
          <BaseRadio
            name="habbit_form_reset"
            input-value="daily"
            label="Harian"
            v-model="form.reset"
          />
          <BaseRadio
            name="habbit_form_reset"
            input-value="weekly"
            label="Mingguan"
            v-model="form.reset"
          />
          <BaseRadio
            name="habbit_form_reset"
            input-value="monthly"
            label="Bulanan"
            v-model="form.reset"
          />
        </div>
      </BaseFormItem>
      <BaseFormItem label="Target" v-slot="{ id }">
        <BaseInput
          type="number"
          :id="id"
          placeholder="10"
          v-model="form.target"
        />
      </BaseFormItem>
    </form>

    <template #footer="{ close }">
      <div class="flex justify-end gap-2">
        <BaseButton color="primary">Simpan</BaseButton>
        <BaseButton @click="close">Tutup</BaseButton>
      </div>
    </template>
  </BaseModal>
</template>
