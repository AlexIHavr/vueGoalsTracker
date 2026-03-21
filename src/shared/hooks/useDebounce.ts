import { ref, type Ref, watch } from 'vue';

export function useDebounce(value: Ref<string>, delay: number = 200) {
  const debouncedValue = ref('');
  let timeout: number;

  watch(value, (newValue) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      debouncedValue.value = newValue;
    }, delay);
  });

  return debouncedValue;
}
