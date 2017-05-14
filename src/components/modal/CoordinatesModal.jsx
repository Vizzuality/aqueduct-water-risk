import React from 'react';
import { SegmentedUi } from 'aqueduct-components';
import CoordinatesForm from 'components/search/CoordinatesForm';

const TAB_OPTIONS = [
  { value: 'coordinates', label: 'Coordinates' },
  { value: 'address', label: 'Address' },
  { value: 'decimal', label: 'Decimal degrees' }
];

export default class CoordinatesModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tab: 'coordinates'
    };

    this.setTab = this.setTab.bind(this);
  }

  /**
   * UI EVENTS
   * - setTab
  */
  setTab(tab) {
    this.setState({ tab });
  }

  render() {
    return (
      <div className="c-coordinates-modal">
        <SegmentedUi
          className="-tabs-light"
          items={TAB_OPTIONS}
          selected={this.state.tab}
          onChange={selected => this.setTab(selected.value)}
        />
        <CoordinatesForm />
      </div>
    );
  }
}
