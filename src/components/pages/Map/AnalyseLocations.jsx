import React from 'react';
import CustomTable from 'components/ui/Table';
import BtnMenu from 'components/ui/BtnMenu';

export default class AnalyseLocations extends React.Component {

  render() {
    return (
      <div>
        <div className="analyse-locations-header">
          <span className="label">Add location</span>
          {/* TODO: functionallity */}
          <BtnMenu
            className="-theme-white"
            items={[{ label: 'Click map' }, { label: 'Coordinates' }, { label: 'Import file' }]}
          />
        </div>
        <CustomTable
          columns={this.props.columns}
          data={this.props.data}
          pageSize={20}
          filters
        />
      </div>
    );
  }
}

AnalyseLocations.propTypes = {
  data: React.PropTypes.array,
  columns: React.PropTypes.array
};
