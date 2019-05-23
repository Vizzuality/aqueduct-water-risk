// constants
import { PRESET_VALUES } from 'constants/presets';


export default {
  filters: {
    year: 'baseline',
    month: '1',
    changeFromBaseline: false,
    indicator: 'w_awr_def_tot_cat',
    scenario: 'optimistic',
    timeScale: 'annual',
    projection: 'absolute'
  },
  ponderation: {
    scheme: 'DEF',
    custom: PRESET_VALUES.custom
  },
  analyzer: { open: false }
};
