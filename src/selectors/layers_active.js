import { createSelector } from 'reselect';

// Get the datasets and filters from state
const datasets = state => state.datasets;

// Create a function to compare the current active datatasets and the current datasetsIds
function getActiveLayers(_datasets) {
  const dataset = _datasets.list.find(d => d.layer.length && d.layer[0].attributes.provider === 'cartodb');
  return dataset ? [dataset.layer[0].attributes] : [];
        // .filter(d => d.layer.length && d.layer[0].attributes.provider === 'cartodb')
        // .map(d => d.layer[0].attributes);
}

// Export the selector
export default createSelector(
  datasets,
  getActiveLayers
);
