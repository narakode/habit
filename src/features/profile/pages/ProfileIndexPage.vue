<script setup>
import { ref } from 'vue';
import BaseButton from '../../../components/base/BaseButton.vue';
import BaseCard from '../../../components/base/BaseCard.vue';
import { user, userProfile } from '../../../core/auth/auth';
import { formatDate } from '../../../utils/date';
import AuthLogoutConfirm from '../../auth/components/AuthLogoutConfirm.vue';

const logoutVisible = ref(false);
</script>

<template>
  <BaseCard bordered class="mb-4">
    <h1 class="font-bold text-3xl mb-4">Profile</h1>
    <dl class="space-y-4">
      <div class="space-y-0.5">
        <dt class="text-sm text-gray-600 dark:text-gray-400">Nama</dt>
        <dd>{{ user ? user.user_metadata.name : '-' }}</dd>
      </div>
      <div class="space-y-0.5">
        <dt class="text-sm text-gray-600 dark:text-gray-400">Email</dt>
        <dd>{{ user ? user.email : '-' }}</dd>
      </div>
      <div class="space-y-0.5">
        <dt class="text-sm text-gray-600 dark:text-gray-400">
          Tanggal Bergabung
        </dt>
        <dd>
          {{
            user ? formatDate(new Date(user.created_at), 'DD MMMM YYYY') : '-'
          }}
        </dd>
      </div>
      <div class="space-y-0.5">
        <dt class="text-sm text-gray-600 dark:text-gray-400">Zona Waktu</dt>
        <dd>{{ userProfile ? userProfile.timezone : '-' }}</dd>
      </div>
    </dl>
  </BaseCard>
  <BaseButton
    icon="tabler:logout"
    color="error"
    class="w-full sm:w-auto"
    @click="logoutVisible = true"
    >Logout</BaseButton
  >
  <AuthLogoutConfirm v-model:visible="logoutVisible" />
</template>
