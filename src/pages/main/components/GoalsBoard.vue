<script setup lang="ts">
import { computed } from 'vue';

import { GoalCard } from 'features/goalCard';
import { useGoals } from 'shared/hooks';
import { selectedYearRef } from 'shared/store';

const { data } = useGoals();

const dataInYear = computed(() =>
  data.value.filter(
    ({ startDate }) =>
      startDate.toDate().getFullYear() === selectedYearRef.value
  )
);
</script>

<template>
  <main class="goals-board-wrapper">
    <GoalCard v-for="goal in dataInYear" :key="goal.id" :goal="goal" />
  </main>
</template>

<style lang="scss">
.goals-board-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
