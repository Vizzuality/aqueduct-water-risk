import React from 'react';
import { dispatch } from 'main';
import CustomTable from 'components/ui/Table/Table';
import BtnMenu from 'components/ui/BtnMenu';
import ImportFile from 'components/modal/importFile';
import { layerOptions } from 'constants/analyzeLocations';
import { Sticky, Timeline, toggleModal } from 'aqueduct-components';
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
            items={[{ label: 'Click map' }, { label: 'Coordinates' }, { label: 'Import file', cb: () => dispatch(toggleModal(true, { children: ImportFile })) }]}
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
          <CustomTable
            columns={this.props.columns}
            data={this.props.data}
            pageSize={20}
            actions={{
              showable: false,
              editable: false,
              removable: true
            }}
            pagination={{
              enabled: true,
              pageSize: 20,
              page: 0
            }}
            onToggleSelectedRow={(ids) => {
              this.props.setSelectedPoints(ids);
            }}
            onRowDelete={(id) => {
              this.props.onPointRemove(id);
            }}
          />
        </div>
      </div>
    );
  }
}

AnalyzeLocations.propTypes = {
  // STATE
  data: React.PropTypes.array,
  columns: React.PropTypes.array,
  scope: React.PropTypes.string,
  // FUNCTIONS
  setSelectedPoints: React.PropTypes.func,
  setScope: React.PropTypes.func,
  onPointRemove: React.PropTypes.func,
  layersActive: React.PropTypes.array,
  setActiveLayers: React.PropTypes.func
};
