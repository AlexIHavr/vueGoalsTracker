import { reactive, watchEffect, type ComputedRef } from 'vue';

import { GOAL_STATUSES } from 'shared/consts';

export function useGoalStatusAttrs(status: ComputedRef<string>) {
  const goalAttrs = reactive<{
    titleStatusIcon: string;
    completeButtonStatusIcon: string;
    completeButtonLabel: string;
  }>({
    titleStatusIcon: '',
    completeButtonStatusIcon: '',
    completeButtonLabel: '',
  });

  watchEffect(() => {
    switch (status.value) {
      case GOAL_STATUSES.COMPLETED:
        goalAttrs.titleStatusIcon = 'pi pi-check';
        goalAttrs.completeButtonStatusIcon = 'pi pi-check-circle';
        goalAttrs.completeButtonLabel = 'Выполнено';
        break;

      case GOAL_STATUSES.EXPIRED:
        goalAttrs.titleStatusIcon = 'pi pi-times';
        goalAttrs.completeButtonStatusIcon = 'pi pi-times';
        goalAttrs.completeButtonLabel = 'Срок истек';
        break;

      case GOAL_STATUSES.IN_PROGRESS:
        goalAttrs.titleStatusIcon = 'pi pi-circle-fill';
        goalAttrs.completeButtonStatusIcon = 'pi pi-circle';
        goalAttrs.completeButtonLabel = 'Выполнить';
        break;

      case GOAL_STATUSES.TO_DO:
      default:
        goalAttrs.titleStatusIcon = 'pi pi-bookmark';
        goalAttrs.completeButtonStatusIcon = 'pi pi-bookmark';
        goalAttrs.completeButtonLabel = 'К выполнению';
        break;
    }
  });

  return goalAttrs;
}
