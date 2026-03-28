<script setup lang="ts">
import Button from 'primevue/button';
import Message from 'primevue/message';
import { computed, ref, watch } from 'vue';

import { appLocalStorage } from 'shared/utils';
import { getGoalStatus } from 'widgets/goalCard';

import type { GoalDocument } from 'shared/interfaces';
import type { GoalStatus } from 'shared/types';

const { filteredGoalsInYear } = defineProps<{
  filteredGoalsInYear: GoalDocument[];
}>();

const isShowStatistics = ref<boolean>(
  appLocalStorage.get('isShowStatistics') ?? false
);

const counters = computed<{
  counters: Record<GoalStatus, number>;
  timesCurrentSum: number;
  timesEndSum: number;
}>(() => {
  const initialCounters = {
    completed: 0,
    expired: 0,
    'in-progress': 0,
    'to-do': 0,
  } as Record<GoalStatus, number>;

  let timesCurrentSum = 0;
  let timesEndSum = 0;

  filteredGoalsInYear.forEach((goal) => {
    const goalStatus = getGoalStatus(goal);
    initialCounters[goalStatus] += 1;

    timesCurrentSum += goal.timesCurrent;
    timesEndSum += goal.timesEnd;
  });

  return {
    counters: initialCounters,
    timesCurrentSum,
    timesEndSum,
  };
});

const getCounterText = (status: GoalStatus) => {
  return `${counters.value.counters[status]} из ${filteredGoalsInYear.length}`;
};

const handleShowStatistics = () => {
  isShowStatistics.value = !isShowStatistics.value;
};

watch(isShowStatistics, (value) => {
  appLocalStorage.set('isShowStatistics', value);
});
</script>

<template>
  <Button
    icon="pi pi-chart-bar"
    raised
    :class="['show-statistics-button', { active: isShowStatistics }]"
    @click="handleShowStatistics"
  />

  <div v-if="isShowStatistics" class="goals-statistics">
    <Message class="completed-message" severity="success" icon="pi pi-check">
      Выполнено {{ getCounterText('completed') }}
    </Message>
    <Message class="in-progress-message" icon="pi pi-circle" severity="success">
      В процессе {{ getCounterText('in-progress') }}
    </Message>
    <Message class="expired-message" severity="error" icon="pi pi-clock">
      Просроченные {{ getCounterText('expired') }}
    </Message>
    <Message class="to-do-message" severity="info" icon="pi pi-bookmark">
      К выполнению {{ getCounterText('to-do') }}
    </Message>
    <Message class="times-message" severity="contrast" icon="pi pi-database">
      Количество {{ counters.timesCurrentSum }} из {{ counters.timesEndSum }}
    </Message>
  </div>
</template>

<style lang="scss" scoped>
.goals-statistics {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.show-statistics-button {
  height: 40px;
}

.completed-message {
  outline-color: transparent;
  background: var(--p-card-completed);
}

.in-progress-message {
  outline-color: transparent;
  background: var(--p-card-in-progress);
}

.expired-message {
  outline-color: transparent;
  background: var(--p-card-expired);
}

.to-do-message {
  outline-color: transparent;
  background: var(--p-card-to-do);
}

.times-message {
  outline-color: transparent;
  background: var(--p-button-primary-background);
}
</style>
