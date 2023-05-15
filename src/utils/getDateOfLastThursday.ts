import { format, previousThursday } from 'date-fns';

export const getDateOfLastThursday = (): string => {
  const previousThursdayDate = previousThursday(new Date());

  return format(previousThursdayDate, 'yyyy-MM-dd');
};
