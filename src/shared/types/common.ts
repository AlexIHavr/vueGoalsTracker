export type ValueOf<T extends object> = T[keyof T];

export type NotNullableObject<T> = {
  [K in keyof T]-?: NonNullable<T[K]>;
};
