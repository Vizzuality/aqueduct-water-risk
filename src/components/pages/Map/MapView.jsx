import React from 'react';
import Filters from 'components/filters/Filters';
import LayerList from 'components/layers/LayerList';

export default function MapView(props) {
  return (
    <div>
      <Filters
        filters={props.mapView.filters}
        setFilters={props.setFilters}
      />
      <LayerList
        activeLayers={props.mapView.layers.active}
        layers={props.layers}
        onSelectLayer={props.onSelectLayer}
        year={props.mapView.filters.year}
        ponderation={props.mapView.ponderation.scheme}
        scenario={props.mapView.filters.scenario}
        setFilters={props.setFilters}
        setPonderation={props.setPonderation}
      />
    </div>
  );
}

MapView.propTypes = {
  // State
  mapView: React.PropTypes.object,
  layers: React.PropTypes.array,
  // Actions
  setFilters: React.PropTypes.func,
  onSelectLayer: React.PropTypes.func,
  setPonderation: React.PropTypes.func
};
