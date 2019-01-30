import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Sticky } from 'aqueduct-components';

// components
import StickyFilters from 'components/filters/StickyFilters';
import Filters from 'components/filters/Filters';
import LayerList from 'components/layers/LayerList';

class MapView extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { showStickyFilters: false };
  }

  componentDidMount() {
    this.setStickyFilterPosition();
  }

  componentDidUpdate() {
    this.setStickyFilterPosition();
  }

  onSticky(isSticky) {
    this.setState({ showStickyFilters: isSticky });
  }

  setStickyFilterPosition() {
    const stickyFilterTopPosition = this.filtersElem.getBoundingClientRect().height;

    if (this.state.stickyFilterTopPosition === stickyFilterTopPosition) return;

    this.setState({ stickyFilterTopPosition });
  }

  render() {
    return (
      <Fragment>
        <div className="l-filters" ref={(elem) => { this.filtersElem = elem; }}>
          <Filters
            filters={this.props.mapView.filters}
            setFilters={this.props.setFilters}
          />
        </div>
        {/* Sticky Filters */}
        <Sticky
          className="-full-width"
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
      </Fragment>
    );
  }
}

MapView.propTypes = {
  mapView: PropTypes.object,
  layers: PropTypes.array,
  scope: PropTypes.string,
  setFilters: PropTypes.func,
  setScope: PropTypes.func,
  onSelectLayer: PropTypes.func,
  setPonderation: PropTypes.func
};

export default MapView;
