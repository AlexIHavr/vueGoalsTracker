import { ref, watchEffect } from 'vue';

import { MEDIA_QUERIES } from 'shared/consts';

export function useMatchMedia(mediaQuery = MEDIA_QUERIES.MOBILE) {
  const isMatchMedia = ref<boolean>(false);

  const setMatches = () => {
    isMatchMedia.value = window.matchMedia(
      `(max-width: ${mediaQuery}px)`
    ).matches;
  };

  watchEffect((onCleanup) => {
    setMatches();

    window.addEventListener('resize', setMatches);

    onCleanup(() => {
      window.removeEventListener('resize', setMatches);
    });
  });

  return isMatchMedia;
}
