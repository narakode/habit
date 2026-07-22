import { createApp } from 'vue';
import './style.css';
import 'floating-vue/dist/style.css';
import App from './App.vue';
import FloatingVue from 'floating-vue';
import vClickOutside from 'click-outside-vue3';

createApp(App).use(FloatingVue).use(vClickOutside).mount('#app');
