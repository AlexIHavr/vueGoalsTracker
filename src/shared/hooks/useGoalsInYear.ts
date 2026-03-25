import { computed } from 'vue';

import { useGoals } from 'shared/hooks';
import { selectedYear } from 'shared/store';

export function useGoalsInYear() {
  const { data } = useGoals();

  const goalsInYear = computed(() =>
    data.value.filter(
      ({ startDate }) => startDate.toDate().getFullYear() === selectedYear.value
    )
  );

  return goalsInYear;
}
