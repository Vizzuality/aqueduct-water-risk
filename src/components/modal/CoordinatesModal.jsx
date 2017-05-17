import React from 'react';
import { SegmentedUi } from 'aqueduct-components';
import AddressForm from 'components/search/AddressForm';
import CoordinatesForm from 'components/search/CoordinatesForm';
import DecimalDegreesForm from 'components/search/DecimalDegreesForm';

const TAB_OPTIONS = [
  { value: 'address', label: 'Address' },
  { value: 'decimal', label: 'Decimal degrees' },
  { value: 'coordinates', label: 'Coordinates' }
];

export default class CoordinatesModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tab: 'address'
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
    const { tab } = this.state;

    return (
      <div className="c-coordinates-modal">
        <SegmentedUi
          className="-tabs-light"
          items={TAB_OPTIONS}
          selected={tab}
          onChange={selected => this.setTab(selected.value)}
        />
        {tab === 'address' &&
          <AddressForm />
        }
        {tab === 'decimal' &&
          <DecimalDegreesForm />
        }
        {tab === 'coordinates' &&
          <CoordinatesForm />
        }
      </div>
    );
  }
}
