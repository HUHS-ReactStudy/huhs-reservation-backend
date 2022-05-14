import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import addZero from './add-zero';

dayjs.extend(customParseFormat);

const validateDate = (year: number, month: number, day: number): boolean => {
  const date = `${year}-${addZero(month)}-${addZero(day)}`;
  return dayjs(date, 'YYYY-MM-DD', true).isValid();
};

export default validateDate;
