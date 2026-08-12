<script setup>
import BaseState from '../../components/base/BaseState.vue';
</script>

<template>
  <BaseState
    icon="tabler:ghost-3"
    title="Halaman Tidak Ditemukan"
    description="Halaman yang diakses tidak dapat ditemukan"
    action="Kembali"
    action-icon="tabler:arrow-back-up"
    @click-action="$router.back()"
  />
</template>
