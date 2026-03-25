import type { ButtonProps } from 'primevue/button';
import type { MessageProps } from 'primevue/message';
import type { GoalStatus } from 'shared/types';

interface GoalStatusAttr {
  statusIcon: string;
  completeButtonLabel: string;
  buttonSeverity: ButtonProps['severity'];
  messageSeverity: MessageProps['severity'];
}

export function getGoalStatusAttrs(status: GoalStatus) {
  const goalAttrs: GoalStatusAttr = {
    statusIcon: '',
    completeButtonLabel: '',
    buttonSeverity: '',
    messageSeverity: '',
  };

  switch (status) {
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
      goalAttrs.statusIcon = 'pi pi-bookmark';
      goalAttrs.completeButtonLabel = 'К выполнению';
      goalAttrs.buttonSeverity = 'info';
      goalAttrs.messageSeverity = 'info';
      break;

    default: {
      const _: never = status;
      return _;
    }
  }

  return goalAttrs;
}
