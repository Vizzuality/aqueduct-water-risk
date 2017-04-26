import { createSelector } from 'reselect';
import startCase from 'lodash/startCase';
import upperFirst from 'lodash/upperFirst';
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
    // Weights dataset
    layerType = 'weights';
  }
  if (_mapView.ponderation.scheme === 'custom') {
    // Custom weights dataset
    layerType = 'custom-weights';
  }
  if (indicatorLayers.includes(currentLayer)) {
    // Indicators dataset
    layerType = 'indicators';
  }

  // Find dataset that matches with 'layerType' tag
  const dataset = _datasets.list.find((d) => {
    const layerTypesVocabulary = d.vocabulary.find(voc => voc.attributes.name === 'layerTypes');
    return layerTypesVocabulary.attributes.tags.includes(layerType);
  });

  // Return default selected dataset's default layer
  if (dataset) {
    const layer = dataset.layer.find(l => l.attributes.default);

    if (layer) {
      let attributes = layer.attributes;

      if (layerType === 'indicators') {
        attributes = {
          ...attributes,
          layerConfig: attributes.layerConfig[currentLayer],
          legendConfig: attributes.legendConfig[currentLayer]
        };
      }

      return [{
        id: layer.id,
        ...attributes,
        name: upperFirst(startCase(currentLayer))
      }];
    }
  }

  return [];
}

// Export the selector
export default createSelector(
  datasets,
  mapView,
  getActiveLayers
);
