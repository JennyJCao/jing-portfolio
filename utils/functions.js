import moment from 'moment';

export const formatDate = date => moment.unix(date / 1000).format('DD/MM/YYYY');

export const fromNow = data => moment.unix(data / 1000).fromNow();

export const shortify = (text, maxLength = 100) => {
  if (!text) { return '';}
  if (text.length <= maxLength) {return text;}
  return text.substr(0, maxLength) + '...';
}