import React from 'react';
import { Radio, RadioGroup } from 'aqueduct-components';

export default function Future(props) {
  return (
    <div className="c-future">
      <div className="future-group">
        <span className="future-title">Projected changes in...</span>
        {props.layers.map((i, index) => {
          return (
            <Radio
              key={index}
              label={i.name}
              name="indicator"
              value={i.id}
              selected={props.activeLayers[0]}
              onChange={l => props.onSelectLayer([l])}
            />);
        })}
      </div>
      <div className="future-group">
        <span className="future-title">Scenario</span>
        <p>Future water availibility depends on how the world grows. These possible scenarios are based on the IPCC 5th assessment report.</p>
        <RadioGroup
          name="scenario"
          items={props.scenarioOptions}
          onChange={selected => props.setFilters({ scenario: selected.value })}
          defaultValue={props.scenario}
          className="-inline"
        />
      </div>
    </div>
  );
}

Future.propTypes = {
  layers: React.PropTypes.array,
  scenarioOptions: React.PropTypes.array,
  activeLayers: React.PropTypes.array,
  onSelectLayer: React.PropTypes.func,
  setFilters: React.PropTypes.func,
  scenario: React.PropTypes.string
};
