import React, { PureComponent } from 'react';

// components
import { SegmentedUi } from 'aqueduct-components';
import AddressForm from 'components/modal/coordinates/address';
import CoordinatesForm from 'components/modal/coordinates/coordinates';
import DecimalDegreesForm from 'components/modal/coordinates/decimal-degrees';

// constants
import { TAB_OPTIONS } from './constants';

class CoordinatesModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { tab: 'address' };
  }

  render() {
    const { tab } = this.state;

    return (
      <div className="c-coordinates-modal">
        <SegmentedUi
          className="-tabs-light"
          items={TAB_OPTIONS}
          selected={tab}
          onChange={({ value }) => { this.setState({ tab: value }); }}
        />
        {tab === 'address' && (<AddressForm />)}
        {tab === 'decimal' && (<DecimalDegreesForm />)}
        {tab === 'coordinates' && (<CoordinatesForm />)}
      </div>
    );
  }
}

export default CoordinatesModal;
