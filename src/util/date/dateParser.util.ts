import { parse, isValid, format } from 'date-fns';

export const parseDate = (dateString?: string | null) => {
  if (dateString == null || dateString.trim().length === 0) return undefined;
  const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
  return isValid(parsedDate) ? parsedDate : undefined;
};

export const formatDate = (date?: Date | null) => {
  if (date == null) return undefined;
  return format(date, 'yyyy-MM-dd');
}
