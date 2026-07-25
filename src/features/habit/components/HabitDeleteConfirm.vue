<script setup>
import BaseConfirm from '../../../components/base/BaseConfirm.vue';
import { HabitService } from '../habit.service';

const props = defineProps({
  id: null,
});
const emit = defineEmits(['deleted']);
const visible = defineModel('visible');

function onConfirm() {
  HabitService.delete(props.id);

  visible.value = false;

  emit('deleted');
}
</script>

<template>
  <BaseConfirm
    title="Hapus Habit"
    message="Apakah anda yakin ingin menghapus habit ini?"
    confirm-text="Hapus"
    cancel-text="Batal"
    v-model:visible="visible"
    @confirm="onConfirm"
  />
</template>
