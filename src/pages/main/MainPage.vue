<script setup lang="ts">
import { useGoals } from 'shared/hooks';

import GoalsBoard from './components/GoalsBoard.vue';
import MainHeader from './components/MainHeader.vue';

const { data } = useGoals();

const isLoading = data.pending;
</script>

<template>
  <div v-if="!isLoading">
    <MainHeader />
    <GoalsBoard />
  </div>
</template>
