import Aura from '@primeuix/themes/aura';
import PrimeVue, { type PrimeVueConfiguration } from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import KeyFilter from 'primevue/keyfilter';
import ToastService from 'primevue/toastservice';
import { createApp } from 'vue';
import { VueFire, VueFireAuth } from 'vuefire';

import { firebaseApp } from 'shared/api';

import App from './App.vue';
import { RU_LOCALE } from './locales/ru';
import { router } from './router';

import 'primeicons/primeicons.css';
import './style.scss';

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: { darkModeSelector: '.dark-theme' },
  },
  locale: RU_LOCALE,
  pt: {
    inputNumber: {
      pcinputtext: {
        root: { autocomplete: 'off' },
      },
    },
  },
} satisfies PrimeVueConfiguration);

app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
});

app.use(router);

app.use(ToastService);
app.use(ConfirmationService);

app.directive('keyfilter', KeyFilter);

app.mount('#app');
