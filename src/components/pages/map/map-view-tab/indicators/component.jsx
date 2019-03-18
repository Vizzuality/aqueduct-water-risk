import React, { PureComponent, Fragment } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Checkbox } from 'aqueduct-components';

// components
import IndicatorList from 'components/map-view-tab/indicator-list';
import AdvancedIndicatorList from 'components/map-view-tab/advanced-indicator-list';
import CustomAdvancedIndicatorList from 'components/map-view-tab/custom-advanced-indicator-list';
import Future from 'components/map-view-tab/future';
import WeightSelector from 'components/map-view-tab/weight-selector';

// constants
import { PARENT_CHILDREN_LAYER_RELATION } from 'constants/indicators';

class Indicators extends PureComponent {
  handleAdvancedMode(advanced) {
    const {
      currentIndicator,
      setAdvancedMode,
      setPonderation,
      setFilters
    } = this.props;

    setAdvancedMode(advanced);

    setPonderation({ ...!advanced && { scheme: 'DEF' } });

    setFilters({ ...PARENT_CHILDREN_LAYER_RELATION[currentIndicator] && { indicator: PARENT_CHILDREN_LAYER_RELATION[currentIndicator] } });
  }

  renderIndicatorList() {
    const { advancedMode } = this.props;
    const {
      ponderation: { scheme },
      timeScale
    } = this.props;

    if (advancedMode && scheme === 'custom' && timeScale !== 'monthly') return (<CustomAdvancedIndicatorList />);

    if (advancedMode && timeScale !== 'monthly') return (<AdvancedIndicatorList />);

    return (<IndicatorList />);
  }

  renderCurrent() {
    const { timeScale, advancedMode } = this.props;
    const checkboxClass = classnames(
      '-reverse',
      { '-disabled': timeScale !== 'annual' }
    );

    return (
      <Fragment>
        <div className="layerlist-header">
          <span className="layerlist-title">Indicators</span>
          {timeScale === 'annual' && (
            <span className="advanced">
              <Checkbox
                className={checkboxClass}
                label="Change Indicators and Weightings"
                name="advanced"
                value="advanced"
                defaultChecked={advancedMode}
                onChange={({ checked }) => { this.handleAdvancedMode(checked); }}
              />
            </span>)}
        </div>
        {(advancedMode && timeScale !== 'monthly') && (<WeightSelector />)}
        {this.renderIndicatorList()}
      </Fragment>
    );
  }

  render() {
    const { year } = this.props;
    return (
      <div className="c-layerlist">
        {year === 'baseline' ? this.renderCurrent() : (<Future />)}
      </div>
    );
  }
}

Indicators.propTypes = {
  advancedMode: PropTypes.bool.isRequired,
  currentIndicator: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  timeScale: PropTypes.string.isRequired,
  ponderation: PropTypes.object.isRequired,
  setAdvancedMode: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
  setPonderation: PropTypes.func.isRequired
};

export default Indicators;
