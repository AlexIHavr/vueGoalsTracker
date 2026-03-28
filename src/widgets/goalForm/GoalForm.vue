<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionContent from 'primevue/accordioncontent';
import AccordionHeader from 'primevue/accordionheader';
import AccordionPanel from 'primevue/accordionpanel';
import Divider from 'primevue/divider';
import { provide, reactive, ref } from 'vue';

import {
  BaseForm,
  type BaseFormEvent,
  type BaseFormExpose,
} from 'features/baseForm';

import CommonGoalFields from './components/CommonGoalsFields.vue';
import DayDateFields from './components/DayDateFields.vue';
import MonthDateFields from './components/MonthDateFields.vue';
import SwitchSettings from './components/SwitchSettings.vue';
import TimesFields from './components/TimesFields.vue';
import YearDateFields from './components/YearDateFields.vue';
import {
  INITIAL_FIELDS_INJECT_KEY,
  INITIAL_SWITCH_SETTINGS_INJECT_KEY,
} from './consts/injectKeys';
import { useWatchFormRefs } from './hooks/useWatchFormRefs';
import { goalResolver } from './schemas/goalResolver';

import type {
  GoalFormFields,
  SwitchSettingsFields,
} from './interfaces/goalFormFields';
import type { PeriodTypeValue } from 'shared/types';

const { initialFields, initialSwitchSettings } = defineProps<{
  selectedPeriod: PeriodTypeValue;
  initialFields: GoalFormFields;
  initialSwitchSettings: SwitchSettingsFields;
  formSubmit: (event: BaseFormEvent) => Promise<void>;
}>();

const goalFormFields = reactive<GoalFormFields>({
  ...initialFields,
});

const switchSettingsFields = reactive<SwitchSettingsFields>({
  ...initialSwitchSettings,
});

const goalFormRef = ref<BaseFormExpose | null>(null);

useWatchFormRefs(goalFormRef, initialFields);

const resetCreateGoalsForm = () => {
  Object.assign(goalFormFields, { ...initialFields });
  Object.assign(switchSettingsFields, { ...initialSwitchSettings });
};

provide(INITIAL_FIELDS_INJECT_KEY, initialFields);
provide(INITIAL_SWITCH_SETTINGS_INJECT_KEY, initialSwitchSettings);

defineExpose({
  goalFormRef,
  goalFormFields,
  switchSettingsFields,
  resetCreateGoalsForm,
});
</script>

<template>
  <BaseForm
    ref="goalFormRef"
    submit-button-label="Создать"
    submit-button-icon="pi-plus"
    class="goal-form"
    :resolver="goalResolver"
    :form-submit="formSubmit"
  >
    <CommonGoalFields
      v-model:title="goalFormFields.title"
      v-model:description="goalFormFields.description"
      v-model:category="goalFormFields.category"
    />

    <Accordion>
      <AccordionPanel value="extraSettings">
        <AccordionHeader>Дополнительные параметры</AccordionHeader>
        <AccordionContent>
          <div class="extra-settings-wrapper">
            <slot />

            <Divider />

            <TimesFields
              v-model:times-suffix="goalFormFields.timesSuffix"
              v-model:times-start="goalFormFields.timesStart"
              v-model:times-end="goalFormFields.timesEnd"
              v-model:times-step="goalFormFields.timesStep"
            />

            <template v-if="selectedPeriod === 'year'">
              <YearDateFields
                v-model:start-date="goalFormFields.startDate"
                v-model:end-date="goalFormFields.endDate"
              />
            </template>

            <template v-if="selectedPeriod === 'month'">
              <MonthDateFields
                v-model:start-day="goalFormFields.startDay"
                v-model:end-day="goalFormFields.endDay"
              />
            </template>

            <template v-if="selectedPeriod === 'day'">
              <DayDateFields
                v-model:start-time="goalFormFields.startTime"
                v-model:end-time="goalFormFields.endTime"
              />
            </template>

            <SwitchSettings
              v-model:show-one-times="switchSettingsFields.showOneTimes"
              v-model:over-times="switchSettingsFields.overTimes"
            />
          </div>
        </AccordionContent>
      </AccordionPanel>
    </Accordion>
  </BaseForm>
</template>

<style lang="scss" scoped>
.goal-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 500px;
  padding-top: 5px;
}

.extra-settings-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
