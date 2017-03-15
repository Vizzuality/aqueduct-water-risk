import React from 'react';
import { CustomSelect } from 'aqueduct-components';
import { presetOptions } from 'constants/presets';

export default function Presets(props) {
  return (
    <div className="c-presets">
      <span className="presets-title">Weighting Scheme Presets</span>
      <CustomSelect
        className="-big"
        options={presetOptions}
        value={props.ponderation}
        onValueChange={selected => props.onChange({ scheme: selected.value })}
      />
    </div>
  );
}

Presets.propTypes = {
  onChange: React.PropTypes.func,
  ponderation: React.PropTypes.string
};
