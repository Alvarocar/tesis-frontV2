import { parse, isValid, format } from 'date-fns';

export const parseDate = (dateString?: string | null) => {
  if (dateString == null || dateString.trim().length === 0) return undefined;
  const parsedDate = parse(dateString, 'dd-MM-yyyy', new Date());
  return isValid(parsedDate) ? parsedDate : undefined;
};

export const formatDate = (date?: Date | null) => {
  if (date == null) return date;
  return format(date, 'dd-MM-yyyy');
}
