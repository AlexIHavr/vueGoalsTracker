<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Drawer from 'primevue/drawer';
import ProgressSpinner from 'primevue/progressspinner';
import { ref, watchEffect } from 'vue';

import { MAX_GOALS_COUNT } from 'shared/consts';
import { useGoals } from 'shared/hooks';
import { useMatchMedia } from 'shared/hooks';

import GoalsBoard from './components/GoalsBoard.vue';
import GoalsBoardHeader from './components/GoalsBoardHeader.vue';

import type { HistoryState } from 'shared/interfaces';

const {
  data: { pending },
} = useGoals();

const isMobileMedia = useMatchMedia();

const isWelcomeDialogVisible = ref<boolean>(true);
const isMobileDrawerVisible = ref<boolean>(false);

const isNewUser = (history.state as HistoryState).isNewUser;

const hideWelcomeDialog = () => {
  history.replaceState(
    { ...history.state, isNewUser: false } as HistoryState,
    ''
  );
};

const handleToggleMobileDrawerVisible = () => {
  isMobileDrawerVisible.value = !isMobileDrawerVisible.value;
};

watchEffect(() => {
  if (isMobileDrawerVisible.value) {
    document.body.classList.add('is-overflow-hidden');
  } else {
    document.body.classList.remove('is-overflow-hidden');
  }
});
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
        можешь сразу несколько - на каждый месяц или даже на каждый день. Помни,
        что ты можешь создать только {{ MAX_GOALS_COUNT }} целей в год. Удачи!
      </h4>
    </Dialog>

    <Drawer v-model:visible="isMobileDrawerVisible" header="Меню" block-scroll>
      <GoalsBoardHeader />
    </Drawer>

    <Button
      v-if="isMobileMedia"
      icon="pi pi-bars"
      label="Меню"
      raised
      @click="handleToggleMobileDrawerVisible"
    />
    <GoalsBoardHeader v-else />
    <GoalsBoard />
  </div>
  <ProgressSpinner v-else class="loader" />
</template>

<style lang="scss" scoped>
.main-page {
  display: flex;
  flex-direction: column;
  gap: 30px;

  .is-mobile & {
    gap: 10px;
    overflow: hidden;
  }
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
