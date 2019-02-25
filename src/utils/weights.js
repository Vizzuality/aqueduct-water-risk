import { INDICATOR_SCHEME_ORDER } from 'constants/indicators';
import { PRESET_VALUES } from 'constants/presets';

function parseWeights(ponderation) {
  const { scheme, custom } = ponderation;
  const source = scheme === 'custom' ? custom : PRESET_VALUES[scheme];

  return INDICATOR_SCHEME_ORDER.map(weightOrder => source[weightOrder]);
}

export { parseWeights };
