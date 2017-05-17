import React from 'react';
import PropTypes from 'prop-types';
import { dispatch } from 'main';
import CustomTable from 'components/ui/Table/Table';
import BtnMenu from 'components/ui/BtnMenu';
import ImportFileModal from 'components/modal/ImportFileModal';
import { layerOptions } from 'constants/analyzeLocations';
import { Sticky, Spinner, Timeline, toggleModal } from 'aqueduct-components';
import StickyLocation from 'components/filters/StickyLocation';

export default class AnalyzeLocations extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showStickyFilters: false
    };
  }

  /* lifecycle */
  componentDidMount() {
    this.setStickyFilterPosition();

    if (this.props.scheme && this.props.points.length) {
      const { scheme, points } = this.props;
      this.props.setAnalysis(scheme, points);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.scheme &&
      this.props.points.length !== nextProps.points.length && nextProps.points.length) {
      const { scheme, points } = nextProps;
      this.props.setAnalysis(scheme, points);
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

  render() {
    return (
      <div>
        <div className="l-container analyze-locations-header" ref={(elem) => { this.analyzeHeader = elem; }}>
          <span className="label">Add location</span>
          {/* TODO: functionallity */}
          <BtnMenu
            className="-theme-white"
            items={[{ label: 'Click map' }, { label: 'Coordinates' }, { label: 'Import file', cb: () => dispatch(toggleModal(true, { children: ImportFileModal })) }]}
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
            selected={layerOptions.find(l => l.value === this.props.layersActive[0])}
            onChange={selected => this.props.setActiveLayers([selected.value])}
          />
        </div>

        <div className="l-container -top">
          <Spinner isLoading={this.props.loading} />
          <CustomTable
            columns={this.props.columns}
            data={this.props.data}
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
  // STATE
  data: PropTypes.array,
  columns: PropTypes.array,
  loading: PropTypes.bool,
  scope: PropTypes.string,
  points: PropTypes.array,
  scheme: PropTypes.string,
  // FUNCTIONS
  setSelectedPoints: PropTypes.func,
  setScope: PropTypes.func,
  onPointRemove: PropTypes.func,
  layersActive: PropTypes.array,
  setActiveLayers: PropTypes.func,
  setAnalysis: PropTypes.func
};
