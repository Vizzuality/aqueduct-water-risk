import { INDICATOR_SCHEME_ORDER } from 'constants/indicators';
import { ponderationValues } from 'constants/ponderationPresetsValues';
import { store } from 'main';

function parseWeights(weightScheme) {
  const schemeValues = weightScheme === 'custom' ?
    store.getState().mapView.ponderation.custom : ponderationValues[weightScheme];

  return INDICATOR_SCHEME_ORDER.map(weightOrder => schemeValues[weightOrder]);
}

export { parseWeights };
