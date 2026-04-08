import { createRouter, createWebHashHistory } from 'vue-router';
import { getCurrentUser } from 'vuefire';

import { AuthPage } from 'pages/auth';
import { EditGoalPage } from 'pages/editGoal';
import { MainPage } from 'pages/main';
import { ROUTES_PATHS } from 'shared/consts';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: ROUTES_PATHS.AUTH,
      component: AuthPage,
    },
    {
      path: ROUTES_PATHS.MAIN,
      component: MainPage,
      meta: { requiresAuth: true },
    },
    {
      path: `${ROUTES_PATHS.EDIT_GOAL.path}/:${ROUTES_PATHS.EDIT_GOAL.params}`,
      component: EditGoalPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: ROUTES_PATHS.MAIN,
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
