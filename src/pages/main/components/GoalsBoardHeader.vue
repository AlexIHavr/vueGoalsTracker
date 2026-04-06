<script setup lang="ts">
import Select from 'primevue/select';
import { computed } from 'vue';

import { CURRENT_YEAR } from 'shared/consts';
import { useGoals } from 'shared/hooks';
import { selectedYear } from 'shared/store';
import { getUniqueArr } from 'shared/utils';

import CreateGoalsModal from './CreateGoalsModal.vue';
import GoalsFilters from './GoalsFilters.vue';
import GoalsSearch from '../ui/GoalsSearch.vue';
import GoalsSort from '../ui/GoalsSort.vue';

const { data } = useGoals();

const yearSelectOptions = computed<number[]>(() =>
  getUniqueArr(
    data.value
      .map(({ startDate }) => startDate.toDate().getFullYear())
      .concat(CURRENT_YEAR)
  ).sort((firstYear, secondYear) => firstYear - secondYear)
);
</script>

<template>
  <div class="goals-board-header">
    <CreateGoalsModal />
    <Select
      v-model="selectedYear"
      :options="yearSelectOptions"
      :default-value="selectedYear"
      :placeholder="selectedYear.toString()"
    />
    <GoalsSort />
    <GoalsFilters />
    <GoalsSearch />
  </div>
</template>

<style lang="scss" scoped>
.goals-board-header {
  display: flex;
  gap: 10px;
}
</style>
