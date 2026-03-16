<script setup lang="ts">
import Select from 'primevue/select';
import { computed } from 'vue';

import { CURRENT_YEAR } from 'shared/consts';
import { useGoals } from 'shared/hooks';
import { selectedYear } from 'shared/store';

import CreateGoalsDialog from './CreateGoalsDialog.vue';
import GoalsFilters from '../ui/GoalsFilters.vue';

const { data } = useGoals();

const yearSelectOptions = computed(() =>
  Array.from(
    new Set(
      data.value
        .map(({ startDate }) => startDate.toDate().getFullYear())
        .concat(CURRENT_YEAR)
    )
  ).sort((firstYear, secondYear) => firstYear - secondYear)
);
</script>

<template>
  <div class="goals-board-header">
    <CreateGoalsDialog />
    <Select
      v-model="selectedYear"
      :options="yearSelectOptions"
      :default-value="selectedYear"
      :placeholder="selectedYear.toString()"
    />
    <GoalsFilters />
  </div>
</template>

<style lang="scss">
.goals-board-header {
  display: flex;
  gap: 10px;
}
</style>
