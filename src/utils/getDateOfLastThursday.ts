import {
  format,
  isFriday,
  isSunday,
  previousThursday,
  subDays,
} from 'date-fns';

export const getDateOfLastThursday = (): string => {
  const currentDate = new Date();
  const previousThursdayDate = previousThursday(
    isFriday(currentDate) ? subDays(currentDate, 1) : currentDate
  );

  return format(previousThursdayDate, 'yyyy-MM-dd');
};
