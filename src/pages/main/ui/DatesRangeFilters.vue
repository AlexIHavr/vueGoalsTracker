<script setup lang="ts">
import DatePicker from 'primevue/datepicker';
import { watch } from 'vue';

import { selectedDatesRangeFilters } from 'shared/store';
import { appLocalStorage } from 'shared/utils';

import { DATE_FIELD_FORMAT } from '../consts/dateFormats';
import { MAX_START_DATE, MIN_START_DATE } from '../consts/goalsFormFields';

watch(
  selectedDatesRangeFilters,
  (value) => {
    appLocalStorage.set('selectedDatesRangeFilters', value);
  },
  { deep: true }
);
</script>

<template>
  <h4>Диапазон дат</h4>

  <DatePicker
    v-model="selectedDatesRangeFilters"
    selection-mode="range"
    placeholder="Выберите диапазон"
    size="small"
    icon-display="input"
    show-icon
    show-clear
    :manual-input="false"
    :date-format="DATE_FIELD_FORMAT"
    :min-date="MIN_START_DATE"
    :max-date="MAX_START_DATE"
  >
    <template #clearicon="">
      <div>
        <i
          v-if="selectedDatesRangeFilters.length"
          class="pi pi-times p-icon p-datepicker-clear-icon"
          @click="selectedDatesRangeFilters = []"
        />
      </div>
    </template>
  </DatePicker>
</template>
