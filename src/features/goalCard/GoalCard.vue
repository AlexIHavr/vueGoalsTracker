<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import { computed } from 'vue';

import { useGoals } from 'shared/hooks';

import { useGoalStatusAttrs } from './hooks/useGoalStatusAttrs';

import type { GoalData } from 'shared/interfaces';

const { goal } = defineProps<{
  goal: GoalData;
}>();

const { updateGoal, removeGoal } = useGoals();

const goalStatus = computed(() => goal.status);

const goalAttrs = useGoalStatusAttrs(goalStatus);

const handleCompleteGoal = () => {
  updateGoal(goal.id, { isCompleted: !goal.isCompleted });
};
</script>

<template>
  <Card :class="['goal-card', goal.status]">
    <template #title>
      <div class="title-buttons-wrapper">
        <h3 class="goal-title">{{ goal.title }}</h3>
        <Button
          :icon="goalAttrs.titleStatusIcon"
          rounded
          variant="outlined"
          aria-label="status"
          @click="handleCompleteGoal()"
        />
      </div>
    </template>
    <template #content>{{ goal.description }}</template>
    <template #footer>
      <div class="footer-buttons-wrapper">
        <Button
          :icon="goalAttrs.completeButtonStatusIcon"
          :label="goalAttrs.completeButtonLabel"
          severity="success"
          raised
          fluid
          @click="handleCompleteGoal()"
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
.goal-title {
  margin: 0;
}

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
