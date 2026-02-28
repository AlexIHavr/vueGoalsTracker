<script setup lang="ts">
import { FormField } from '@primevue/forms';
import FloatLabel from 'primevue/floatlabel';
import Message from 'primevue/message';

const { fieldName } = defineProps<{
  fieldName: string;
}>();
</script>

<template>
  <FormField v-slot="$field" :name="fieldName">
    <FloatLabel variant="on">
      <slot></slot>
    </FloatLabel>

    <Message
      v-if="$field?.invalid"
      severity="error"
      size="small"
      variant="simple"
      >{{ $field.error?.message }}</Message
    >
  </FormField>
</template>

<style lang="scss" scoped>
.p-message-simple {
  margin-top: 8px;
}
</style>
