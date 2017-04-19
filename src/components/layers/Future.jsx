import React from 'react';
import { Radio, RadioGroup } from 'aqueduct-components';

export default function Future(props) {
  return (
    <div className="c-future">
      <div className="future-group">
        <span className="future-title">Projected changes in...</span>
        <RadioGroup
          name="indicator"
          items={props.layers.map(l => ({ label: l.name, value: l.id }))}
          onChange={selected => props.onSelectLayer(selected.value)}
          defaultValue={props.activeLayers[0]}
          className="-secondary"
        />
      </div>
      <div className="future-group">
        <span className="future-title">Scenario</span>
        <p>Future water availibility depends on how the world grows. These possible scenarios are based on the IPCC 5th assessment report.</p>
        <RadioGroup
          name="scenario"
          items={props.scenarioOptions}
          onChange={selected => props.setFilters({ scenario: selected.value })}
          defaultValue={props.scenario}
          className="-inline -secondary"
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
