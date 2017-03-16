import React from 'react';
import CustomTable from 'components/ui/Table';
import BtnMenu from 'components/ui/BtnMenu';
import ImportFile from 'components/modal/importFile';

export default class AnalyseLocations extends React.Component {

  render() {
    return (
      <div>
        <div className="analyse-locations-header">
          <span className="label">Add location</span>
          {/* TODO: functionallity */}
          <BtnMenu
            className="-theme-white"
            items={[{ label: 'Click map' }, { label: 'Coordinates' }, { label: 'Import file', cb: () => this.props.toggleModal(true, { children: ImportFile }) }]}
          />
        </div>
        <CustomTable
          columns={this.props.columns}
          data={this.props.data}
          pageSize={20}
          filters
          onSelectedRows={rows => console.info(rows)}
        />
      </div>
    );
  }
}

AnalyseLocations.propTypes = {
  data: React.PropTypes.array,
  columns: React.PropTypes.array,
  toggleModal: React.PropTypes.func
};
