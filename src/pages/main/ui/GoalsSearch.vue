<script setup lang="ts">
import Button from 'primevue/button';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import { ref, watch } from 'vue';

import { useDebounce } from 'shared/hooks';
import { searchValue } from 'shared/store';

const rowSearchValue = ref('');

const debouncedSearchValue = useDebounce(rowSearchValue);

watch(debouncedSearchValue, (value) => {
  searchValue.value = value;
});
</script>

<template>
  <InputGroup class="goals-search">
    <InputText id="search" v-model="rowSearchValue" placeholder="Поиск" />
    <InputGroupAddon>
      <Button
        icon="pi pi-search"
        :loading="rowSearchValue !== debouncedSearchValue"
      />
    </InputGroupAddon>
  </InputGroup>
</template>

<style lang="scss" scoped>
.goals-search {
  align-self: flex-start;
  width: auto;

  .is-mobile & {
    width: 100%;
  }
}
</style>
