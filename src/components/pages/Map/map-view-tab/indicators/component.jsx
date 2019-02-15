import React, { PureComponent, Fragment } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Checkbox } from 'aqueduct-components';

// components
import IndicatorList from 'components/map-view-tab/indicator-list';
import AdvancedIndicatorList from 'components/map-view-tab/advanced-indicator-list';
import CustomAdvancedIndicatorList from 'components/map-view-tab/custom-advanced-indicator-list';
import Future from 'components/map-view-tab/future';
import Presets from 'components/map-view-tab/presets';
import PonderationChart from 'components/map-view-tab/ponderation-chart';

class Indicators extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { advanced: false };
  }

  renderIndicatorList() {
    const { advanced } = this.state;
    const {
      ponderation: { scheme },
      timeScale
    } = this.props;

    if (advanced && scheme === 'custom' && timeScale !== 'monthly') return (<CustomAdvancedIndicatorList />);

    if (advanced && timeScale !== 'monthly') return (<AdvancedIndicatorList />);

    return (<IndicatorList />);
  }

  renderCurrent() {
    const { timeScale } = this.props;
    const { advanced } = this.state;
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
                onChange={({ checked }) => { this.setState({ advanced: checked }); }}
              />
            </span>)}
        </div>
        {(advanced && timeScale !== 'monthly') &&
          (<Fragment>
            <Presets />
            <PonderationChart />
          </Fragment>)
        }
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
  year: PropTypes.string.isRequired,
  timeScale: PropTypes.string.isRequired,
  ponderation: PropTypes.object.isRequired
};

export default Indicators;
