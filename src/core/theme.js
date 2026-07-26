import { ref } from 'vue';

export const theme = ref(
  document.documentElement.classList.contains('dark') ? 'dark' : 'light',
);

export function toggle() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';

  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', theme.value);
}
