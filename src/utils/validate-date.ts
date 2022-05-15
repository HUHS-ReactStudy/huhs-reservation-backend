import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import addZero from './add-zero';

dayjs.extend(customParseFormat);

const validateReservationDateTime = (year: number, month: number, day: number, startTime: string, endTime: string): boolean => {
  const startDatetime = `${year}-${addZero(month)}-${addZero(day)} ${startTime}`;
  const endDatetime = `${year}-${addZero(month)}-${addZero(day)} ${endTime}`;
  return (
    dayjs(startDatetime, 'YYYY-MM-DD HH:mm', true).isValid() &&
    dayjs(endDatetime, 'YYYY-MM-DD HH:mm', true).isValid() &&
    startTime < endTime
  );
};

export default validateReservationDateTime;
