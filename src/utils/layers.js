import { formatDate } from 'utils/dates';
import { deburrUpper } from 'utils/data';
import moment from 'moment';

// utils
import { INDICATOR_SCHEME_ORDER } from 'constants/indicators';
import { LEGENDS } from 'components/map/constants';


const getAnnualParametrization = ({ indicator }) => ({
  indicator,
  label: indicator.replace('cat', 'label')
});

const getMonthlyParametrization = ({ indicator, month }) => ({
  indicator,
  month,
  label: indicator.replace('cat', 'label')
});

const getProjectedParametrization = ({ year, scenario }) => ({
  year,
  scenario
});

const getCustomPonderationParametrization = customPonderation => (
  { custom_weights: `'[${INDICATOR_SCHEME_ORDER.map(_key => customPonderation[_key])}]'` }
);

const getDefaultPonderationParametrization = ({ indicator }, customPonderation) => (
  {
    indicator: indicator.replace('def', customPonderation),
    label: indicator.replace('def', customPonderation).replace('cat', 'label'),
    fraction: indicator.replace('def', customPonderation).replace('cat', 'weight_fraction')
  }
);

export const getLayerParametrization = (parametrization, ponderation) => {
  const { year, timeScale } = parametrization;
  const {
    scheme: ponderationScheme,
    custom: customPonderation
  } = ponderation;
  let params = {};

  switch (true) {
    // future layers
    case (year !== 'baseline'):
      params = getProjectedParametrization(parametrization);
      break;
     // predefined ponderation
    case (ponderationScheme !== 'custom'):
      params = getDefaultPonderationParametrization(parametrization, ponderationScheme);
      break;
    // annual
    case (timeScale === 'annual' && year === 'baseline' && ponderationScheme !== 'custom'):
      params = getAnnualParametrization(parametrization);
      break;
    // monthly
    case (timeScale === 'monthly' && year === 'baseline'):
      params = getMonthlyParametrization(parametrization);
      break;
    // custom ponderation
    case (ponderationScheme === 'custom'):
      params = getCustomPonderationParametrization(customPonderation);
      break;
    default:
      return params;
  }

  return params;
};

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

export const getMarker = () => {};

export const getLayerLegend = (indicator) => {
  const isParent = [
    'w_awr_def_tot_cat',
    'w_awr_def_qan_cat',
    'w_awr_def_qal_cat',
    'w_awr_def_rrr_cat',
    'drr_cat'
  ].includes(indicator);
  let legend = LEGENDS.common;

  switch (true) {
    case !!LEGENDS[indicator]:
      legend = LEGENDS[indicator];
      break;
    case isParent:
      legend = LEGENDS.parent;
      break;
    default:
      legend = LEGENDS.common;
  }

  return legend;
};

export default {
  reduceParams,
  reduceSqlParams,
  getLayerParametrization,
  getMarker,
  getLayerLegend
};
