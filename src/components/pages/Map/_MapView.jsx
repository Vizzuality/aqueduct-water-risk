import React from 'react';
import { Sticky } from 'aqueduct-components';
import StickyFilters from 'components/filters/StickyFilters';
import Filters from 'components/filters/Filters';
import LayerList from 'components/layers/LayerList';

export default class MapView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showStickyFilters: false
    };
  }

  /* lifecycle */
  componentDidMount() {
    this.setStickyFilterPosition();
  }

  componentDidUpdate() {
    this.setStickyFilterPosition();
  }

  onSticky(isSticky) {
    this.setState({
      showStickyFilters: isSticky
    });
  }

  setStickyFilterPosition() {
    const stickyFilterTopPosition = this.filtersElem.getBoundingClientRect().height;

    if (this.state.stickyFilterTopPosition === stickyFilterTopPosition) return;

    this.setState({
      stickyFilterTopPosition
    });
  }

  render() {
    return (
      <div>
        <div className="l-filters" ref={(elem) => { this.filtersElem = elem; }}>
          <Filters
            filters={this.props.mapView.filters}
            setFilters={this.props.setFilters}
          />
        </div>
        {/* Sticky Filters */}
        <Sticky
          className="-filter"
          topLimit={this.state.stickyFilterTopPosition}
          onStick={(isSticky) => { this.onSticky(isSticky); }}
          ScrollElem=".l-mapview-content"
        >
          {this.state.showStickyFilters &&
            <StickyFilters
              filters={this.props.mapView.filters}
              scope={this.props.scope}
              setFilters={this.props.setFilters}
              setScope={this.props.setScope}
              withScope
            />}
        </Sticky>
        <LayerList
          activeLayers={this.props.mapView.layers.active}
          layers={this.props.layers}
          onSelectLayer={this.props.onSelectLayer}
          year={this.props.mapView.filters.year}
          ponderation={this.props.mapView.ponderation}
          scenario={this.props.mapView.filters.scenario}
          setFilters={this.props.setFilters}
          setPonderation={this.props.setPonderation}
        />
      </div>
    );
  }
}

MapView.propTypes = {
  // State
  mapView: React.PropTypes.object,
  layers: React.PropTypes.array,
  scope: React.PropTypes.string,
  // Actions
  setFilters: React.PropTypes.func,
  setScope: React.PropTypes.func,
  onSelectLayer: React.PropTypes.func,
  setPonderation: React.PropTypes.func
};
