import { createSelector } from 'reselect';

// constants
import { MAP_OPTIONS } from './constants';

const getMap = state => state.map;

export const parseMapState = createSelector(
  [getMap],
  ({ zoom, center }) => ({
    zoom,
    center,
    ...MAP_OPTIONS
  })
);

export default { parseMapState };
