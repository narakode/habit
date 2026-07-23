<script setup>
import BaseButton from '../../components/base/BaseButton.vue';
import BaseModal from '../../components/base/BaseModal.vue';
</script>

<template>
  <BaseModal title="Tambah Habit Baru" width="md">
    <div>
      <label>Nama</label>
      <input type="text" name="" id="" placeholder="Nama" />
    </div>

    <template #footer="{ close }">
      <div class="flex justify-end gap-2">
        <BaseButton color="primary">Simpan</BaseButton>
        <BaseButton @click="close">Tutup</BaseButton>
      </div>
    </template>
  </BaseModal>
</template>
