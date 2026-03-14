<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';

import { BaseFormField } from 'features/baseFormField';

import { DEFAULT_GOALS_FORM_FIELDS } from '../consts/goalsFormFields';

import type { CreateGoalsFormFields } from '../interfaces/createGoalsFormFields';

type Title = Pick<CreateGoalsFormFields, 'title'>['title'];
type Description = Pick<CreateGoalsFormFields, 'description'>['description'];

const title = defineModel<Title>('title', { required: true });

const description = defineModel<Description>('description', { required: true });
</script>

<template>
  <!-- @vue-generic {keyof CreateGoalsFormFields} -->
  <BaseFormField name="title" :initial-value="DEFAULT_GOALS_FORM_FIELDS.title">
    <InputText id="goals-title" v-model="title" size="large" fluid />
    <label for="goals-title">Название*</label>
  </BaseFormField>

  <!-- @vue-generic {keyof CreateGoalsFormFields} -->
  <BaseFormField
    name="description"
    :initial-value="DEFAULT_GOALS_FORM_FIELDS.description"
  >
    <Textarea
      id="goals-description"
      v-model="description"
      size="large"
      class="goals-description"
      fluid
    />
    <label for="goals-description">Описание</label>
  </BaseFormField>
</template>

<style lang="scss">
.goals-description {
  height: 100px;
  resize: none;
}
</style>
