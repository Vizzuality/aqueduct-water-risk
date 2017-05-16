import { WEIGHT_SCHEME_ORDER, ponderationValues } from 'constants/ponderationPresetsValues';
import { store } from 'main';

function parseWeights(weightScheme) {
  const schemeValues = weightScheme === 'custom' ?
    store.getState().mapView.ponderation.custom : ponderationValues[weightScheme];

  return WEIGHT_SCHEME_ORDER.map(weightOrder => schemeValues[weightOrder]);
}

export { parseWeights };
