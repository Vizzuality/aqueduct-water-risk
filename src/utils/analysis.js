
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
    // ..._data,
    location_name: _data.location_name || '-',
    input_address: _data.input_address || '-',
    match_address: _data.match_address || '-',
    latitude: _data.latitude ? _data.latitude.toFixed(2) : '-',
    longitude: _data.longitude ? _data.longitude.toFixed(2) : '-',
    name_0: _data.name_0 || '-',
    name_1: _data.name_1 || '-',
    major_basin_name: _data.major_basin_name || '-',
    minor_basin_name: _data.minor_basin_name || '-',
    aquifer_name: _data.aquifer_name || '-',
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
