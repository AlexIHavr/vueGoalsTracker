<script setup lang="ts">
import Accordion from 'primevue/accordion';
import AccordionContent from 'primevue/accordioncontent';
import AccordionHeader from 'primevue/accordionheader';
import AccordionPanel from 'primevue/accordionpanel';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import { reactive, ref } from 'vue';

import { BaseForm } from 'features/baseForm';
import { BaseFormField } from 'features/baseFormField';
import { useGoals } from 'shared/hooks';

import { DEFAULT_GOALS_FORM_FIELDS } from '../consts/goalsFormValues';
import { createGoalsResolver } from '../utils/createGoalsResolver';

import type { CreateGoalsFormFields } from '../interfaces/createGoalsFormFields';

const createGoalsForm = reactive<CreateGoalsFormFields>({
  ...DEFAULT_GOALS_FORM_FIELDS,
});

const isDialogVisible = ref(false);

const { createGoal } = useGoals();

const handleShowDialog = () => {
  isDialogVisible.value = true;
};

const resetDialog = () => {
  Object.assign(createGoalsForm, { ...DEFAULT_GOALS_FORM_FIELDS });

  isDialogVisible.value = false;
};

const handleCreateGoals = async () => {
  await createGoal({
    ...{
      ...createGoalsForm,
      timesToComplete: {
        ...createGoalsForm.timesToComplete,
        current: createGoalsForm.timesToComplete.start,
      },
    },
    startDate: new Date(2026, 0),
    endDate: new Date(2026, 12, 0),
    isCompleted: false,
  });

  resetDialog();
};
</script>

<template>
  <div>
    <Button
      label="Добавить цели"
      icon="pi pi-plus"
      raised
      @click="handleShowDialog"
    />
  </div>

  <Dialog v-model:visible="isDialogVisible" modal>
    <template #header>
      <h2>Создать цели</h2>
    </template>
    <BaseForm
      submit-button-label="Создать"
      submit-button-icon="pi-plus"
      class="create-goals-form"
      :initial-values="DEFAULT_GOALS_FORM_FIELDS"
      :resolver="createGoalsResolver"
      :form-submit="handleCreateGoals"
    >
      <BaseFormField name="title">
        <InputText
          id="goals-title"
          v-model="createGoalsForm.title"
          size="large"
          fluid
        />
        <label for="goals-title">Название</label>
      </BaseFormField>

      <BaseFormField name="description">
        <Textarea
          id="goals-description"
          v-model="createGoalsForm.description"
          size="large"
          class="goals-description"
          fluid
        />
        <label for="goals-description">Описание</label>
      </BaseFormField>

      <Accordion>
        <AccordionPanel value="extraSettings">
          <AccordionHeader>Дополнительные параметры</AccordionHeader>
          <AccordionContent>
            <div class="extra-settings-wrapper">
              <BaseFormField name="endTimesToComplete">
                <InputNumber
                  id="goals-endTimesToComplete"
                  v-model="createGoalsForm.timesToComplete.end"
                  fluid
                />
                <label for="goals-endTimesToComplete">Количество раз</label>
              </BaseFormField>

              <BaseFormField name="startTimesToComplete">
                <InputNumber
                  id="goals-startTimesToComplete"
                  v-model="createGoalsForm.timesToComplete.start"
                  fluid
                />
                <label for="goals-startTimesToComplete">
                  Начальное количество раз
                </label>
              </BaseFormField>

              <BaseFormField name="timesStepToComplete">
                <InputNumber
                  id="goals-timesStepToComplete"
                  v-model="createGoalsForm.timesToComplete.step"
                  fluid
                />
                <label for="goals-timesStepToComplete">Шаг</label>
              </BaseFormField>
            </div>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </BaseForm>
  </Dialog>
</template>

<style lang="scss">
.create-goals-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 500px;
  padding-top: 5px;
}

.goals-description {
  height: 100px;
  resize: none;
}

.extra-settings-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
