import type { StatusFiltersButtonsProps } from '../types/goalsFilters';

export const STATUS_FILTERS_BUTTONS_PROPS: StatusFiltersButtonsProps = [
  {
    icon: 'pi pi-check',
    label: 'Выполненные',
    severity: 'success',
    status: 'completed',
  },
  {
    icon: 'pi pi-circle',
    label: 'В процессе',
    status: 'in-progress',
  },
  {
    icon: 'pi pi-bookmark',
    label: 'К выполнению',
    severity: 'info',
    status: 'to-do',
  },
  {
    icon: 'pi pi-clock',
    label: 'Просроченные',
    severity: 'danger',
    status: 'expired',
  },
] as const;
