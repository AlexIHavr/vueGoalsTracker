import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  watch,
  type ComputedRef,
  type Ref,
} from 'vue';

import type { GoalDocument } from 'shared/interfaces';

const STEP = 10;

export function useVisibleGoals(
  sortedGoalsInYear: ComputedRef<GoalDocument[]>,
  observerTriggerRef: Ref<HTMLDivElement | null>
) {
  const visibleCount = ref<number>(0);

  let observer: IntersectionObserver | null = null;

  const visibleGoals = computed(() => {
    return sortedGoalsInYear.value.slice(0, visibleCount.value);
  });

  const hasMore = computed(() => {
    return visibleCount.value < sortedGoalsInYear.value.length;
  });

  const showMore = () => {
    const newCount = Math.min(
      visibleCount.value + STEP,
      sortedGoalsInYear.value.length
    );

    visibleCount.value = newCount;
  };

  watch(visibleGoals, () => {
    if (observerTriggerRef.value) {
      observer?.unobserve(observerTriggerRef.value);
      observer?.observe(observerTriggerRef.value);
    }
  });

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore.value) {
          showMore();
        }
      },
      { rootMargin: '0px 0px 300px 0px' }
    );
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  return visibleGoals;
}
