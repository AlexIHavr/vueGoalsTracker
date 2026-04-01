<script setup lang="ts">
import AutoComplete, {
  type AutoCompleteCompleteEvent,
} from 'primevue/autocomplete';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import { computed, inject, ref } from 'vue';

import { BaseFormField } from 'features/baseFormField';
import { useGoals } from 'shared/hooks';
import { getUniqueArr } from 'shared/utils';

import { INITIAL_FIELDS_INJECT_KEY } from '../consts/injectKeys';

import type { GoalFormFields } from '../interfaces/goalFormFields';

const initialFields = inject(INITIAL_FIELDS_INJECT_KEY);

const title = defineModel<GoalFormFields['title']>('title', {
  required: true,
});

const description = defineModel<GoalFormFields['description']>('description', {
  required: true,
});

const category = defineModel<GoalFormFields['category']>('category', {
  required: true,
});

const { data } = useGoals();

const uniqueGoalCategories = computed<string[]>(() =>
  getUniqueArr(data.value.map(({ category }) => category)).filter(Boolean)
);

const categorySuggestions = ref<string[] | undefined>();

const handleComplete = (event: AutoCompleteCompleteEvent) => {
  const filteredCategorySuggestions = uniqueGoalCategories.value.filter(
    (category) => category.includes(event.query)
  );

  categorySuggestions.value = filteredCategorySuggestions.length
    ? filteredCategorySuggestions
    : undefined;
};
</script>

<template>
  <!-- @vue-generic {keyof GoalFormFields} -->
  <BaseFormField name="title" :initial-value="initialFields?.title">
    <InputText id="goals-title" v-model.trim="title" size="large" fluid />
    <label for="goals-title">Название*</label>
  </BaseFormField>

  <!-- @vue-generic {keyof GoalFormFields} -->
  <BaseFormField name="description" :initial-value="initialFields?.description">
    <Textarea
      id="goals-description"
      v-model.trim="description"
      size="large"
      class="goals-description"
      fluid
    />
    <label for="goals-description">Описание</label>
  </BaseFormField>

  <!-- @vue-generic {keyof GoalFormFields} -->
  <BaseFormField name="category" :initial-value="initialFields?.category">
    <AutoComplete
      v-model.trim="category"
      input-id="goals-category"
      size="large"
      fluid
      complete-on-focus
      :suggestions="categorySuggestions"
      :show-empty-message="false"
      @complete="handleComplete"
    />
    <label for="goals-category">Категория</label>
  </BaseFormField>
</template>

<style lang="scss" scoped>
.goals-description {
  height: 100px;
  resize: none;
}
</style>
