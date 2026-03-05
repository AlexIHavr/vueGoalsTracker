<script setup lang="ts">
import { useGoals } from 'shared/hooks';

import CreateGoalsDialog from './components/CreateGoalsDialog.vue';
import GoalsBoard from './components/GoalsBoard.vue';
import MainHeader from './components/MainHeader.vue';

const {
  data: { pending },
} = useGoals();
</script>

<template>
  <div v-if="!pending" class="main-page">
    <MainHeader />
    <CreateGoalsDialog />
    <GoalsBoard />
  </div>
</template>

<style lang="scss">
.main-page {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>
