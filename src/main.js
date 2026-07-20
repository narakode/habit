import { createApp } from 'vue';
import './style.css';
import 'floating-vue/dist/style.css';
import App from './App.vue';
import FloatingVue from 'floating-vue';

createApp(App).use(FloatingVue).mount('#app');
