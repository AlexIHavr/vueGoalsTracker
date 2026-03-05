<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';

import { GOAL_STATUSES } from 'shared/consts';
import { useGoals } from 'shared/hooks';

import type { GoalData } from 'shared/interfaces';

const { data, updateGoal, removeGoal } = useGoals();

const getTitleStatusIcon = ({ status }: GoalData) => {
  switch (status) {
    case GOAL_STATUSES.COMPLETED:
      return 'pi pi-check';

    case GOAL_STATUSES.EXPIRED:
      return 'pi pi-times';

    case GOAL_STATUSES.IN_PROGRESS:
      return 'pi pi-circle-fill';

    case GOAL_STATUSES.TO_DO:
    default:
      return 'pi pi-bookmark';
  }
};

const getCompleteButtonStatusIcon = ({ status }: GoalData) => {
  switch (status) {
    case GOAL_STATUSES.COMPLETED:
      return 'pi pi-check-circle';

    case GOAL_STATUSES.EXPIRED:
      return 'pi pi-times';

    case GOAL_STATUSES.IN_PROGRESS:
      return 'pi pi-circle';

    case GOAL_STATUSES.TO_DO:
    default:
      return 'pi pi-bookmark';
  }
};

const getCompleteButtonLabel = ({ status }: GoalData) => {
  switch (status) {
    case GOAL_STATUSES.COMPLETED:
      return 'Выполнено';

    case GOAL_STATUSES.EXPIRED:
      return 'Срок истек';

    case GOAL_STATUSES.IN_PROGRESS:
      return 'Выполнить';

    case GOAL_STATUSES.TO_DO:
    default:
      return 'К выполнению';
  }
};

const handleCompleteGoal = ({ id, isCompleted }: GoalData) => {
  updateGoal(id, { isCompleted: !isCompleted });
};
</script>

<template>
  <main class="goals-board-wrapper">
    <Card v-for="goal in data" :key="goal.id" class="goal-card">
      <template #title>
        <div class="title-buttons-wrapper">
          <h3 class="goal-title">{{ goal.title }}</h3>
          <Button
            :icon="getTitleStatusIcon(goal)"
            rounded
            variant="outlined"
            aria-label="status"
            @click="handleCompleteGoal(goal)"
          />
        </div>
      </template>
      <template #content>{{ goal.description }}</template>
      <template #footer>
        <div class="footer-buttons-wrapper">
          <Button
            :icon="getCompleteButtonStatusIcon(goal)"
            :label="getCompleteButtonLabel(goal)"
            severity="success"
            raised
            fluid
            @click="handleCompleteGoal(goal)"
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
  </main>
</template>

<style lang="scss">
.goal-title {
  margin: 0;
}

.goals-board-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
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
