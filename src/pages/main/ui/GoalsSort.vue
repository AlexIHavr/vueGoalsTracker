<script setup lang="ts">
import Select from 'primevue/select';

import { selectedSortType } from 'shared/store';

import { SORT_TYPES_OPTIONS } from '../consts/goalsSort';
</script>

<template>
  <Select
    v-model="selectedSortType"
    option-label="label"
    option-value="value"
    :options="SORT_TYPES_OPTIONS"
  />
</template>

<style lang="scss" scoped>
.p-select {
  width: 175px;
}
</style>
