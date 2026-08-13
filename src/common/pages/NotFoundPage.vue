<script setup>
import BaseState from '../../components/base/BaseState.vue';
</script>

<template>
  <BaseState
    icon="tabler:ghost-3"
    title="Page Not Found"
    description="The requested page could not be found."
    action="Back"
    action-icon="tabler:arrow-back-up"
    @click-action="$router.back()"
  />
</template>
