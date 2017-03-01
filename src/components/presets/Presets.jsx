import React from 'react';
import { CustomSelect } from 'aqueduct-components';
import { presetOptions } from 'constants/presets';

export default class Indicators extends React.Component {
  render() {
    return (
      <div className="c-presets">
        <span className="presets-title">Weighting Scheme Presets</span>
        <CustomSelect
          className="-big"
          options={presetOptions}
          value="agriculture"
          />
      </div>
    );
  }
}

Indicators.propTypes = {};
