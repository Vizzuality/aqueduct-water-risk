// constants
import { PRESET_VALUES } from 'constants/presets';


const defaultFilters = {
  year: 'baseline',
  month: '1',
  changeFromBaseline: false,
  indicator: 'w_awr_def_tot_cat',
  scenario: 'optimistic',
  timeScale: 'annual',
  projection: 'absolute',
  predefined: false
};

export default {
  filters: defaultFilters,
  tabStates: {
    action: defaultFilters,
    baseline: defaultFilters,
    future: defaultFilters
  },
  ponderation: {
    scheme: 'DEF',
    custom: PRESET_VALUES.custom
  },
  analyzer: { open: false }
};
