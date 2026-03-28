import type { ButtonProps } from 'primevue/button';
import type { MessageProps } from 'primevue/message';

export interface GoalStatusAttr {
  statusIcon: string;
  completeButtonLabel: string;
  buttonSeverity: ButtonProps['severity'];
  messageSeverity: MessageProps['severity'];
}
