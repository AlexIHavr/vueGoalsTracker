<script setup lang="ts">
import Button from 'primevue/button';
import Popover from 'primevue/popover';
import { ref } from 'vue';

const { text } = defineProps<{ text: string }>();

const goalTipRef = ref<InstanceType<typeof Popover> | null>(null);

const isGoalTipVisible = ref<boolean>(false);

const toggleGoalTip = (event: PointerEvent) => {
  goalTipRef.value?.toggle(event);
};

const onShowPopover = () => {
  isGoalTipVisible.value = true;
};

const onHidePopover = () => {
  isGoalTipVisible.value = false;
};
</script>

<template>
  <div>
    <Button
      icon="pi pi-info-circle"
      variant="text"
      :class="{ 'active-tip': isGoalTipVisible }"
      @click="toggleGoalTip"
    />

    <Popover ref="goalTipRef" @show="onShowPopover" @hide="onHidePopover">
      <div class="goal-tip-text">{{ text }}</div>
    </Popover>
  </div>
</template>

<style lang="scss" scoped>
.goal-tip-text {
  max-width: 400px;
  font-size: 0.9rem;
  font-weight: 600;
  text-align: center;
}

.p-button.active-tip:not(:disabled) {
  background: var(--p-button-text-primary-active-background);
}
</style>
