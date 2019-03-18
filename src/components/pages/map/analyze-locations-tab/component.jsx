import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// components
import { Sticky, Timeline } from 'aqueduct-components';
import BtnMenu from 'components/ui/BtnMenu';
import ImportFileModal from 'components/modal/import-file';
import MonthlyIndicators from 'components/analyze-locations-tab/monthly-indicators';
import StickyLocation from 'components/analyze-locations-tab/sticky-location';
import DataTable from 'components/analyze-locations-tab/data-table';
import CoordinatesModal from 'components/modal/coordinates';

// constants
import {
  FUTURE_INDICATORS_IDS,
  DEFAULT_FUTURE_YEAR
} from 'constants/indicators';

class AnalyzeLocations extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { showStickyFilters: false };
  }

  componentDidMount() {
    // const {
    //   scheme,
    //   geoStore,
    //   points,
    //   setAnalysis,
    //   setPoints,
    //   onSaveGeostore
    // } = this.props;

    this.setStickyFilterPosition();

    // if (geoStore && scheme) setAnalysis(scheme, geoStore);
    // if (!geoStore && points.length) {
    //   setPoints(points);
    //   onSaveGeostore();
    // }
  }

  // componentWillReceiveProps(nextProps) {
  //   const { scheme, geoStore, points } = nextProps;

  //   if (!geoStore && !isEqual(this.props.points, points)) {
  //     this.props.setPoints(points);
  //   }

  //   if (this.props.geoStore !== geoStore && scheme) {
  //     this.props.setAnalysis(scheme, geoStore);
  //   }
  // }

  componentDidUpdate() {
    this.setStickyFilterPosition();
  }

  onSticky(isSticky) { this.setState({ showStickyFilters: isSticky }); }

  onChangeTimeline({ value }) {
    const { setFilters } = this.props;

    setFilters({
      indicator: value,
      year: FUTURE_INDICATORS_IDS.includes(value) ? DEFAULT_FUTURE_YEAR : 'baseline'
    });
  }

  setStickyFilterPosition() {
    const stickyFilterTopPosition = this.analyzeHeader.getBoundingClientRect().height;

    if (this.state.stickyFilterTopPosition === stickyFilterTopPosition) return;

    this.setState({ stickyFilterTopPosition });
  }

  toggleModal(children) {
    const { toggleModal } = this.props;

    toggleModal(true, {
      children,
      size: '-auto'
    });
  }

  render() {
    const {
      stickyFilterTopPosition,
      showStickyFilters
    } = this.state;
    const {
      timelineOptions,
      points,
      timeScale,
      onApplyAnalysis,
      clearAnalysis
    } = this.props;
    const applyButtonClass = classnames(
      'c-btn -primary -light',
      { '-disabled': !points.length }
    );

    const clearButtonClass = classnames(
      'c-btn -primary -light',
      { '-disabled': !points.length }
    );

    return (
      <div className="l-analyze-locations">
        <div
          className="l-container analyze-locations-header"
          ref={(elem) => { this.analyzeHeader = elem; }}
        >
          <span className="label">Add location</span>
          <BtnMenu
            className="-theme-white"
            items={[
              { label: 'Click map' },
              { label: 'Enter Address', cb: () => this.toggleModal(CoordinatesModal) },
              { label: 'Import file', cb: () => this.toggleModal(ImportFileModal) }
            ]}
          />
          {/* Sticky location */}
          <Sticky
            className="-full-width"
            topLimit={stickyFilterTopPosition}
            onStick={(isSticky) => { this.onSticky(isSticky); }}
            ScrollElem=".l-mapview-content"
          >
            {showStickyFilters && (<StickyLocation />)}
          </Sticky>
        </div>

        <div className="l-container">
          {timeScale !== 'monthly' && (
            <Timeline
              className="-sand"
              items={timelineOptions}
              selected={timelineOptions.find(opt => opt.selected)}
              onChange={(option) => { this.onChangeTimeline(option); }}
            />)}
          {timeScale === 'monthly' && (<MonthlyIndicators />)}
        </div>

        <div className="l-container -top">
          <DataTable />
          <div className="apply-analysis-container">
            <button
              type="button"
              className={applyButtonClass}
              onClick={onApplyAnalysis}
              {...!points.length && { disabled: true }}
            >
              Apply analysis
            </button>

            <button
              type="button"
              className={clearButtonClass}
              onClick={() => { clearAnalysis(); }}
              {...!points.length && { disabled: true }}
            >
              Clear analysis
            </button>
          </div>
        </div>
      </div>
    );
  }
}

AnalyzeLocations.propTypes = {
  timelineOptions: PropTypes.array.isRequired,
  // geoStore: PropTypes.string,
  timeScale: PropTypes.string.isRequired,
  points: PropTypes.array.isRequired,
  // scheme: PropTypes.string.isRequired,
  // setPoints: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
  // setAnalysis: PropTypes.func.isRequired,
  // onSaveGeostore: PropTypes.func.isRequired,
  onApplyAnalysis: PropTypes.func.isRequired,
  clearAnalysis: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default AnalyzeLocations;
