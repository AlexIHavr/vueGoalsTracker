import type { ButtonProps } from 'primevue/button';
import type { GoalStatus } from 'shared/types';

export type StatusFiltersButtonsProps = Readonly<{
  icon: string;
  label: string;
  severity?: ButtonProps['severity'];
  status: GoalStatus;
}>[];
