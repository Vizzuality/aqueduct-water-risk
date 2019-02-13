import { formatDate } from 'utils/dates';
import { deburrUpper } from 'utils/data';
import moment from 'moment';

// utils
import { INDICATOR_SCHEME_ORDER } from 'constants/indicators';


export const getAnnualParametrization = ({ indicator }) => ({ indicator });
export const getMonthlyParametrization = ({ indicator, month }) => ({
  indicator,
  month
});
export const getProjectedParametrization = ({ year, scenario }) => ({
  year,
  scenario
});
export const getCustomPonderationParametrization = customPonderation => (
  { custom_weights: INDICATOR_SCHEME_ORDER.map(_key => customPonderation[_key]) }
);

export const reduceParams = (params) => {
  if (!params) return null;
  return params.reduce((obj, param) => {
    const { format, key, interval, count } = param;
    let paramValue = param.default;
    const isDate = deburrUpper(param.key).includes('DATE');
    if (isDate && !paramValue) {
      let date = formatDate(new Date());
      if (interval && count) date = moment(date).subtract(count, interval);
      paramValue = moment(date).format(format || 'YYYY-MM-DD');
    }

    const newObj = {
      ...obj,
      [key]: paramValue,
      ...(key === 'endDate' &&
        param.url && { latestUrl: param.url })
    };
    return newObj;
  }, {});
};

export const reduceSqlParams = (params) => {
  if (!params) return null;
  return params.reduce((obj, param) => {
    const newObj = {
      ...obj,
      [param.key]: param.key_params.reduce((subObj, item) => {
        const keyValues = {
          ...subObj,
          [item.key]: item.value
        };
        return keyValues;
      }, {})
    };
    return newObj;
  }, {});
};

export default {
  reduceParams,
  reduceSqlParams,
  getAnnualParametrization,
  getMonthlyParametrization,
  getProjectedParametrization,
  getCustomPonderationParametrization
};
