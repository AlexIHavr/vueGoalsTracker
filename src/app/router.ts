import { createRouter, createWebHistory } from 'vue-router';
import { getCurrentUser } from 'vuefire';

import { AuthPage } from 'pages/auth';
import { MainPage } from 'pages/main';
import { ROUTES_PATHS } from 'shared/consts';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: ROUTES_PATHS.MAIN,
      component: MainPage,
      meta: { requiresAuth: true },
    },
    {
      path: ROUTES_PATHS.AUTH,
      component: AuthPage,
    },
  ],
});

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        path: ROUTES_PATHS.AUTH,
        query: { redirect: to.fullPath },
      };
    }
  }

  if (to.path === ROUTES_PATHS.AUTH) {
    const currentUser = await getCurrentUser();

    if (currentUser) {
      return { path: ROUTES_PATHS.MAIN };
    }
  }

  return true;
});
