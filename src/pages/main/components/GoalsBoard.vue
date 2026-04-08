<script setup lang="ts">
import Message from 'primevue/message';
import { computed, ref } from 'vue';

import { useGoalsInYear } from 'shared/hooks';
import { GoalCard } from 'widgets/goalCard';

import { useVisibleGoals } from '../hooks/useVisibleGoals';
import GoalsSearch from '../ui/GoalsSearch.vue';
import GoalsStatistics from '../ui/GoalsStatistics.vue';
import { getFilteredGoalsInYear } from '../utils/getFilteredGoalsInYear';
import { getSortedGoals } from '../utils/getSortedGoals';

import type { GoalDocument } from 'shared/interfaces';

const observerTriggerRef = ref<HTMLDivElement | null>(null);

const goalsInYear = useGoalsInYear();

const filteredGoalsInYear = computed<GoalDocument[]>(() =>
  getFilteredGoalsInYear(goalsInYear.value)
);

const sortedGoalsInYear = computed<GoalDocument[]>(() =>
  getSortedGoals(filteredGoalsInYear.value)
);

const visibleGoals = useVisibleGoals(sortedGoalsInYear, observerTriggerRef);
</script>

<template>
  <div class="goal-board-wrapper">
    <GoalsStatistics :filtered-goals-in-year="filteredGoalsInYear" />

    <GoalsSearch />

    <Message v-if="goalsInYear.length" severity="success">
      <h4>Ваши цели</h4>
    </Message>

    <main class="goals-board">
      <Message
        v-if="!filteredGoalsInYear.length && goalsInYear.length"
        severity="success"
      >
        По данным фильтрам или поиску целей нет
      </Message>

      <Message v-if="!goalsInYear.length" severity="success">
        Здесь будут ваши цели. Создайте первую цель
      </Message>

      <GoalCard v-for="goal in visibleGoals" :key="goal.id" :goal="goal" />
    </main>
  </div>

  <div ref="observerTriggerRef" />
</template>

<style lang="scss" scoped>
.goal-board-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.goals-board {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;
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
