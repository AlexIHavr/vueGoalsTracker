import Aura from '@primeuix/themes/aura';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';
import { VueFire, VueFireAuth } from 'vuefire';

import App from './App.vue';
import { firebaseApp } from './firebase';

import 'primeicons/primeicons.css';
import './style.css';

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: { darkModeSelector: '.dark-theme' },
  },
});

app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});

app.mount('#app');
