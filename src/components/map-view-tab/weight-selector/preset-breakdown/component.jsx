import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// utils
import { getPresetBreakdown } from 'utils/weights';

class PresetBreakdown extends PureComponent {

  componentWillMount() {
    const { source } = this.props;
    this.breakdown = getPresetBreakdown(source);
  }
  render() {
    const { quantity, quality, regulatory } = this.breakdown;

    return (
      <div className="c-preset-breakdown">
        <div className="bar -quantity" style={{ width: `${quantity}%` }} />
        <div className="bar -quality" style={{ width: `${quality}%` }} />
        <div className="bar -regulatory" style={{ width: `${regulatory}%` }} />
      </div>
    );
  }
}

PresetBreakdown.propTypes = { source: PropTypes.object.isRequired };

export default PresetBreakdown;
