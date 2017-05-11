import React from 'react';
import { SegmentedUi } from 'aqueduct-components';

export default class ImportFileModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tab: 'csv'
    };

    this.triggerChangeTab = this.triggerChangeTab.bind(this);
  }

  /**
   * UI EVENTS
   * - triggerChangeTab
  */
  triggerChangeTab(selected) {
    this.setState({
      tab: selected.value
    });
  }

  render() {
    return (
      <div className="c-import">
        <SegmentedUi
          className="-tabs-light"
          items={[{
            label: 'CSV',
            value: 'csv'
          }, {
            label: 'JSON',
            value: 'json'
          }, {
            label: 'Shape file',
            value: 'shape_file'
          }, {
            label: 'XLXS',
            value: 'xlxs'
          }]}
          selected={this.state.tab}
          onChange={this.triggerChangeTab}
        />
      </div>
    );
  }
}
