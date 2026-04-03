<script setup lang="ts">
import Button from 'primevue/button';
import OverlayBadge from 'primevue/overlaybadge';
import Popover from 'primevue/popover';
import { computed, ref, watch, type ClassValue } from 'vue';

import { TOOLTIP_SHOW_DELAY } from 'shared/consts';
import {
  selectedCategoryFilters,
  selectedDatesRangeFilters,
  selectedStatusFilters,
  selectedYear,
} from 'shared/store';

import CategoryFilters from '../ui/CategoryFilters.vue';
import DatesRangeFilters from '../ui/DatesRangeFilters.vue';
import StatusFilters from '../ui/StatusFilters.vue';

const goalsFiltersCount = computed<number>(
  () =>
    selectedStatusFilters.value.length +
    selectedCategoryFilters.value.length +
    (selectedDatesRangeFilters.value.length ? 1 : 0)
);

const filtersPopoverRef = ref<InstanceType<typeof Popover> | null>(null);
const isVisiblePopover = ref<boolean>(false);

const filterButtonClasses = computed<ClassValue>(() => [
  'toggle-popover-button',
  { active: isVisiblePopover.value },
]);

const handleToggleFiltersPopover = (event: PointerEvent) => {
  filtersPopoverRef.value?.toggle(event);
};

const onShowPopover = () => {
  isVisiblePopover.value = true;
};

const onHidePopover = () => {
  isVisiblePopover.value = false;
};

const handleResetAllFilters = () => {
  selectedStatusFilters.value = [];
  selectedCategoryFilters.value = [];
  selectedDatesRangeFilters.value = [];
};

watch(selectedYear, () => {
  handleResetAllFilters();
});
</script>

<template>
  <OverlayBadge
    v-if="goalsFiltersCount"
    size="small"
    :value="goalsFiltersCount"
  >
    <Button
      v-tooltip.bottom="{ value: 'Фильтры', showDelay: TOOLTIP_SHOW_DELAY }"
      icon="pi pi-filter"
      raised
      :class="filterButtonClasses"
      @click="handleToggleFiltersPopover"
    />
  </OverlayBadge>

  <Button
    v-else
    v-tooltip.bottom="{
      value: 'Фильтры',
      showDelay: TOOLTIP_SHOW_DELAY,
    }"
    icon="pi pi-filter"
    raised
    :class="filterButtonClasses"
    @click="handleToggleFiltersPopover"
  />

  <Popover ref="filtersPopoverRef" @show="onShowPopover" @hide="onHidePopover">
    <div class="filters-wrapper">
      <Button
        v-tooltip.bottom="{
          value: goalsFiltersCount ? 'Убрать фильтры' : '',
          showDelay: TOOLTIP_SHOW_DELAY,
        }"
        icon="pi pi-filter-slash"
        size="small"
        severity="danger"
        class="reset-all-filters-button"
        raised
        :disabled="!goalsFiltersCount"
        @click="handleResetAllFilters"
      />

      <StatusFilters />

      <DatesRangeFilters />

      <CategoryFilters />
    </div>
  </Popover>
</template>

<style lang="scss" scoped>
.filters-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 250px;
  max-width: 265px;
  max-height: 385px;
  overflow: hidden auto;
  user-select: none;

  &::-webkit-scrollbar {
    width: 0;
  }
}

.reset-all-filters-button {
  position: absolute;
  top: 0;
  right: 0;
}

.toggle-popover-button {
  height: 40px;
}
</style>
