<script setup lang="ts">
import Chip from 'primevue/chip';
import { computed, watch } from 'vue';

import { useGoals, useGoalsInYear } from 'shared/hooks';
import { selectedCategoryFilters } from 'shared/store';
import { appLocalStorage, getUniqueArr } from 'shared/utils';

const { removeGoal } = useGoals();

const goalsInYear = useGoalsInYear();

const uniqueGoalCategories = computed<string[]>(() =>
  getUniqueArr(goalsInYear.value.map(({ category }) => category))
);

const handleToggleCategoryFilter = (category: string) => {
  if (selectedCategoryFilters.value.includes(category)) {
    selectedCategoryFilters.value = selectedCategoryFilters.value.filter(
      (categoryFilter) => categoryFilter !== category
    );
  } else {
    selectedCategoryFilters.value.push(category);
  }
};

const removeCategory = (category: string) => {
  goalsInYear.value.forEach((goal) => {
    if (goal.category === category) {
      removeGoal(goal.id);
    }
  });
};

watch(
  selectedCategoryFilters,
  (value) => {
    appLocalStorage.set('selectedCategoryFilters', value);
  },
  { deep: true }
);
</script>

<template>
  <div v-if="uniqueGoalCategories.length">
    <h4>Категории</h4>

    <div class="categories-tags">
      <Chip
        v-for="category in uniqueGoalCategories"
        :key="category"
        removable
        :class="[
          'category-tag',
          {
            'active-tag': selectedCategoryFilters.includes(category),
            'empty-category': !category,
          },
        ]"
        :icon="category ? 'pi pi-tag' : ''"
        :label="category ? category : 'Без категории'"
        @click="handleToggleCategoryFilter(category)"
        @remove.stop="removeCategory(category)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.categories-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  align-items: flex-start;
  margin-top: 10px;
  font-size: var(--p-button-sm-font-size);
}

.category-tag {
  &.active-tag {
    color: var(--p-button-success-color);
    background: var(--p-button-success-background);

    --p-chip-icon-color: var(--p-button-success-color);
  }

  &.empty-category {
    order: -1;
  }
}
</style>
