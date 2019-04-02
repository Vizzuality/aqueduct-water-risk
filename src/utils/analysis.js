
import { TABLE_INDICATOR_VALUES } from 'constants/analysis';
import { INDICATOR_COLUMNS, PARENT_CHILDREN_LAYER_RELATION } from 'constants/indicators';

export const getAnalysisType = (timeScale, scheme, year) => {
  if (scheme === 'custom') return scheme;

  if (year !== 'baseline') return 'projected';

  return timeScale;
};

export const filterData = (data = [], indicator, ponderationScheme) => {
  const _indicator = TABLE_INDICATOR_VALUES[indicator] || PARENT_CHILDREN_LAYER_RELATION[indicator];
  const isCustomPonderation = ponderationScheme === 'custom';
  const children = INDICATOR_COLUMNS[indicator] || INDICATOR_COLUMNS[PARENT_CHILDREN_LAYER_RELATION[indicator]];

  return data.map(_data => ({
    country: _data.country || '-',
    province: _data.province || '-',
    major_basin: _data.major_basin || '-',
    minor_basin: _data.minor_basin || '-',
    major_aquifer_system: _data.major_aquifer_system || '-',
    ...{ [_indicator]: _data[_indicator] || '-' },
    ...children && children.reduce((acc, { value }) =>
      ({
        ...acc,
        ...!isCustomPonderation && { [value]: _data[value] || '-' },
        ...isCustomPonderation && { label: _data[value] || '-' }
      }), {})
  }));
};

export default {
  getAnalysisType,
  filterData
};
