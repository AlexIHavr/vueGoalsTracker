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
