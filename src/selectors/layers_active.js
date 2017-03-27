import { createSelector } from 'reselect';

// Get the datasets and filters from state
const datasets = state => state.datasets;

// Create a function to compare the current active datatasets and the current datasetsIds
function getActiveLayers(_datasets) {
  const layersActive = _datasets.list.length ? [{ id: _datasets.list[0].layer[0].id, ..._datasets.list[0].layer[0].attributes }] : [];
  return layersActive;
}

// Export the selector
export default createSelector(
  datasets,
  getActiveLayers
);
