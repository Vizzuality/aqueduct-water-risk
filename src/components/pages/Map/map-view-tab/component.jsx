import React, { PureComponent, Fragment } from 'react';
import { Sticky } from 'aqueduct-components';

// components
import Filters from 'components/map-view-tab/filters';
import StickyFilters from 'components/map-view-tab/sticky-filters';
import Indicators from 'components/pages/map/map-view/indicators';

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
    const {
      showStickyFilters,
      stickyFilterTopPosition
    } = this.state;

    return (
      <Fragment>
        <div
          className="l-filters"
          ref={(elem) => { this.filtersElem = elem; }}
        >
          <Filters />
        </div>
        {/* Sticky Filters */}
        <Sticky
          className="-full-width"
          topLimit={stickyFilterTopPosition}
          onStick={(isSticky) => { this.onSticky(isSticky); }}
          ScrollElem=".l-mapview-content"
        >
          {showStickyFilters &&
            <StickyFilters withScope />}
        </Sticky>
        <Indicators />
      </Fragment>
    );
  }
}

export default MapView;
