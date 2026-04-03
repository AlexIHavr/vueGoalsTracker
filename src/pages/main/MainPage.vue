<script setup lang="ts">
import Dialog from 'primevue/dialog';
import ProgressSpinner from 'primevue/progressspinner';
import { ref } from 'vue';

import { useGoals } from 'shared/hooks';

import GoalsBoard from './components/GoalsBoard.vue';
import GoalsBoardHeader from './components/GoalsBoardHeader.vue';

import type { HistoryState } from 'shared/interfaces';

const {
  data: { pending },
} = useGoals();

const isWelcomeDialogVisible = ref<boolean>(true);

const isNewUser = (history.state as HistoryState).isNewUser;

const hideWelcomeDialog = () => {
  history.replaceState(
    { ...history.state, isNewUser: false } as HistoryState,
    ''
  );
};
</script>

<template>
  <div v-if="!pending" class="main-page">
    <Dialog
      v-if="isNewUser"
      v-model:visible="isWelcomeDialogVisible"
      header="Добро пожаловать в Goals Tracker"
      modal
      @after-hide="hideWelcomeDialog"
    >
      <h4 class="welcome-content">
        Здесь ты сможешь создавать свои цели на текущий год. Можешь по одной, а
        можешь сразу несколько - на каждый месяц или даже на каждый день. Удачи!
      </h4>
    </Dialog>

    <GoalsBoardHeader />
    <GoalsBoard />
  </div>
  <ProgressSpinner v-else class="loader" />
</template>

<style lang="scss" scoped>
.main-page {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.loader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.welcome-content {
  width: 500px;
  line-height: 25px;
  text-align: center;
}
</style>
