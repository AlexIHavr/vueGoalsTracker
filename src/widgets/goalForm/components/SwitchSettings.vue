<script setup lang="ts">
import ToggleSwitch from 'primevue/toggleswitch';
import { inject } from 'vue';

import { INITIAL_SWITCH_SETTINGS_INJECT_KEY } from '../consts/injectKeys';

const initialSwitchSettings = inject(INITIAL_SWITCH_SETTINGS_INJECT_KEY);

const showOneTimes = defineModel<boolean>('showOneTimes', {
  required: true,
});

const overTimes = defineModel<boolean>('overTimes', {
  required: true,
});
</script>

<template>
  <div class="switch-field">
    <ToggleSwitch
      v-model="showOneTimes"
      input-id="show-one-times"
      :default-value="initialSwitchSettings?.showOneTimes"
    />
    <label for="show-one-times" class="switch-field-label">
      Показывать одно количество
    </label>
  </div>

  <div class="switch-field">
    <ToggleSwitch
      v-model="overTimes"
      input-id="over-times"
      :default-value="initialSwitchSettings?.overTimes"
    />
    <label for="over-times" class="switch-field-label">
      Добавлять сверх количество
    </label>
  </div>
</template>

<style lang="scss" scoped>
.switch-field {
  display: flex;
  gap: 10px;
  align-items: center;
  font-weight: 600;
}

.switch-field-label {
  cursor: pointer;
  user-select: none;
}
</style>
