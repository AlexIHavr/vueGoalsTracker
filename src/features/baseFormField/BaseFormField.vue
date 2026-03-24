<script setup lang="ts" generic="T extends string">
import FormField from '@primevue/forms/formfield';
import FloatLabel from 'primevue/floatlabel';
import Message from 'primevue/message';

const { name } = defineProps<{ name: T }>();
</script>

<template>
  <FormField v-slot="$field" :name>
    <FloatLabel variant="on">
      <slot />
    </FloatLabel>

    <Message
      v-if="$field?.invalid"
      severity="error"
      size="small"
      variant="simple"
    >
      {{ $field.error?.message }}
    </Message>
  </FormField>
</template>

<style lang="scss" scoped>
.p-message-simple {
  margin-top: 8px;
}
</style>
