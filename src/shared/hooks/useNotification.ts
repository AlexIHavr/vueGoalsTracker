import { useToast } from 'primevue/usetoast';

import type { ToastMessageOptions } from 'primevue/toast';

const DEFAULT_LIFE_TIME = 3000;

export function useNotification() {
  const toast = useToast();

  const add = (toastOptions: ToastMessageOptions) => {
    const lifeTime =
      toastOptions.severity !== 'error' ? DEFAULT_LIFE_TIME : undefined;

    toast.add({
      ...toastOptions,
      life: toastOptions.life ?? lifeTime,
    });
  };

  return { add };
}
