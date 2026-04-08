<script setup lang="ts">
import Message from 'primevue/message';
import ToggleSwitch from 'primevue/toggleswitch';
import { inject } from 'vue';

import { GoalTip } from 'features/goalTip';

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
      :default-value="initialSwitchSettings?.isShowOneTimes"
    />

    <label for="show-one-times" class="switch-field-label">
      <Message severity="secondary">Видно 1 количество</Message>
    </label>

    <GoalTip
      text="Показывает количество, даже если оно одно, например 0 из 1. По умолчанию количество равное одному будет скрыто"
    />
  </div>

  <div class="switch-field">
    <ToggleSwitch
      v-model="overTimes"
      input-id="over-times"
      :default-value="initialSwitchSettings?.isOverTimes"
    />

    <label for="over-times" class="switch-field-label">
      <Message severity="secondary">Сверх количество</Message>
    </label>

    <GoalTip
      text="Позволяет выполнять цель сверх заданного количества, например 5 из 1"
    />
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
  flex-grow: 1;
  cursor: pointer;
  user-select: none;
}
</style>
