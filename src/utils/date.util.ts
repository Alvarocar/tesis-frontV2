import dayjs from 'dayjs';
import moment from 'moment';

export const stringToDate = (data: string, format = 'DD-MM-YYYY') => moment(data, format).toDate();

export const dateToString = (data: moment.Moment | dayjs.Dayjs | string, format = 'DD-MM-YYYY') => {
  if (typeof data === 'string') return data
  if (moment.isMoment(data)) return data.format(format)
  return data.format(format)
} 