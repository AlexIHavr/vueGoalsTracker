<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import Message from 'primevue/message';
import { computed } from 'vue';

import { useGoals } from 'shared/hooks';

import { GOAL_STATUSES } from './consts/goalStatuses';
import { useGoalStatusAttrs } from './hooks/useGoalStatusAttrs';
import { getGoalDates } from './utils/getGoalDates';
import { getGoalStatus } from './utils/getGoalStatus';
import { getGoalTimes } from './utils/getGoalTimes';

import type { GoalDocument } from 'shared/interfaces';

const { goal } = defineProps<{
  goal: GoalDocument;
}>();

const { updateGoal, removeGoal } = useGoals();

const goalStatus = computed(() => getGoalStatus(goal));

const goalTimes = computed(() => getGoalTimes(goalStatus, goal));

const goalDates = computed(() => getGoalDates(goalStatus, goal));

const goalAttrs = useGoalStatusAttrs(goalStatus);

const handleCompleteGoal = () => {
  updateGoal(goal.id, {
    isCompleted: !goal.isCompleted,
    timesCurrent: goal.timesStart,
  });
};

const handleUpdateTimes = () => {
  if (goalStatus.value !== GOAL_STATUSES.IN_PROGRESS) {
    handleCompleteGoal();
    return;
  }

  const newTimes = goal.timesCurrent + goal.timesStep;

  if (newTimes >= goal.timesEnd) {
    updateGoal(goal.id, {
      isCompleted: true,
      timesCurrent: goal.timesStart,
    });
  } else {
    updateGoal(goal.id, {
      timesCurrent: newTimes,
    });
  }
};
</script>

<template>
  <Card :class="['goal-card', goalStatus]">
    <template #title>
      <div class="title-wrapper">
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
      <div class="content-wrapper">
        <Message
          v-if="goalDates"
          size="small"
          :severity="goalAttrs.messageSeverity"
        >
          {{ goalDates }}
        </Message>
        <h4>{{ goal.description }}</h4>
      </div>
    </template>
    <template #footer>
      <div class="footer-wrapper">
        <Message
          v-if="goalTimes"
          severity="success"
          size="small"
          class="goal-times-message"
          variant="outlined"
        >
          {{ goalTimes }}
        </Message>

        <div class="footer-buttons-wrapper">
          <Button
            :icon="goalAttrs.statusIcon"
            :label="goalAttrs.completeButtonLabel"
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
      </div>
    </template>
  </Card>
</template>

<style lang="scss">
.goal-card {
  width: 300px;
  min-width: 300px;
  height: 300px;
  min-height: 300px;
}

.title-wrapper {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
}

.footer-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-buttons-wrapper {
  display: flex;
  gap: 10px;
  justify-content: space-between;
}

.goal-times-message {
  width: fit-content;
}

.p-card-body {
  height: 100%;
}

.p-card-footer {
  margin-top: auto;
}
</style>
