import { reactive, watchEffect, type ComputedRef } from 'vue';

import type { ButtonProps } from 'primevue/button';
import type { MessageProps } from 'primevue/message';
import type { GoalStatus } from 'shared/types';

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
      case 'completed':
        goalAttrs.statusIcon = 'pi pi-check';
        goalAttrs.completeButtonLabel = 'Выполнено';
        goalAttrs.buttonSeverity = 'success';
        goalAttrs.messageSeverity = 'success';
        break;

      case 'expired':
        goalAttrs.statusIcon = 'pi pi-clock';
        goalAttrs.completeButtonLabel = 'Срок истек';
        goalAttrs.buttonSeverity = 'danger';
        goalAttrs.messageSeverity = 'error';
        break;

      case 'in-progress':
        goalAttrs.statusIcon = 'pi pi-circle';
        goalAttrs.completeButtonLabel = 'Выполнить';
        goalAttrs.buttonSeverity = '';
        goalAttrs.messageSeverity = 'success';
        break;

      case 'to-do':
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
