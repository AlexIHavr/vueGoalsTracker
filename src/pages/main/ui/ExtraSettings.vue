<script setup lang="ts">
import MultiSelect from 'primevue/multiselect';
import Select from 'primevue/select';
import { computed } from 'vue';

import { GoalTip } from 'features/goalTip';

import {
  MONTH_CHOOSE_FILTERS_OPTIONS,
  PERIOD_FILTERS_OPTIONS,
  PERIOD_TYPES_OPTIONS,
} from '../consts/periodOptions';
import { getDaysInSelectedMonths } from '../utils/getDaysInSelectedMonths';

import type { PeriodFilterValue } from '../types/periodOptions';
import type { PeriodTypeValue } from 'shared/types';

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

const dayChooseFilterOptions = computed<number[]>(() =>
  getDaysInSelectedMonths(selectedMonthChooseFilter.value)
);

const selectPeriodTipText = computed(() => {
  if (selectedPeriod.value === 'year') {
    return 'При выборе "Год" - будет создана только одна цель на весь год';
  }

  if (selectedPeriod.value === 'month') {
    return 'При выборе "Месяц" - будет созданы цели на выбранные месяцы ниже';
  }

  return 'При выборе "День" - будет созданы цели на выбранные дни ниже';
});
</script>

<template>
  <div class="extra-settings">
    <div class="select-period-wrapper">
      <Select
        v-model="selectedPeriod"
        class="period-select"
        option-label="label"
        option-value="value"
        :options="PERIOD_TYPES_OPTIONS"
      />

      <GoalTip :text="selectPeriodTipText" />
    </div>

    <div class="period-settings">
      <div class="selected-period-filter-wrapper">
        <Select
          v-model="selectedPeriodFilter"
          option-label="label"
          option-value="value"
          :options="PERIOD_FILTERS_OPTIONS"
          :disabled="selectedPeriod === 'year'"
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
            (selectedPeriod === 'day' && selectedPeriodFilter === 'all')
          "
        />

        <MultiSelect
          v-model="selectedDayChooseFilter"
          input-id="day-choose-filter"
          placeholder="Все дни"
          :options="dayChooseFilterOptions"
          :disabled="
            selectedPeriod !== 'day' || selectedPeriodFilter !== 'choose'
          "
        />
      </div>

      <GoalTip
        text="Здесь вы можете выбрать определенные месяцы или дни (если вы выберите дни, которые превышают количество дней в месяце, то будет создана цель на последний день данного месяца)"
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

.select-period-wrapper {
  display: flex;
  gap: 5px;
}

.period-settings {
  display: flex;
  gap: 5px;
  justify-content: space-between;
}

.selected-period-filter-wrapper {
  display: flex;
  gap: 5px;
}

.p-select,
.p-multiselect {
  width: 150px;
}

.period-select {
  width: 100%;
}
</style>
