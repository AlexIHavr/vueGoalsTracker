<script setup lang="ts">
import Message from 'primevue/message';
import ProgressSpinner from 'primevue/progressspinner';
import { computed } from 'vue';

import { getGoalStatus, GoalCard } from 'features/goalCard';
import { useGoals } from 'shared/hooks';
import {
  selectedCategoryFilters,
  selectedStatusFilters,
  selectedYear,
} from 'shared/store';

import { getSortedGoals } from '../utils/getSortedGoals';

const { data } = useGoals();

const isLoadingData = data.pending;

const goalsInYear = computed(() =>
  data.value.filter(
    ({ startDate }) => startDate.toDate().getFullYear() === selectedYear.value
  )
);

const sortedGoalsInYear = computed(() => getSortedGoals(goalsInYear.value));

const filteredDataInYear = computed(() => {
  const selectedStatusFiltersLength = selectedStatusFilters.value.length;
  const selectedCategoryFiltersLength = selectedCategoryFilters.value.length;

  return sortedGoalsInYear.value.filter((goal) => {
    const isIncludesStatus = !selectedStatusFiltersLength
      ? true
      : selectedStatusFilters.value.includes(getGoalStatus(goal));

    const isIncludesCategory = !selectedCategoryFiltersLength
      ? true
      : selectedCategoryFilters.value.includes(goal.category);

    return isIncludesStatus && isIncludesCategory;
  });
});
</script>

<template>
  <div v-if="!isLoadingData" class="goal-board-wrapper">
    <TransitionGroup name="goal-cards" tag="main" class="goals-board">
      <Message
        v-if="!filteredDataInYear.length && goalsInYear.length"
        severity="success"
      >
        По данным фильтрам целей нет - поменяйте фильтры либо снимите их
      </Message>

      <Message v-if="!goalsInYear.length" severity="success">
        Здесь будут ваши цели. Создайте первую цель
      </Message>

      <GoalCard
        v-for="goal in filteredDataInYear"
        :key="goal.id"
        :goal="goal"
      />
    </TransitionGroup>
  </div>
  <ProgressSpinner v-else />
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
