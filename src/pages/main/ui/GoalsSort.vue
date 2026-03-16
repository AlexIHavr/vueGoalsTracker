<script setup lang="ts">
import Button from 'primevue/button';
import Select from 'primevue/select';

import { selectedSortOrder, selectedSortType } from 'shared/store';

import { SORT_TYPES_OPTIONS } from '../consts/goalsSort';

const handleToggleSortOrder = () => {
  if (selectedSortOrder.value === 'asc') {
    selectedSortOrder.value = 'desc';
  } else {
    selectedSortOrder.value = 'asc';
  }
};
</script>

<template>
  <Select
    v-model="selectedSortType"
    option-label="label"
    option-value="value"
    :options="SORT_TYPES_OPTIONS"
  />

  <Button
    raised
    :icon="
      'pi ' +
      (selectedSortOrder === 'asc'
        ? 'pi-sort-amount-down-alt'
        : 'pi-sort-amount-up-alt')
    "
    @click="handleToggleSortOrder"
  />
</template>

<style lang="scss" scoped>
.p-select {
  width: 175px;
}
</style>
