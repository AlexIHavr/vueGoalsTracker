import type { GoalStatus, SortOrder, SortTypes } from 'shared/types';

interface LocalStorageKeys {
  isDarkTheme: boolean;
  selectedStatusFilters: GoalStatus[];
  selectedCategoryFilters: string[];
  selectedDatesRangeFilters: [Date, Date | null] | [];
  selectedSortType: SortTypes;
  selectedSortOrder: SortOrder;
  isShowStatistics: boolean;
}

export const appLocalStorage = {
  get: <T extends keyof LocalStorageKeys>(
    key: T
  ): LocalStorageKeys[T] | undefined => {
    return JSON.parse(localStorage.getItem(key) as string);
  },

  set: <T extends keyof LocalStorageKeys>(
    key: T,
    value: LocalStorageKeys[T]
  ) => {
    return localStorage.setItem(key, JSON.stringify(value));
  },

  remove: (key: keyof LocalStorageKeys) => localStorage.removeItem(key),

  clear: () => localStorage.clear(),
};
