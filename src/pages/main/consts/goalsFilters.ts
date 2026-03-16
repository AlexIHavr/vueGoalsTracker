import { GOAL_STATUSES } from 'shared/consts';

import type { StatusFiltersButtonsProps } from '../types/goalsFilters';

export const STATUS_FILTERS_BUTTONS_PROPS: StatusFiltersButtonsProps = [
  {
    icon: 'pi pi-check',
    label: 'Выполненные',
    severity: 'success',
    status: GOAL_STATUSES.COMPLETED,
  },
  {
    icon: 'pi pi-circle',
    label: 'В процессе',
    status: GOAL_STATUSES.IN_PROGRESS,
  },
  {
    icon: 'pi pi-bookmark',
    label: 'К выполнению',
    severity: 'info',
    status: GOAL_STATUSES.TO_DO,
  },
  {
    icon: 'pi pi-clock',
    label: 'Просроченные',
    severity: 'danger',
    status: GOAL_STATUSES.EXPIRED,
  },
] as const;
