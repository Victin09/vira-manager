import { capitalizeFirstLetter } from "./text";

export const getDateName = (locale: string): string => {
  const date = new Date();
  const day = date.getDay();
  const weekday = new Intl.DateTimeFormat(locale, { weekday: "long" }).format(
    date
  );
  const month = new Intl.DateTimeFormat(locale, { month: "long" }).format(date);
  return `${capitalizeFirstLetter(weekday)}, ${day} de ${capitalizeFirstLetter(
    month
  )}`;
};

export const formatToDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `${("0" + date.getDate()).slice(-2)}-${("0" + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
};
