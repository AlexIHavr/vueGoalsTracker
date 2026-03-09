<script setup lang="ts">
import Select from 'primevue/select';
import { computed } from 'vue';

import { useGoals } from 'shared/hooks';
import { selectedYearRef } from 'shared/store';

import CreateGoalsDialog from './CreateGoalsDialog.vue';

const { data } = useGoals();

const yearSelectOptions = computed(() =>
  Array.from(
    new Set(data.value.map(({ startDate }) => startDate.toDate().getFullYear()))
  ).sort((year1, year2) => year1 - year2)
);
</script>

<template>
  <div class="goals-board-header">
    <CreateGoalsDialog />
    <Select
      id="year-select"
      v-model="selectedYearRef"
      :options="yearSelectOptions"
      :default-value="selectedYearRef"
      :placeholder="selectedYearRef.toString()"
    />
  </div>
</template>

<style lang="scss">
.goals-board-header {
  display: flex;
  gap: 10px;
}
</style>
