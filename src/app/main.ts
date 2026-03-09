import Aura from '@primeuix/themes/aura';
import PrimeVue from 'primevue/config';
import KeyFilter from 'primevue/keyfilter';
import ToastService from 'primevue/toastservice';
import { createApp } from 'vue';
import { VueFire, VueFireAuth } from 'vuefire';

import { firebaseApp } from 'shared/api';

import App from './App.vue';
import { ruLocale } from './locales/ru';
import { router } from './router';

import 'primeicons/primeicons.css';
import './style.scss';

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: { darkModeSelector: '.dark-theme' },
  },
  locale: ruLocale,
});

app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});

app.use(router);

app.use(ToastService);

app.directive('keyfilter', KeyFilter);

app.mount('#app');
