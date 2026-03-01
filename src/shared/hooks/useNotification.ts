import { useToast } from 'primevue/usetoast';

import type { ToastMessageOptions } from 'primevue';

export function useNotification() {
  const toast = useToast();

  const add = (toastOptions: ToastMessageOptions) => {
    toast.add({ ...toastOptions, life: toastOptions.life ?? 3000 });
  };

  return { add };
}
