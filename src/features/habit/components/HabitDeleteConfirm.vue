<script setup>
import { ref } from 'vue';
import BaseConfirm from '../../../components/base/BaseConfirm.vue';
import { deleteHabit } from '../habit.compose';

const props = defineProps({
  id: null,
});
const emit = defineEmits(['deleted']);
const visible = defineModel('visible');

const loadingDelete = ref(false);

async function onConfirm() {
  loadingDelete.value = true;
  await deleteHabit(props.id);
  loadingDelete.value = false;

  visible.value = false;

  emit('deleted');
}
</script>

<template>
  <BaseConfirm
    title="Delete Habit"
    message="Are you sure you want to delete this habit?"
    :loading="loadingDelete"
    confirm-text="Delete"
    cancel-text="Cancel"
    v-model:visible="visible"
    @confirm="onConfirm"
  />
</template>
