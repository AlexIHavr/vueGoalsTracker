<script setup lang="ts">
import Message from 'primevue/message';
import ProgressSpinner from 'primevue/progressspinner';
import { computed, ref, watch } from 'vue';

import { GoalCard, type GoalCardExpose } from 'features/goalCard';
import { useGoals } from 'shared/hooks';
import { selectedYear } from 'shared/store';

import { useVisibleGoals } from '../hooks/useVisibleGoals';
import { getFilteredGoalsInYear } from '../utils/getFilteredGoalsInYear';
import { getSortedGoals } from '../utils/getSortedGoals';

const { data } = useGoals();

const isLoadingData = data.pending;

const goalsRef = ref<GoalCardExpose[] | null>(null);

const allGoalsRef = ref<GoalCardExpose[] | null>(null);

const observerTriggerRef = ref<HTMLDivElement | null>(null);

const goalsInYear = computed(() =>
  data.value.filter(
    ({ startDate }) => startDate.toDate().getFullYear() === selectedYear.value
  )
);

const sortedGoalsInYear = computed(() => getSortedGoals(goalsInYear.value));

const filteredGoalsInYear = computed(() =>
  getFilteredGoalsInYear(sortedGoalsInYear.value, allGoalsRef.value)
);

const visibleGoals = useVisibleGoals(filteredGoalsInYear, observerTriggerRef);

watch(
  goalsRef,
  (value) => {
    allGoalsRef.value = JSON.parse(JSON.stringify(value));
  },
  { once: true }
);
</script>

<template>
  <div v-if="!isLoadingData" class="goal-board-wrapper">
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

      <GoalCard
        v-for="goal in visibleGoals"
        ref="goalsRef"
        :key="goal.id"
        :goal="goal"
      />
    </main>
  </div>
  <ProgressSpinner v-else />
  <div ref="observerTriggerRef" />
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
