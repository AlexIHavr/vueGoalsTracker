<script setup lang="ts">
import Select from 'primevue/select';
import { computed, ref } from 'vue';

import { useGoals } from 'shared/hooks';

import CreateGoalsDialog from './CreateGoalsDialog.vue';
import { CURRENT_YEAR } from '../consts/goalsFormFields';

const selectedYear = ref<number>();

const { data } = useGoals();

const yearSelectOptions = computed(() =>
  Array.from(
    new Set(data.value.map(({ startDate }) => startDate.toDate().getFullYear()))
  )
);
</script>

<template>
  <div class="goals-board-header">
    <CreateGoalsDialog />
    <Select
      id="year-select"
      v-model="selectedYear"
      :options="yearSelectOptions"
      :default-value="CURRENT_YEAR"
      :placeholder="CURRENT_YEAR.toString()"
    />
  </div>
</template>

<style lang="scss">
.goals-board-header {
  display: flex;
  gap: 10px;
}
</style>
