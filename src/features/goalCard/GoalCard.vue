<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import Message from 'primevue/message';
import Tag from 'primevue/tag';
import { computed } from 'vue';

import { useGoals } from 'shared/hooks';
import { selectedCategoryFilters } from 'shared/store';

import { useGoalStatusAttrs } from './hooks/useGoalStatusAttrs';
import { getGoalDates } from './utils/getGoalDates';
import { getGoalStatus } from './utils/getGoalStatus';
import { getGoalTimes } from './utils/getGoalTimes';

import type { GoalDocument } from 'shared/interfaces';

const { goal } = defineProps<{
  goal: GoalDocument;
}>();

const { data, updateGoal, removeGoal } = useGoals();

const goalStatus = computed(() => getGoalStatus(goal));

const goalTimes = computed(() => getGoalTimes(goal));

const goalDates = computed(() => getGoalDates(goalStatus.value, goal));

const goalAttrs = useGoalStatusAttrs(goalStatus);

const handleCompleteGoal = () => {
  updateGoal(goal.id, {
    isCompleted: !goal.isCompleted,
    timesCurrent: goal.isCompleted ? goal.timesStart : goal.timesEnd,
  });
};

const handleRemoveGoal = async () => {
  const isLastCategoryTag =
    data.value.filter(({ category }) => category === goal.category).length ===
    1;

  await removeGoal(goal.id);

  if (isLastCategoryTag) {
    selectedCategoryFilters.value = selectedCategoryFilters.value.filter(
      (category) => category !== goal.category
    );
  }
};

const handleUpdateTimes = () => {
  if (goalStatus.value !== 'in-progress') {
    handleCompleteGoal();
    return;
  }

  const newTimes = goal.timesCurrent + goal.timesStep;

  updateGoal(goal.id, {
    isCompleted: newTimes >= goal.timesEnd ? true : false,
    timesCurrent: newTimes,
  });
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

      <div class="title-wrapper">
        <h4>{{ goal.title }}</h4>
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
.goal-card {
  position: relative;
  width: 320px;
  min-width: 320px;
  height: 300px;
  min-height: 300px;
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

.goal-description {
  max-height: 130px;
  overflow: auto;
  white-space: pre-line;

  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>
