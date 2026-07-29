<script setup>
import { ref } from 'vue';
import BaseConfirm from '../../../components/base/BaseConfirm.vue';
import { useHabit } from '../habit.compose';

const props = defineProps({
  id: null,
});
const emit = defineEmits(['deleted']);
const visible = defineModel('visible');

const { deleteHabit } = useHabit();

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
    title="Hapus Habit"
    message="Apakah anda yakin ingin menghapus habit ini?"
    :loading="loadingDelete"
    confirm-text="Hapus"
    cancel-text="Batal"
    v-model:visible="visible"
    @confirm="onConfirm"
  />
</template>
