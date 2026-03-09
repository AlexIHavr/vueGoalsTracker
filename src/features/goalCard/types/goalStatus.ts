import type { GOAL_STATUSES } from '../consts/goalStatuses';
import type { ValueOf } from 'shared/types';

export type GoalStatus = ValueOf<typeof GOAL_STATUSES>;
