import React from 'react';
import { dispatch } from 'main';
import CustomTable from 'components/ui/Table/Table';
import BtnMenu from 'components/ui/BtnMenu';
import ImportFile from 'components/modal/importFile';
import { layerOptions } from 'constants/analyseLocations';
import { Timeline, toggleModal } from 'aqueduct-components';

export default class AnalyseLocations extends React.Component {

  render() {
    return (
      <div>
        <div className="l-container analyse-locations-header">
          <span className="label">Add location</span>
          {/* TODO: functionallity */}
          <BtnMenu
            className="-theme-white"
            items={[{ label: 'Click map' }, { label: 'Coordinates' }, { label: 'Import file', cb: () => dispatch(toggleModal(true, { children: ImportFile })) }]}
          />
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

AnalyseLocations.propTypes = {
  // STATE
  data: React.PropTypes.array,
  columns: React.PropTypes.array,
  // FUNCTIONS
  setSelectedPoints: React.PropTypes.func,
  onPointRemove: React.PropTypes.func,
  layersActive: React.PropTypes.array,
  setActiveLayers: React.PropTypes.func
};
