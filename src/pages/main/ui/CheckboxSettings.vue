<script setup lang="ts">
import Checkbox from 'primevue/checkbox';

const showOneTimes = defineModel<boolean>('showOneTimes', {
  required: true,
});
</script>

<template>
  <div class="show-one-times-field">
    <Checkbox
      v-model="showOneTimes"
      input-id="show-one-times"
      value="Cheese"
      size="small"
      binary
    />
    <label for="show-one-times" class="show-one-times-label">
      Показывать одно количество
    </label>
  </div>
</template>

<style lang="scss" scoped>
.show-one-times-field {
  display: flex;
  gap: 5px;
  align-items: center;
}

.show-one-times-label {
  cursor: pointer;
  user-select: none;
}
</style>
