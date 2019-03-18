import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// constants
import { PRESET_OPTIONS, PRESET_VALUES } from 'constants/presets';
import { PARENT_CHILDREN_LAYER_RELATION } from 'constants/indicators';

// components
import PonderationChart from 'components/map-view-tab/ponderation-chart';
import PresetBreakdown from './preset-breakdown';

class WeightSelector extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { open: false };

    this._onToggleContainer = this.onToggleContainer.bind(this);
    this._onScreenClick = this.onScreenClick.bind(this);
  }

  componentDidUpdate() {
    const { open } = this.state;

    requestAnimationFrame(() => {
      if (open) {
        window.addEventListener('click', this._onScreenClick);
      } else {
        window.removeEventListener('click', this._onScreenClick);
      }
    });
  }

  onScreenClick(e) {
    const el = document.querySelector('.c-weight-selector');
    const clickOutside = el && el.contains && !el.contains(e.target);

    if (clickOutside) this.setState({ open: false });
  }

  onToggleContainer() {
    const { open } = this.state;

    this.setState({ open: !open });
  }

  handlePonderation(scheme) {
    const {
      currentIndicator,
      setPonderation,
      setFilters
    } = this.props;

    this.setState({ open: false }, () => {
      setPonderation({ scheme });
      setFilters({ ...PARENT_CHILDREN_LAYER_RELATION[currentIndicator] && { indicator: PARENT_CHILDREN_LAYER_RELATION[currentIndicator] } });
    });
  }

  render() {
    const { ponderationLabel } = this.props;
    const { open } = this.state;
    const weightChangeBtnClass = classnames(
      'weight-change-btn',
      { '-open': open }
    );

    return (
      <div className="c-weight-selector">
        <div className="header-selector">
          <div className="header-title-selector">
            <span className="weight-title">
              {ponderationLabel}
            </span>
            <button
              className={weightChangeBtnClass}
              onClick={this._onToggleContainer}
            >
              Change
            </button>
          </div>
          <div className="chart-container">
            <PonderationChart />
          </div>
        </div>
        {open && (
          <div className="collapsible-container">
            <div className="scrollable-container">
              <div className="preset-selector">
                {PRESET_OPTIONS.map(_preset => (
                  <button
                    className="preset-option"
                    key={_preset.value}
                    onClick={() => this.handlePonderation(_preset.value)}
                  >
                    <span className="preset-title">{_preset.label}</span>
                    {(_preset.value !== 'custom') && (
                      <div className="preset-breakdown">
                        <PresetBreakdown source={PRESET_VALUES[_preset.value]} />
                      </div>)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

WeightSelector.propTypes = {
  ponderationLabel: PropTypes.string.isRequired,
  currentIndicator: PropTypes.string.isRequired,
  setPonderation: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired
};


export default WeightSelector;
