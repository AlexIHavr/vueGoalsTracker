export const getLocaleNumberString = (num: number) =>
  num.toLocaleString('ru-RU');

export const getEvenNumbers = (numbers: number[]) => {
  return numbers.filter((num) => num % 2 === 0);
};

export const getOddNumbers = (numbers: number[]) => {
  return numbers.filter((num) => num % 2);
};
