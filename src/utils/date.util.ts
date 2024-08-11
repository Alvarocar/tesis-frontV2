import moment from 'moment';

export const stringToDate = (data: string, format = 'DD-MM-YYYY') => moment(data, format).toDate();

export const dateToString = (data: moment.Moment, format = 'DD-MM-YYYY') => data.format(format) 