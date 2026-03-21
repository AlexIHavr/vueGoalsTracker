import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  type ComputedRef,
  type Ref,
} from 'vue';

import type { GoalDocument } from 'shared/interfaces';

const STEP = 15;

export function useVisibleGoals(
  filteredGoalsInYear: ComputedRef<GoalDocument[]>,
  observerTriggerRef: Ref<HTMLDivElement | null>
) {
  const visibleCount = ref(STEP);

  let observer: IntersectionObserver | null = null;

  const visibleGoals = computed(() => {
    return filteredGoalsInYear.value.slice(0, visibleCount.value);
  });

  const hasMore = computed(() => {
    return visibleCount.value < filteredGoalsInYear.value.length;
  });

  const showMore = () => {
    const newCount = Math.min(
      visibleCount.value + STEP,
      filteredGoalsInYear.value.length
    );

    visibleCount.value = newCount;
  };

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore.value) {
          showMore();
        }
      },
      { rootMargin: '0px 0px 300px 0px' }
    );

    if (observerTriggerRef.value) {
      observer.observe(observerTriggerRef.value);
    }
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  return visibleGoals;
}
