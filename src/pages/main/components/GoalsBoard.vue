<script setup lang="ts">
import { computed } from 'vue';

import { getGoalStatus, GoalCard } from 'features/goalCard';
import { useGoals } from 'shared/hooks';
import {
  selectedSortType,
  selectedStatusFilters,
  selectedYear,
} from 'shared/store';

const { data } = useGoals();

const dataInYear = computed(() =>
  data.value.filter(
    ({ startDate }) => startDate.toDate().getFullYear() === selectedYear.value
  )
);

const sortedDataInYear = computed(() => {
  switch (selectedSortType.value) {
    default:
    case 'startDate':
      return dataInYear.value.toSorted(
        (firstGoal, secondGoal) =>
          secondGoal.startDate.seconds - firstGoal.startDate.seconds
      );

    case 'title':
      return dataInYear.value.toSorted((firstGoal, secondGoal) =>
        secondGoal.title.localeCompare(firstGoal.title)
      );

    case 'timesCurrent':
      return dataInYear.value.toSorted(
        (firstGoal, secondGoal) =>
          secondGoal.timesCurrent - firstGoal.timesCurrent
      );
  }
});

const filteredDataInYear = computed(() => {
  if (!selectedStatusFilters?.value.length) {
    return sortedDataInYear.value;
  }

  return sortedDataInYear.value.filter((goal) =>
    selectedStatusFilters.value.includes(getGoalStatus(goal))
  );
});
</script>

<template>
  <div class="goal-board-wrapper">
    <TransitionGroup name="goal-cards" tag="main" class="goals-board">
      <GoalCard
        v-for="goal in filteredDataInYear"
        :key="goal.id"
        :goal="goal"
      />
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
.goal-board-wrapper {
  display: flex;
  gap: 10px;
}

.goals-board {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.goal-cards-enter-active {
  animation: bounce-in 0.5s;
}

@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }

  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
