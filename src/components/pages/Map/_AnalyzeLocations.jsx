import React from 'react';
import PropTypes from 'prop-types';
import { dispatch } from 'main';
import { format } from 'd3-format';
import CustomTable from 'components/ui/Table/Table';
import BtnMenu from 'components/ui/BtnMenu';
import ImportFileModal from 'components/modal/ImportFileModal';
import CoordinatesModal from 'components/modal/CoordinatesModal';
import { layerOptions } from 'constants/analyzeLocations';
import { Sticky, Timeline, toggleModal } from 'aqueduct-components';
import StickyLocation from 'components/filters/StickyLocation';
import { PARENT_CHILDREN_LAYER_RELATION } from 'constants/indicators';
import isEqual from 'lodash/isEqual';

export default class AnalyzeLocations extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showStickyFilters: false
    };
  }

  /* lifecycle */
  componentDidMount() {
    const { scheme, geoStore, points } = this.props;
    this.setStickyFilterPosition();

    if (geoStore && scheme) {
      this.props.setAnalysis(scheme, geoStore);
    }

    if (!geoStore && points.length) {
      this.props.setPoints(points);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { scheme, geoStore, points } = nextProps;

    if (!geoStore && !isEqual(this.props.points, points)) {
      this.props.setPoints(points);
    }

    if (this.props.geoStore !== geoStore && scheme) {
      this.props.setAnalysis(scheme, geoStore);
    }
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
    const stickyFilterTopPosition = this.analyzeHeader.getBoundingClientRect().height;

    if (this.state.stickyFilterTopPosition === stickyFilterTopPosition) return;

    this.setState({
      stickyFilterTopPosition
    });
  }

  onChangeTimeline({ value }) {
    const { setFilters } = this.props;

    setFilters({ indicator: value });
  }

  getTimelineValue() {
    const selectedTimelineValue = PARENT_CHILDREN_LAYER_RELATION[this.props.layersActive[0]] || this.props.layersActive[0];

    return layerOptions.find(layer => layer.value === selectedTimelineValue);
  }

  formatData(data) {
    return data.map((d) => {
      const parseObject = {}
      Object.keys(d).forEach((key) => {
        parseObject[key] = isNaN(d[key]) ? d[key] : format('.2f')(d[key])
      });
      return parseObject;
    });
  }

  render() {
    const formattedData = this.formatData(this.props.data);
    return (
      <div>
        <div className="l-container analyze-locations-header" ref={(elem) => { this.analyzeHeader = elem; }}>
          <span className="label">Add location</span>
          {/* TODO: functionallity */}
          <BtnMenu
            className="-theme-white"
            items={[
              { label: 'Click map' },
              { label: 'Enter Address', cb: () => dispatch(toggleModal(true, { children: CoordinatesModal, size: '-auto' })) },
              { label: 'Import file', cb: () => dispatch(toggleModal(true, { children: ImportFileModal, size: '-auto' })) }
            ]}
          />
          {/* Sticky location */}
          <Sticky
            className="-full-width"
            topLimit={this.state.stickyFilterTopPosition}
            onStick={(isSticky) => { this.onSticky(isSticky); }}
            ScrollElem=".l-mapview-content"
          >
            {this.state.showStickyFilters &&
              <StickyLocation
                scope={this.props.scope}
                setScope={this.props.setScope}
                withScope
              />}
          </Sticky>
        </div>

        <div className="l-container">
          <Timeline
            className="-sand"
            items={layerOptions}
            selected={this.getTimelineValue()}
            onChange={this.onChangeTimeline}
          />
        </div>

        <div className="l-container -top">
          <CustomTable
            columns={this.props.columns}
            data={formattedData}
            loading={this.props.loading}
            pageSize={20}
            actions={{
              showable: false,
              editable: false,
              removable: false
            }}
            pagination={{
              enabled: true,
              pageSize: 20,
              page: 0
            }}
          />
        </div>
      </div>
    );
  }
}

AnalyzeLocations.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  geoStore: PropTypes.string,
  loading: PropTypes.bool,
  scope: PropTypes.string,
  points: PropTypes.array,
  scheme: PropTypes.string,
  setSelectedPoints: PropTypes.func,
  setScope: PropTypes.func,
  setPoints: PropTypes.func,
  onPointRemove: PropTypes.func,
  layersActive: PropTypes.array,
  setFilters: PropTypes.func.isRequired,
  setAnalysis: PropTypes.func
};
