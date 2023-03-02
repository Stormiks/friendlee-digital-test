import './assets/scss/style.scss';

import App from './App.vue';
import Vue from 'vue';
import { createPinia, PiniaVuePlugin } from 'pinia';

Vue.use(PiniaVuePlugin);
const pinia = createPinia();

new Vue({
  el: '#contentApp',
  render: (h) => h(App),
  pinia
});
