import React from 'react';
import PropTypes from 'prop-types';
import { CustomSelect, SegmentedUi } from 'aqueduct-components';
import { SCOPE_OPTIONS } from 'constants/mapView';
import { timeScaleOptions, spaceScaleOptions } from 'constants/filters';

class StickyFilters extends React.Component {

  updateFilters(value, field) {
    const newFilter = {
      [field]: value
    };

    this.props.setFilters(newFilter);
  }

  render() {
    return (
      <div className="c-sticky-filters">
        {this.props.withScope &&
          <div className="filters-lead">
            <div className="row expanded collapse">
              <div className="small-12 column">
                <SegmentedUi
                  className="-tabs"
                  items={SCOPE_OPTIONS}
                  selected={this.props.scope}
                  onChange={selected => this.props.setScope(selected.value, 'scope')}
                />
              </div>
            </div>
          </div>
        }
        <div className="global-filters">
          <div>
            <span className="title">Time Scale</span>
            <CustomSelect
              className="-gray"
              options={timeScaleOptions}
              value={this.props.filters.timeScale}
              onValueChange={selected => selected && this.updateFilters(selected.value, 'timeScale')}
            />
          </div>
          <div>
            <span className="title">Geographic Scale</span>
            <CustomSelect
              className="-gray"
              options={spaceScaleOptions}
              value={this.props.filters.geoScale}
              onValueChange={selected => selected && this.updateFilters(selected.value, 'geoScale')}
            />
          </div>
        </div>
      </div>
    );
  }
}

StickyFilters.propTypes = {
  filters: PropTypes.object,
  scope: PropTypes.string,
  withScope: PropTypes.bool,
  setFilters: PropTypes.func,
  setScope: PropTypes.func
};

export default StickyFilters;
