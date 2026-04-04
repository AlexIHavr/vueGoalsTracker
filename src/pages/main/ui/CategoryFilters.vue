<script setup lang="ts">
import Chip from 'primevue/chip';
import { useConfirm } from 'primevue/useconfirm';
import { computed, ref, watch } from 'vue';

import { LoadingModal } from 'features/loadingModal';
import { useGoals, useGoalsInYear, useNotification } from 'shared/hooks';
import { selectedCategoryFilters } from 'shared/store';
import { appLocalStorage, getUniqueArr } from 'shared/utils';

const isLoadingModalVisible = ref<boolean>(false);

const { removeGoal } = useGoals();

const confirm = useConfirm();

const { add } = useNotification();

const goalsInYear = useGoalsInYear();

const uniqueGoalCategories = computed<string[]>(() =>
  getUniqueArr(goalsInYear.value.map(({ category }) => category))
);

const handleRemoveCategoryFilter = (category: string) => {
  selectedCategoryFilters.value = selectedCategoryFilters.value.filter(
    (categoryFilter) => categoryFilter !== category
  );
};

const handleToggleCategoryFilter = (category: string) => {
  if (selectedCategoryFilters.value.includes(category)) {
    handleRemoveCategoryFilter(category);
  } else {
    selectedCategoryFilters.value.push(category);
  }
};

const removeCategory = async (category: string) => {
  isLoadingModalVisible.value = true;

  await Promise.all(
    goalsInYear.value
      .filter((goal) => goal.category === category)
      .map((goal) => removeGoal(goal.id))
  );

  handleRemoveCategoryFilter(category);

  isLoadingModalVisible.value = false;
};

const handleConfirmRemoveCategory = (category: string, event: PointerEvent) => {
  confirm.require({
    target: event.currentTarget as HTMLButtonElement,
    message: 'Вы уверены, что хотите удалить все цели в данной категории?',
    accept: async () => {
      await removeCategory(category);

      add({ severity: 'success', summary: 'Цели удалены' });
    },
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
  <div>
    <h4>Категории</h4>

    <LoadingModal v-if="isLoadingModalVisible" />

    <div v-if="uniqueGoalCategories.length" class="categories-tags">
      <div
        v-for="category in uniqueGoalCategories"
        :key="category"
        :class="['category-tag-wrapper', { 'empty-category': !category }]"
      >
        <Chip
          :class="[
            'category-tag',
            {
              'active-tag': selectedCategoryFilters.includes(category),
            },
          ]"
          :icon="category ? 'pi pi-tag' : ''"
          :label="category ? category : 'Без категории'"
          @click="handleToggleCategoryFilter(category)"
        />
        <i
          class="pi pi-times remove-category-button"
          @click="handleConfirmRemoveCategory(category, $event)"
        />
      </div>
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

.category-tag-wrapper {
  position: relative;

  &.empty-category {
    order: -1;
  }
}

.remove-category-button {
  position: absolute;
  top: 50%;
  right: 10px;
  z-index: 1;
  padding: 3px;
  font-size: 10px;
  color: var(--p-button-outlined-danger-color);
  cursor: pointer;
  border: 1px solid var(--p-button-outlined-danger-color);
  border-radius: 10px;
  transform: translateY(-50%);
  transition: 0.2s;

  @media (hover: hover) {
    &:hover {
      background-color: var(--p-button-success-color);
    }
  }
}

.category-tag {
  padding-right: 35px;
  font-weight: 600;

  &.active-tag {
    color: var(--p-button-success-color);
    background: var(--p-button-success-background);

    --p-chip-icon-color: var(--p-button-success-color);
  }
}
</style>
