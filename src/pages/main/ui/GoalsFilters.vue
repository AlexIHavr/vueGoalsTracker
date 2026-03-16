<script setup lang="ts">
import Button from 'primevue/button';

import { selectedStatusFilters } from 'shared/store';

import { STATUS_FILTERS_BUTTONS_PROPS } from '../consts/goalsFilters';

import type { GoalStatus } from 'shared/types';

const isActiveStatus = (status: GoalStatus) => {
  return selectedStatusFilters.value.includes(status);
};

const handleToggleStatusFilter = (status: GoalStatus) => {
  if (isActiveStatus(status)) {
    selectedStatusFilters.value = selectedStatusFilters.value.filter(
      (statusFilter) => statusFilter !== status
    );
  } else {
    selectedStatusFilters.value.push(status);
  }
};
</script>

<template>
  <div class="goals-filters">
    <Button
      v-for="{ icon, label, status, severity } in STATUS_FILTERS_BUTTONS_PROPS"
      :key="status"
      raised
      fluid
      :icon="icon"
      :label="label"
      :severity="severity"
      :class="['status-filter-button', { active: isActiveStatus(status) }]"
      @click="handleToggleStatusFilter(status)"
    />
  </div>
</template>

<style lang="scss">
.goals-filters {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .p-button {
    justify-content: flex-start;
    width: 170px;
  }
}

.status-filter-button.active:not(:disabled) {
  box-shadow: none;

  &.p-button-success {
    color: var(--p-button-success-active-color);
    background: var(--p-button-success-active-background);
    border: 1px solid var(--p-button-success-active-border-color);
  }

  &.p-button {
    color: var(--p-button-primary-active-color);
    background: var(--p-button-primary-active-background);
    border: 1px solid var(--p-button-primary-active-border-color);
  }

  &.p-button-info {
    color: var(--p-button-info-active-color);
    background: var(--p-button-info-active-background);
    border: 1px solid var(--p-button-info-active-border-color);
  }

  &.p-button-danger {
    color: var(--p-button-danger-active-color);
    background: var(--p-button-danger-active-background);
    border: 1px solid var(--p-button-danger-active-border-color);
  }
}
</style>
