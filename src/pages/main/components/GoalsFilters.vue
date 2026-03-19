<script setup lang="ts">
import Button from 'primevue/button';
import Chip from 'primevue/chip';
import OverlayBadge from 'primevue/overlaybadge';
import Popover from 'primevue/popover';
import { computed, ref, watch } from 'vue';

import { useGoals } from 'shared/hooks';
import { selectedCategoryFilters, selectedStatusFilters } from 'shared/store';
import { appLocalStorage, getUniqueArr } from 'shared/utils';

import { STATUS_FILTERS_BUTTONS_PROPS } from '../consts/goalsFilters';

import type { GoalStatus } from 'shared/types';

const { data } = useGoals();

const uniqueGoalCategories = computed(() =>
  getUniqueArr(data.value.map(({ category }) => category))
);

const goalsFiltersCount = computed(
  () =>
    selectedStatusFilters.value.length + selectedCategoryFilters.value.length
);

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

const handleToggleCategoryFilter = (category: string) => {
  if (selectedCategoryFilters.value.includes(category)) {
    selectedCategoryFilters.value = selectedCategoryFilters.value.filter(
      (categoryFilter) => categoryFilter !== category
    );
  } else {
    selectedCategoryFilters.value.push(category);
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

watch(
  selectedCategoryFilters,
  (value) => {
    appLocalStorage.set('selectedCategoryFilters', value);
  },
  { deep: true }
);
</script>

<template>
  <OverlayBadge
    v-if="goalsFiltersCount"
    size="small"
    :value="goalsFiltersCount"
  >
    <Button
      type="button"
      icon="pi pi-filter"
      raised
      :class="['toggle-popover-button', { active: isVisiblePopover }]"
      @click="handleToggleFiltersPopover"
    />
  </OverlayBadge>
  <Button
    v-else
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
        <Button
          size="small"
          icon-pos="right"
          variant="outlined"
          :class="[
            'status-filter-button',
            { active: selectedStatusFilters.includes(status) },
          ]"
          :severity="severity"
          :icon="icon"
          :label="label"
          @click="handleToggleStatusFilter(status)"
        />
      </div>

      <div v-if="uniqueGoalCategories.length">
        <h4>Категории</h4>

        <div class="categories-tags">
          <Chip
            v-for="category in uniqueGoalCategories"
            :key="category"
            :class="[
              'category-tag',
              {
                active: selectedCategoryFilters.includes(category),
                'empty-category': !category,
              },
            ]"
            :icon="category ? 'pi pi-tag' : ''"
            :label="category ? category : 'Без категории'"
            @click="handleToggleCategoryFilter(category)"
          />
        </div>
      </div>
    </div>
  </Popover>
</template>

<style lang="scss" scoped>
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

  &.active:not(:disabled) {
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

.categories-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  align-items: flex-start;
  margin-top: 10px;
  font-size: var(--p-button-sm-font-size);
}

.category-tag {
  &.active {
    color: var(--p-button-success-color);
    background: var(--p-button-success-background);

    --p-chip-icon-color: var(--p-button-success-color);
  }

  &.empty-category {
    order: -1;
  }
}
</style>
