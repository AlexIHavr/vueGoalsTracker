<script setup lang="ts">
import { useGoals } from 'shared/hooks';

import GoalsBoard from './components/GoalsBoard.vue';
import GoalsBoardHeader from './components/GoalsBoardHeader.vue';
import MainHeader from './components/MainHeader.vue';

const {
  data: { pending },
} = useGoals();
</script>

<template>
  <div v-if="!pending" class="main-page">
    <MainHeader />
    <GoalsBoardHeader />
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
