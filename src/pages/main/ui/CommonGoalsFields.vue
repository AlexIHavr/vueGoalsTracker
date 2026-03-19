<script setup lang="ts">
import AutoComplete, {
  type AutoCompleteCompleteEvent,
} from 'primevue/autocomplete';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import { computed, ref } from 'vue';

import { BaseFormField } from 'features/baseFormField';
import { useGoals } from 'shared/hooks';
import { getUniqueArr } from 'shared/utils';

import { DEFAULT_GOALS_FORM_FIELDS } from '../consts/goalsFormFields';

import type { CreateGoalsFormFields } from '../interfaces/createGoalsFormFields';

const title = defineModel<CreateGoalsFormFields['title']>('title', {
  required: true,
});

const description = defineModel<CreateGoalsFormFields['description']>(
  'description',
  { required: true }
);

const category = defineModel<CreateGoalsFormFields['category']>('category', {
  required: true,
});

const { data } = useGoals();

const uniqueGoalCategories = computed(() =>
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
  <!-- @vue-generic {keyof CreateGoalsFormFields} -->
  <BaseFormField name="title" :initial-value="DEFAULT_GOALS_FORM_FIELDS.title">
    <InputText id="goals-title" v-model.trim="title" size="large" fluid />
    <label for="goals-title">Название*</label>
  </BaseFormField>

  <!-- @vue-generic {keyof CreateGoalsFormFields} -->
  <BaseFormField
    name="description"
    :initial-value="DEFAULT_GOALS_FORM_FIELDS.description"
  >
    <Textarea
      id="goals-description"
      v-model.trim="description"
      size="large"
      class="goals-description"
      fluid
    />
    <label for="goals-description">Описание</label>
  </BaseFormField>

  <!-- @vue-generic {keyof CreateGoalsFormFields} -->
  <BaseFormField
    name="category"
    :initial-value="DEFAULT_GOALS_FORM_FIELDS.category"
  >
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
