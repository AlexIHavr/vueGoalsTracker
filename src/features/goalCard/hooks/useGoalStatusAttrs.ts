import { reactive, watchEffect, type ComputedRef } from 'vue';

import { GOAL_STATUSES } from '../consts/goalStatuses';

import type { GoalStatus } from '../types/goalStatus';
import type { MessageProps } from 'primevue';
import type { ButtonProps } from 'primevue/button';

export function useGoalStatusAttrs(status: ComputedRef<GoalStatus>) {
  const goalAttrs = reactive<{
    statusIcon: string;
    completeButtonLabel: string;
    buttonSeverity: ButtonProps['severity'];
    messageSeverity: MessageProps['severity'];
  }>({
    statusIcon: '',
    completeButtonLabel: '',
    buttonSeverity: '',
    messageSeverity: '',
  });

  watchEffect(() => {
    switch (status.value) {
      case GOAL_STATUSES.COMPLETED:
        goalAttrs.statusIcon = 'pi pi-check';
        goalAttrs.completeButtonLabel = 'Выполнено';
        goalAttrs.buttonSeverity = 'success';
        goalAttrs.messageSeverity = 'success';
        break;

      case GOAL_STATUSES.EXPIRED:
        goalAttrs.statusIcon = 'pi pi-clock';
        goalAttrs.completeButtonLabel = 'Срок истек';
        goalAttrs.buttonSeverity = 'danger';
        goalAttrs.messageSeverity = 'error';
        break;

      case GOAL_STATUSES.IN_PROGRESS:
        goalAttrs.statusIcon = 'pi pi-circle';
        goalAttrs.completeButtonLabel = 'Выполнить';
        goalAttrs.buttonSeverity = '';
        goalAttrs.messageSeverity = 'success';
        break;

      case GOAL_STATUSES.TO_DO:
      default:
        goalAttrs.statusIcon = 'pi pi-bookmark';
        goalAttrs.completeButtonLabel = 'К выполнению';
        goalAttrs.buttonSeverity = 'info';
        goalAttrs.messageSeverity = 'info';
        break;
    }
  });

  return goalAttrs;
}
