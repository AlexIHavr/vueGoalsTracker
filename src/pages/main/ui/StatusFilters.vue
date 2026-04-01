<script setup lang="ts">
import Button from 'primevue/button';
import { watch } from 'vue';

import { selectedStatusFilters } from 'shared/store';
import { appLocalStorage } from 'shared/utils';

import { STATUS_FILTERS_BUTTONS_PROPS } from '../consts/goalsFilters';

import type { GoalStatus } from 'shared/types';

const handleToggleStatusFilter = (status: GoalStatus) => {
  if (selectedStatusFilters.value.includes(status)) {
    selectedStatusFilters.value = selectedStatusFilters.value.filter(
      (statusFilter) => statusFilter !== status
    );
  } else {
    selectedStatusFilters.value.push(status);
  }
};

watch(
  selectedStatusFilters,
  (value) => {
    appLocalStorage.set('selectedStatusFilters', value);
  },
  { deep: true }
);
</script>

<template>
  <h4>Статусы целей</h4>

  <div
    v-for="{ icon, label, status, severity } in STATUS_FILTERS_BUTTONS_PROPS"
    :key="status"
    class="status-filters"
  >
    <Button
      size="small"
      icon-pos="right"
      variant="outlined"
      :class="[
        'status-filter-button',
        { 'active-filter': selectedStatusFilters.includes(status) },
      ]"
      :severity="severity"
      :icon="icon"
      :label="label"
      @click="handleToggleStatusFilter(status)"
    />
  </div>
</template>

<style lang="scss" scoped>
.status-filters {
  display: flex;
  gap: 7px;
  align-items: center;
}

.p-button.status-filter-button {
  justify-content: space-between;
  width: 150px;

  &.active-filter:not(:disabled) {
    background: var(--p-button-outlined-primary-active-background);

    &.p-button-success {
      background: var(--p-button-outlined-success-active-background);
    }

    &.p-button-info {
      background: var(--p-button-outlined-info-active-background);
    }

    &.p-button-danger {
      background: var(--p-button-outlined-danger-active-background);
    }
  }
}
</style>
