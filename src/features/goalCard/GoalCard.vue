<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import { computed } from 'vue';

import { useGoals } from 'shared/hooks';

import { GOAL_STATUSES } from './consts/goalStatuses';
import { useGoalStatusAttrs } from './hooks/useGoalStatusAttrs';
import { getGoalStatus } from './utils/getGoalStatus';

import type { GoalDocument } from 'shared/interfaces';

const { goal } = defineProps<{
  goal: GoalDocument;
}>();

const { updateGoal, removeGoal } = useGoals();

const goalStatus = computed(() => getGoalStatus(goal));

const goalTimes = computed(() => {
  let timesStr = '';

  if (goalStatus.value !== GOAL_STATUSES.IN_PROGRESS) {
    return timesStr;
  }

  if (goal.timesToComplete.end === 1) {
    return timesStr;
  }

  timesStr += ` ${String(goal.timesToComplete.current)} из ${String(goal.timesToComplete.end)}`;

  if (goal.timesToComplete.step > 1) {
    timesStr += ` (шаг - ${goal.timesToComplete.step})`;
  }

  return timesStr;
});

const goalAttrs = useGoalStatusAttrs(goalStatus);

const handleCompleteGoal = () => {
  updateGoal(goal.id, {
    isCompleted: !goal.isCompleted,
    timesToComplete: {
      ...goal.timesToComplete,
      current: goal.timesToComplete.start,
    },
  });
};

const handleUpdateTimes = () => {
  if (goalStatus.value !== GOAL_STATUSES.IN_PROGRESS) {
    handleCompleteGoal();
    return;
  }

  const { current, end, start, step } = goal.timesToComplete;

  const newTime = current + step;

  if (newTime >= end) {
    updateGoal(goal.id, {
      isCompleted: true,
      timesToComplete: { ...goal.timesToComplete, current: start },
    });
  } else {
    updateGoal(goal.id, {
      timesToComplete: { ...goal.timesToComplete, current: newTime },
    });
  }
};
</script>

<template>
  <Card :class="['goal-card', goalStatus]">
    <template #title>
      <div class="title-buttons-wrapper">
        <h3>{{ goal.title }}</h3>
        <Button
          :icon="goalAttrs.statusIcon"
          rounded
          aria-label="status"
          :severity="goalAttrs.buttonSeverity"
          size="small"
          @click="handleCompleteGoal()"
        />
      </div>
    </template>
    <template #content>
      <h4>{{ goal.description }}</h4>
    </template>
    <template #footer>
      <div class="footer-buttons-wrapper">
        <Button
          :icon="goalAttrs.statusIcon"
          :label="goalAttrs.completeButtonLabel + goalTimes"
          :severity="goalAttrs.buttonSeverity"
          raised
          fluid
          @click="handleUpdateTimes()"
        />
        <Button
          icon="pi pi-trash"
          aria-label="Save"
          severity="danger"
          raised
          @click="removeGoal(goal.id)"
        />
      </div>
    </template>
  </Card>
</template>

<style lang="scss">
.goal-card {
  width: 300px;
  min-width: 300px;
  height: 220px;
  min-height: 220px;
}

.title-buttons-wrapper {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}

.footer-buttons-wrapper {
  display: flex;
  gap: 10px;
  justify-content: space-between;
}

.p-card-body {
  height: 100%;
}

.p-card-footer {
  margin-top: auto;
}
</style>
