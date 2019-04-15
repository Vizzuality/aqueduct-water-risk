import { createSelector } from 'reselect';

// constants
import { PRESET_OPTIONS } from 'constants/presets';

// states
const getPonderation = state => state.settings.ponderation.scheme;

export const getPonderationLabel = createSelector(
  [getPonderation],
  _ponderation =>
    ((PRESET_OPTIONS.find(_option => _ponderation === _option.value) || {}).label) || ''
);

export default { getPonderationLabel };
