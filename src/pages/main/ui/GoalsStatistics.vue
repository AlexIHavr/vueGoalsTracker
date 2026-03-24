<script setup lang="ts">
import Button from 'primevue/button';
import Message from 'primevue/message';
import { computed, ref, watch } from 'vue';

import { getGoalStatus } from 'features/goalCard';
import { appLocalStorage } from 'shared/utils';

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
    <Message icon="pi pi-circle" severity="success">
      В процессе {{ getCounterText('in-progress') }}
    </Message>
    <Message severity="error" icon="pi pi-clock">
      Просроченные {{ getCounterText('expired') }}
    </Message>
    <Message severity="info" icon="pi pi-bookmark">
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
  background: var(--p-success-message-in-statistics);
}

.times-message {
  outline-color: transparent;
  background: var(--p-times-message-in-statistics);
}
</style>
