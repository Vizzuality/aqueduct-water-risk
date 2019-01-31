import { INDICATOR_SCHEME_ORDER } from 'constants/indicators';
import { PRESET_VALUES } from 'constants/presets';
import { store } from 'main';

function parseWeights(weightScheme) {
  const schemeValues = weightScheme === 'custom' ?
    store.getState().mapView.ponderation.custom : PRESET_VALUES[weightScheme];

  return INDICATOR_SCHEME_ORDER.map(weightOrder => schemeValues[weightOrder]);
}

export { parseWeights };
