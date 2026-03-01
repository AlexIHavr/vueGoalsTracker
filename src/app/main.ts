import Aura from '@primeuix/themes/aura';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import { createApp } from 'vue';
import { VueFire, VueFireAuth } from 'vuefire';

import { firebaseApp } from 'shared/api';

import App from './App.vue';
import { router } from './router';

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

app.use(router);

app.use(ToastService);

app.mount('#app');
