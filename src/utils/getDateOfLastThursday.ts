export const getDateOfLastThursday = (): string => {
  const currentDate = new Date();
  const msInOneDay = 86400000;
  const lastThursday = new Date(
    Date.now() - msInOneDay * (3 + currentDate.getUTCDay())
  );
  const date = [
    lastThursday.getUTCFullYear(),
    lastThursday.getUTCMonth() + 1,
    lastThursday.getUTCDate(),
  ];
  return date.map((el) => String(el).padStart(2, '0')).join('-');
};
