type LOCAL_STORAGE_KEY = 'is-dark-theme';

export const appLocalStorage = {
  get: (key: LOCAL_STORAGE_KEY) =>
    JSON.parse(localStorage.getItem(key) as string),
  set: <T>(key: LOCAL_STORAGE_KEY, value: T) =>
    localStorage.setItem(key, JSON.stringify(value)),
  remove: (key: LOCAL_STORAGE_KEY) => localStorage.removeItem(key),
  clear: () => localStorage.clear(),
};
