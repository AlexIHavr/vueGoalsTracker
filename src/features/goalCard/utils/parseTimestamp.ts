import type { Timestamp } from 'firebase/firestore';

export const parseTimestamp = (timestamp: Timestamp) => {
  return timestamp.toDate().toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
  });
};

export const isFullYear = (
  startTimestamp: Timestamp,
  endTimestamp: Timestamp
) => {
  const startDate = startTimestamp.toDate();
  const endDate = endTimestamp.toDate();

  const isStartYear = startDate.getMonth() === 0 && startDate.getDate() === 1;

  const isEndYear = endDate.getMonth() === 11 && endDate.getDate() === 31;

  return isStartYear && isEndYear;
};

export const isFullMonth = (
  startTimestamp: Timestamp,
  endTimestamp: Timestamp
) => {
  const startDate = startTimestamp.toDate();
  const endDate = endTimestamp.toDate();

  if (startDate.getMonth() !== endDate.getMonth()) {
    return false;
  }

  const isStartMonth = startDate.getDate() === 1;

  const lastDayOfMonth = new Date(
    endDate.getFullYear(),
    endDate.getMonth() + 1,
    0
  ).getDate();

  const isEndMonth = endDate.getDate() === lastDayOfMonth;

  return isStartMonth && isEndMonth;
};
