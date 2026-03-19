import type { GoalStatus, SortOrder, SortTypes } from 'shared/types';

interface LocalStorageKeys {
  isDarkTheme: boolean;
  selectedStatusFilters: GoalStatus[];
  selectedSortType: SortTypes;
  selectedSortOrder: SortOrder;
  selectedCategoryFilters: string[];
}

export const appLocalStorage = {
  get: <T extends keyof LocalStorageKeys>(key: T): LocalStorageKeys[T] =>
    JSON.parse(localStorage.getItem(key) as string),
  set: <T extends keyof LocalStorageKeys>(key: T, value: LocalStorageKeys[T]) =>
    localStorage.setItem(key, JSON.stringify(value)),
  remove: (key: keyof LocalStorageKeys) => localStorage.removeItem(key),
  clear: () => localStorage.clear(),
};
