<script setup lang="ts">
import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import Select from 'primevue/select';
import { computed, watch } from 'vue';

import { TOOLTIP_SHOW_DELAY } from 'shared/consts';
import { selectedSortOrder, selectedSortType } from 'shared/store';
import { appLocalStorage } from 'shared/utils';

import { SORT_TYPES_OPTIONS } from '../consts/goalsSort';

const selectedSortOrderIcon = computed<string>(() =>
  selectedSortOrder.value === 'asc'
    ? 'pi pi-sort-amount-down-alt'
    : 'pi pi-sort-amount-up-alt'
);

const handleToggleSortOrder = () => {
  if (selectedSortOrder.value === 'asc') {
    selectedSortOrder.value = 'desc';
  } else {
    selectedSortOrder.value = 'asc';
  }
};

watch(selectedSortOrder, () => {
  appLocalStorage.set('selectedSortOrder', selectedSortOrder.value);
});

watch(selectedSortType, () => {
  appLocalStorage.set('selectedSortType', selectedSortType.value);
});
</script>

<template>
  <InputGroup>
    <Select
      v-model="selectedSortType"
      option-label="label"
      option-value="value"
      :options="SORT_TYPES_OPTIONS"
    />

    <Button
      v-tooltip.bottom="{
        value:
          selectedSortOrder === 'asc'
            ? 'Сортировать по убыванию'
            : 'Сортировать по возрастанию',
        showDelay: TOOLTIP_SHOW_DELAY,
      }"
      class="sort-order-button"
      raised
      :icon="selectedSortOrderIcon"
      @click="handleToggleSortOrder"
    />
  </InputGroup>
</template>

<style lang="scss" scoped>
.p-inputgroup {
  width: 225px;
}

.sort-order-button {
  border-radius: 0 var(--p-button-border-radius) var(--p-button-border-radius) 0;
}
</style>
