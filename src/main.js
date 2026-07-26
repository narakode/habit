import { createApp } from 'vue';
import '@fontsource/ibm-plex-sans';
import 'floating-vue/dist/style.css';
import '@vuepic/vue-datepicker/dist/main.css';
import './style.css';
import App from './App.vue';
import FloatingVue from 'floating-vue';
import vClickOutside from 'click-outside-vue3';
import { router } from './core/router';
import vueAuthHelper from 'vue-auth-helper';

createApp(App)
  .use(FloatingVue)
  .use(vClickOutside)
  .use(router)
  .use(vueAuthHelper)
  .mount('#app');
