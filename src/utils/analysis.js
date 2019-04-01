
import { TABLE_INDICATOR_VALUES } from 'constants/analysis';
import { INDICATOR_COLUMNS } from 'constants/indicators';

export const getAnalysisType = (timeScale, scheme, year) => {
  if (scheme === 'custom') return scheme;

  if (year !== 'baseline') return 'projected';

  return timeScale;
};

export const filterData = (data = [], indicator) => {
  const _indicator = TABLE_INDICATOR_VALUES[indicator];

  const isParent = INDICATOR_COLUMNS[indicator];

  if (!_indicator) return [];

  return data.map(_data => ({
    country: _data.country || '-',
    province: _data.province || '-',
    major_basin: _data.major_basin || '-',
    minor_basin: _data.minor_basin || '-',
    major_aquifer_system: _data.major_aquifer_system || '-',
    ...!isParent && { [_indicator]: _data[_indicator] || '-' },
    ...isParent && INDICATOR_COLUMNS[indicator].reduce((acc, { value }) =>
      ({
        ...acc,
        [value]: _data[value] || '-'
      }), {})
  }));
};

export default {
  getAnalysisType,
  filterData
};
