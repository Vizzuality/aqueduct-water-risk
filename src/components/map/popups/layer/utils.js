import moment from 'moment';
import numeral from 'numeral';

export const removeHtmlTags = (str) => {
  if (!str || !str.toString) return str;
  return str.toString().replace(/<\/?[a-z]+>/gi, '');
};

export const formatValue = (item, data) => {
  if (item.type === 'date' && item.format && data) {
    data = moment(data).format(item.format);
  } else if (item.type === 'number' && item.format && data) {
    data = numeral(data).format(item.format);
  }

  return `${item.prefix || ''}${removeHtmlTags(data) || '-'}${item.suffix || ''}`;
};

export default {
  formatValue,
  removeHtmlTags
};
