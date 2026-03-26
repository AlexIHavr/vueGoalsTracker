<script setup lang="ts">
import Checkbox from 'primevue/checkbox';

const showOneTimes = defineModel<boolean>('showOneTimes', {
  required: true,
});

const overTimes = defineModel<boolean>('overTimes', {
  required: true,
});
</script>

<template>
  <div class="checkbox-field">
    <Checkbox
      v-model="showOneTimes"
      input-id="show-one-times"
      size="small"
      binary
    />
    <label for="show-one-times" class="checkbox-field-label">
      Показывать одно количество
    </label>
  </div>

  <div class="checkbox-field">
    <Checkbox v-model="overTimes" input-id="over-times" size="small" binary />
    <label for="over-times" class="checkbox-field-label">
      Добавлять сверх количество
    </label>
  </div>
</template>

<style lang="scss" scoped>
.checkbox-field {
  display: flex;
  gap: 5px;
  align-items: center;
}

.checkbox-field-label {
  cursor: pointer;
  user-select: none;
}
</style>
