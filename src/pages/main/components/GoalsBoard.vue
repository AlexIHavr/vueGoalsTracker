<script setup lang="ts">
import { computed } from 'vue';

import { getGoalStatus, GoalCard } from 'features/goalCard';
import { useGoals } from 'shared/hooks';
import { selectedStatusFilters, selectedYear } from 'shared/store';

import { getSortedGoals } from '../utils/getSortedGoals';

const { data } = useGoals();

const goalsInYear = computed(() =>
  data.value.filter(
    ({ startDate }) => startDate.toDate().getFullYear() === selectedYear.value
  )
);

const sortedGoalsInYear = computed(() => getSortedGoals(goalsInYear.value));

const filteredDataInYear = computed(() => {
  if (!selectedStatusFilters?.value.length) {
    return sortedGoalsInYear.value;
  }

  return sortedGoalsInYear.value.filter((goal) =>
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
