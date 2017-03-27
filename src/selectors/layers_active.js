import { createSelector } from 'reselect';
import { weightLayers, indicatorLayers } from 'constants/layerTypes';

// Get the datasets and filters from state
const datasets = state => state.datasets;
const mapView = state => state.mapView;

// Create a function to compare the current active datatasets and the current datasetsIds
function getActiveLayers(_datasets, _mapView) {
  if (!_datasets.list.length) return [];

  const currentLayer = _mapView.layers.active[0];
  let layerType;

  if (weightLayers.includes(currentLayer)) {
    layerType = 'weights';
  }
  if (indicatorLayers.includes(currentLayer)) {
    layerType = 'indicators';
  }

  const dataset = _datasets.list.find((d) => {
    const layerTypesVocabulary = d.vocabulary.find(voc => voc.attributes.name === 'layerTypes');
    return layerTypesVocabulary.attributes.tags.includes(layerType);
  });

  return [{ id: dataset.layer[0].id, ...dataset.layer[0].attributes }];
}

// Export the selector
export default createSelector(
  datasets,
  mapView,
  getActiveLayers
);
