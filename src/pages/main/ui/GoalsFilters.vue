<script setup lang="ts">
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Popover from 'primevue/popover';
import { ref, watch } from 'vue';

import { selectedStatusFilters } from 'shared/store';
import { appLocalStorage } from 'shared/utils';

import { STATUS_FILTERS_BUTTONS_PROPS } from '../consts/goalsFilters';

import type { GoalStatus } from 'shared/types';

const filtersPopoverRef = ref<InstanceType<typeof Popover> | null>(null);
const isVisiblePopover = ref<boolean>(false);

const handleToggleFiltersPopover = (event: PointerEvent) => {
  filtersPopoverRef.value?.toggle(event);
};

const handleToggleStatusFilter = (status: GoalStatus) => {
  if (selectedStatusFilters.value.includes(status)) {
    selectedStatusFilters.value = selectedStatusFilters.value.filter(
      (statusFilter) => statusFilter !== status
    );
  } else {
    selectedStatusFilters.value.push(status);
  }
};

const onShowPopover = () => {
  isVisiblePopover.value = true;
};

const onHidePopover = () => {
  isVisiblePopover.value = false;
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
  <Button
    type="button"
    icon="pi pi-filter"
    raised
    :class="['toggle-popover-button', { active: isVisiblePopover }]"
    @click="handleToggleFiltersPopover"
  />

  <Popover ref="filtersPopoverRef" @show="onShowPopover" @hide="onHidePopover">
    <div class="status-filters-wrapper">
      <h4>Статусы целей</h4>

      <div
        v-for="{
          icon,
          label,
          status,
          severity,
        } in STATUS_FILTERS_BUTTONS_PROPS"
        :key="status"
        class="status-filters"
      >
        <Checkbox
          v-model="selectedStatusFilters"
          name="category"
          :input-id="label"
          :value="status"
        />
        <Button
          size="small"
          icon-pos="right"
          class="status-filter-button"
          :severity="severity"
          :icon="icon"
          :label="label"
          @click="handleToggleStatusFilter(status)"
        />
      </div>
    </div>
  </Popover>
</template>

<style lang="scss" scoped>
.p-button.toggle-popover-button.active:not(:disabled) {
  color: var(--p-button-primary-active-color);
  background: var(--p-button-primary-active-background);
  border: 1px solid var(--p-button-primary-active-border-color);
}

.status-filters-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.status-filters {
  display: flex;
  gap: 7px;
  align-items: center;
}

.p-button.status-filter-button {
  justify-content: space-between;
  width: 150px;
}
</style>
