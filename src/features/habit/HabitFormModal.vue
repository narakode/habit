<script setup>
import BaseButton from '../../components/base/BaseButton.vue';
import BaseFormItem from '../../components/base/BaseFormItem.vue';
import BaseInput from '../../components/base/BaseInput.vue';
import BaseModal from '../../components/base/BaseModal.vue';
import BaseRadio from '../../components/base/BaseRadio.vue';
import HabitIconDropdown from './HabitIconDropdown.vue';
</script>

<template>
  <BaseModal title="Tambah Habit Baru" width="md">
    <form action="" class="space-y-4" id="habbit_form">
      <BaseFormItem label="Name" v-slot="{ id }">
        <div class="flex items-stretch">
          <HabitIconDropdown container="#habbit_form" />
          <BaseInput
            type="text"
            :id="id"
            placeholder="Ngoding"
            class="rounded-l-none border-l-0"
          />
        </div>
      </BaseFormItem>
      <BaseFormItem label="Reset">
        <div class="flex gap-4">
          <BaseRadio name="habbit_form_reset" label="Harian" />
          <BaseRadio name="habbit_form_reset" label="Mingguan" />
          <BaseRadio name="habbit_form_reset" label="Bulanan" />
        </div>
      </BaseFormItem>
      <BaseFormItem label="Target" v-slot="{ id }">
        <BaseInput type="number" :id="id" placeholder="10" class="" />
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
