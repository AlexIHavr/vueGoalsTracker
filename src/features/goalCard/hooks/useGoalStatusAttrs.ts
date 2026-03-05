import { reactive, watchEffect, type ComputedRef } from 'vue';

import { GOAL_STATUSES } from '../consts/goalStatuses';

import type { ButtonProps } from 'primevue/button';

export function useGoalStatusAttrs(status: ComputedRef<string>) {
  const goalAttrs = reactive<{
    statusIcon: string;
    completeButtonLabel: string;
    buttonSeverity: ButtonProps['severity'];
  }>({
    statusIcon: '',
    completeButtonLabel: '',
    buttonSeverity: '',
  });

  watchEffect(() => {
    switch (status.value) {
      case GOAL_STATUSES.COMPLETED:
        goalAttrs.statusIcon = 'pi pi-check';
        goalAttrs.completeButtonLabel = 'Выполнено';
        goalAttrs.buttonSeverity = 'success';
        break;

      case GOAL_STATUSES.EXPIRED:
        goalAttrs.statusIcon = 'pi pi-clock';
        goalAttrs.completeButtonLabel = 'Срок истек';
        goalAttrs.buttonSeverity = 'danger';
        break;

      case GOAL_STATUSES.IN_PROGRESS:
        goalAttrs.statusIcon = 'pi pi-circle';
        goalAttrs.completeButtonLabel = 'Выполнить';
        goalAttrs.buttonSeverity = '';
        break;

      case GOAL_STATUSES.TO_DO:
      default:
        goalAttrs.statusIcon = 'pi pi-bookmark';
        goalAttrs.completeButtonLabel = 'К выполнению';
        goalAttrs.buttonSeverity = 'info';
        break;
    }
  });

  return goalAttrs;
}
