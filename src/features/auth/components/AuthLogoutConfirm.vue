<script setup>
import { ref } from 'vue';
import BaseConfirm from '../../../components/base/BaseConfirm.vue';
import { AuthService } from '../../../core/auth/auth.service';
import { useRouter } from 'vue-router';

const router = useRouter();
const loading = ref(false);

async function onConfirm() {
  loading.value = true;

  const [, err] = await AuthService.logout();

  if (!err) {
    router.push({ name: 'login' });
  }

  loading.value = false;
}
</script>

<template>
  <BaseConfirm
    title="Logout"
    message="Apakah anda yakin ingin keluar dari aplikasi?"
    confirm-text="Logout"
    cancel-text="Batal"
    :loading="loading"
    @confirm="onConfirm"
  />
</template>
