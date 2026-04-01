import { computed } from 'vue';

import { useGoals } from 'shared/hooks';
import { selectedYear } from 'shared/store';

import type { GoalDocument } from 'shared/interfaces';

export function useGoalsInYear() {
  const { data } = useGoals();

  const goalsInYear = computed<GoalDocument[]>(() =>
    data.value.filter(
      ({ startDate }) => startDate.toDate().getFullYear() === selectedYear.value
    )
  );

  return goalsInYear;
}
