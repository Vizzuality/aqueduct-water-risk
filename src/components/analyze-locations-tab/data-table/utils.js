// utils
import { substitution } from 'layer-manager/dist/layer-manager';

// constants
import { SCENARIO_OPTIONS } from 'constants/app';
import {
  INDICATOR_COLUMNS,
  FUTURE_INDICATORS
} from 'constants/indicators';

export const getProjectChangeColumn = (filters) => {
  const { projection, indicator, scenario, year } = filters;
  const parsedFilters = {
    indicator: (FUTURE_INDICATORS[projection].find(_indicator => _indicator.id === indicator) || {}).name || '-',
    scenario: SCENARIO_OPTIONS.find(_scenario => _scenario.value === scenario).label,
    year,
    projection: projection === 'absolute' ? 'Value In Year' : 'Change From Baseline'
  };

  return INDICATOR_COLUMNS.projected_change.map(({ label, value }) => ({
    label: substitution(label, parsedFilters),
    value
  }));
};


export default { getProjectChangeColumn };
