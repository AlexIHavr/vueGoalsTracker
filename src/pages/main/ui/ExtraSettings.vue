<script setup lang="ts">
import MultiSelect from 'primevue/multiselect';
import Select from 'primevue/select';
import { computed } from 'vue';

import {
  MONTH_CHOOSE_FILTERS_OPTIONS,
  PERIOD_FILTERS_OPTIONS,
  PERIOD_TYPES_OPTIONS,
} from '../consts/periodOptions';
import { getDaysInSelectedMonths } from '../utils/getDaysInSelectedMonths';

import type { PeriodFilterValue } from '../types/periodOptions';
import type { PeriodTypeValue } from 'shared/types';

const { isLoading } = defineProps<{ isLoading: boolean }>();

const selectedPeriod = defineModel<PeriodTypeValue>('selectedPeriod', {
  required: true,
});

const selectedPeriodFilter = defineModel<PeriodFilterValue>(
  'selectedPeriodFilter',
  {
    required: true,
  }
);

const selectedMonthChooseFilter = defineModel<number[]>(
  'selectedMonthChooseFilter',
  {
    required: true,
  }
);

const selectedDayChooseFilter = defineModel<number[]>(
  'selectedDayChooseFilter',
  {
    required: true,
  }
);

const dayChooseFilterOptions = computed(() =>
  getDaysInSelectedMonths(selectedMonthChooseFilter.value)
);
</script>

<template>
  <div class="extra-settings">
    <Select
      v-model="selectedPeriod"
      class="period-select"
      option-label="label"
      option-value="value"
      :options="PERIOD_TYPES_OPTIONS"
      :disabled="isLoading"
    />

    <div class="period-settings">
      <Select
        v-model="selectedPeriodFilter"
        option-label="label"
        option-value="value"
        :options="PERIOD_FILTERS_OPTIONS"
        :disabled="selectedPeriod === 'year' || isLoading"
      />

      <MultiSelect
        v-model="selectedMonthChooseFilter"
        input-id="month-choose-filter"
        option-label="label"
        option-value="value"
        placeholder="Все месяцы"
        :options="MONTH_CHOOSE_FILTERS_OPTIONS"
        :disabled="
          selectedPeriod === 'year' ||
          (selectedPeriod === 'month' && selectedPeriodFilter !== 'choose') ||
          (selectedPeriod === 'day' && selectedPeriodFilter === 'all') ||
          isLoading
        "
      />

      <MultiSelect
        v-model="selectedDayChooseFilter"
        input-id="day-choose-filter"
        placeholder="Все дни"
        :options="dayChooseFilterOptions"
        :disabled="
          selectedPeriod !== 'day' ||
          selectedPeriodFilter !== 'choose' ||
          isLoading
        "
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.extra-settings {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.period-settings {
  display: flex;
  gap: 10px;
}

.p-select,
.p-multiselect {
  width: 162px;
}

.period-select {
  width: 100%;
}
</style>
