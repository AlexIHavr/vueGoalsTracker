<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import Message from 'primevue/message';
import Tag from 'primevue/tag';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { MAX_TIMES, ROUTES_PATHS } from 'shared/consts';
import { useGoals, useGoalsInYear } from 'shared/hooks';
import { selectedCategoryFilters } from 'shared/store';

import { getGoalDates } from './utils/getGoalDates';
import {
  getGoalStatus,
  getGoalStatusExceptCompleted,
} from './utils/getGoalStatus';
import { getGoalStatusAttrs } from './utils/getGoalStatusAttrs';
import { getGoalTimes } from './utils/getGoalTimes';

import type { GoalDocument } from 'shared/interfaces';

const router = useRouter();
const route = useRoute();

const { goal } = defineProps<{
  goal: GoalDocument;
}>();

const { updateGoal, removeGoal } = useGoals();

const goalsInYear = useGoalsInYear();

const goalStatus = computed(() => getGoalStatus(goal));

const goalTimes = computed(() => getGoalTimes(goal));

const goalDates = computed(() => getGoalDates(goalStatus.value, goal));

const goalAttrs = computed(() => getGoalStatusAttrs(goalStatus.value));

const handleCompleteGoal = () => {
  updateGoal(goal.id, {
    isCompleted: !goal.isCompleted,
    timesCurrent: goal.isCompleted ? goal.timesStart : goal.timesEnd,
  });
};

const handleRemoveGoal = async () => {
  const isLastCategoryTag =
    goalsInYear.value.filter(({ category }) => category === goal.category)
      .length === 1;

  await removeGoal(goal.id);

  if (isLastCategoryTag) {
    selectedCategoryFilters.value = selectedCategoryFilters.value.filter(
      (category) => category !== goal.category
    );
  }
};

const handleUpdateTimes = () => {
  const isOverUpdateTimes =
    goal.isOverTimes &&
    getGoalStatusExceptCompleted(goal) === 'in-progress' &&
    goal.timesCurrent < MAX_TIMES;

  if (goalStatus.value !== 'in-progress' && !isOverUpdateTimes) {
    handleCompleteGoal();
    return;
  }

  const newTimes = goal.timesCurrent + goal.timesStep;
  const timesLimit = goal.isOverTimes ? MAX_TIMES : goal.timesEnd;

  updateGoal(goal.id, {
    isCompleted: newTimes >= goal.timesEnd,
    timesCurrent: newTimes > timesLimit ? goal.timesEnd : newTimes,
  });
};

const goToEditGoal = () => {
  router.push(`${ROUTES_PATHS.EDIT_GOAL.path}/${goal.id}`);
};
</script>

<template>
  <Card :class="['goal-card', goalStatus]">
    <template #title>
      <Tag
        v-show="goal.category"
        icon="pi pi-tag"
        class="category-tag"
        :value="goal.category"
        :severity="goalAttrs.buttonSeverity"
      />

      <Tag
        v-if="!route.path.includes(ROUTES_PATHS.EDIT_GOAL.path)"
        icon="pi pi-pencil"
        class="edit-goal-button"
        :severity="goalAttrs.buttonSeverity"
        @click="goToEditGoal"
      />

      <div class="title-wrapper">
        <h4 class="goal-title">{{ goal.title }}</h4>

        <Button
          size="small"
          rounded
          :icon="goalAttrs.statusIcon"
          :severity="goalAttrs.buttonSeverity"
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

        <h4 class="goal-description">
          {{ goal.description }}
        </h4>
      </div>
    </template>

    <template #footer>
      <div class="footer-wrapper">
        <Message
          v-if="goalTimes"
          size="small"
          class="goal-times-message"
          variant="outlined"
          :severity="goalAttrs.messageSeverity"
        >
          {{ goalTimes }}
        </Message>

        <div class="footer-buttons-wrapper">
          <Button
            raised
            fluid
            :icon="goalAttrs.statusIcon"
            :label="goalAttrs.completeButtonLabel"
            :severity="goalAttrs.buttonSeverity"
            @click="handleUpdateTimes()"
          />

          <Button
            icon="pi pi-trash"
            severity="danger"
            raised
            @click="handleRemoveGoal"
          />
        </div>
      </div>
    </template>
  </Card>
</template>

<style lang="scss" scoped>
$goal-card-size: 320px;
$goal-max-width: calc($goal-card-size - 2 * var(--p-card-body-padding));

.goal-card {
  position: relative;
  width: $goal-card-size;
  min-width: $goal-card-size;
  height: $goal-card-size;
  min-height: $goal-card-size;
  padding-top: 10px;
  transition: var(--p-button-transition-duration);
}

.category-tag {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: var(--p-card-border-radius) 0;
}

.title-wrapper {
  display: flex;
  gap: 10px;
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

.goal-title {
  max-width: calc($goal-max-width - var(--p-button-sm-icon-only-width) - 10px);
  max-height: 30px;
  overflow: hidden auto;

  &::-webkit-scrollbar {
    width: 0;
  }
}

.goal-description {
  max-width: $goal-max-width;
  max-height: 100px;
  overflow: auto;
  white-space: pre-line;

  &::-webkit-scrollbar {
    width: 0;
  }
}

.edit-goal-button {
  position: absolute;
  top: 0;
  right: 0;
  height: 25px;
  cursor: pointer;
  border-radius: 0 var(--p-card-border-radius);
}
</style>
