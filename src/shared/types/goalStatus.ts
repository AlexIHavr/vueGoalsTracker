import type { GOAL_STATUSES } from 'shared/consts';
import type { ValueOf } from 'shared/types';

export type GoalStatus = ValueOf<typeof GOAL_STATUSES>;
