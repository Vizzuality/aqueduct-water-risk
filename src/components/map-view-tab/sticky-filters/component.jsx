import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CustomSelect, SegmentedUi } from 'aqueduct-components';

// constants
import { SCOPE_OPTIONS } from 'constants/mapView';
import { timeScaleOptions } from 'constants/filters';

class StickyFilters extends PureComponent {
  render() {
    const {
      scope,
      withScope,
      filters: { timeScale },
      setFilters,
      setScope
    } = this.props;
    return (
      <div className="c-sticky-filters">
        {withScope &&
          <div className="filters-lead">
            <div className="row expanded collapse">
              <div className="small-12 column">
                <SegmentedUi
                  className="-tabs"
                  items={SCOPE_OPTIONS}
                  selected={scope}
                  onChange={(selected) => { setScope(selected.value); }}
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
              value={timeScale}
              onValueChange={(selected) => { selected && setFilters({ timeScale: selected.value }); }}
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

StickyFilters.defaultProps = { withScope: false };

export default StickyFilters;
