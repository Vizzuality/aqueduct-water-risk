import React, { PureComponent, Fragment } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {
  Checkbox,
  Icon,
  InfoModal
} from 'aqueduct-components';

// components
import IndicatorList from 'components/baseline-tab/indicator-list';
import AdvancedIndicatorList from 'components/baseline-tab/advanced-indicator-list';
import CustomAdvancedIndicatorList from 'components/baseline-tab/custom-advanced-indicator-list';
import WeightSelector from 'components/baseline-tab/weight-selector';

// constants
import { PARENT_CHILDREN_LAYER_RELATION, INDICATORS_MODAL_DEFINITION } from 'constants/indicators';

class Indicators extends PureComponent {
  handleClickModal() {
    const { toggleModal } = this.props;

    toggleModal(true, {
      children: InfoModal,
      childrenProps: {
        info: INDICATORS_MODAL_DEFINITION
      }
    });
  }

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
          <div className="indicator-header">
            <span className="layerlist-title">Indicators</span>
            <button
              type="button"
              className="icon-container -info"
              onClick={() => { this.handleClickModal(); }}
            >
              <Icon
                name="icon-info"
                className="title-icon"
              />
            </button>
          </div>
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
    return (
      <div className="c-layerlist">
        {this.renderCurrent()}
      </div>
    );
  }
}

Indicators.propTypes = {
  advancedMode: PropTypes.bool.isRequired,
  currentIndicator: PropTypes.string.isRequired,
  timeScale: PropTypes.string.isRequired,
  ponderation: PropTypes.object.isRequired,
  setAdvancedMode: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
  setPonderation: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default Indicators;
