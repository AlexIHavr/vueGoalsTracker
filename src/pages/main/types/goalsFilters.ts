import type { GoalStatus } from 'features/goalCard';
import type { ButtonProps } from 'primevue/button';

export type StatusFiltersButtonsProps = Readonly<{
  icon: string;
  label: string;
  severity?: ButtonProps['severity'];
  status: GoalStatus;
}>[];
