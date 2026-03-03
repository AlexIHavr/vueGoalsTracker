export type FormErrors<T extends object> = Record<
  keyof T,
  { message: string }[]
>;
