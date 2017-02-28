import React from 'react';
import { Radio, Checkbox, RadioGroup, Icon } from 'aqueduct-components';
name="scenario"
import { futureLayers, scenarioOptions } from 'constants/layers';

export default class LayerList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      advanced: false
    };
  }

  /* Partial renders */
  renderLayerList(layers, deep) {
    return (
      <ul className="layerlist-list">
        {layers.map((l, index) => {
          return (
            <li className="layerlist-item" key={index}>
              <span className={deep < 2 ? '-upper' : ''}>
                <Radio
                  label={l.name}
                  onChange={i => this.props.onSelectLayer([i])}
                  name="layer"
                  value={l.id}
                  selected={this.props.activeLayers[0]}
                />
                <Icon name="icon-info" />
              </span>
              {l.children && l.children.length &&
                this.renderLayerList(l.children, deep + 1)
              }
            </li>
          );
        })}
      </ul>);
  }

  renderIndicators() {
    return (
      <div>
        <span className="advanced">
          <Checkbox
            className="-reverse"
            label="Advanced settings"
            name="advanced"
            value="advanced"
            onChange={val => this.setState({ advanced: val.checked })}
          />
        </span>
        {this.state.advanced &&
          <div>
            <span>Weight scheme presets</span>
            <span>Indicators</span>
          </div>
        }
        <span className="layerlist-title">Indicators</span>
        {this.renderLayerList(this.props.layers, 0)}
      </div>
    );
  }

  renderFuture() {
    return (
      <div className="c-future">
        <div className="future-group">
          <span className="future-title">Projected changes in...</span>
          {futureLayers.map((i, index) => {
            return (
              <Radio
                key={index}
                label={i.name}
                name="indicator"
                value={i.id}
                selected={this.props.activeLayers[0]}
                onChange={l => this.props.onSelectLayer([l])}
              />);
          })}
        </div>
        <div className="future-group">
          <span className="future-title">Scenario</span>
          <p>Future water availibility depends on how the world grows. These possible scenarios are based on the IPCC 5th assessment report.</p>
          <RadioGroup
            name="scenario"
            items={scenarioOptions}
            onChange={selected => this.props.setFilters({ scenario: selected.value })}
            selected={this.props.scenario}
            className="-inline"
          />
        </div>
      </div>
    );
  }

  /* Render */
  render() {
    return (
      <div className="c-layerlist">
        {this.props.year === 'baseline' ? this.renderIndicators() : this.renderFuture()}
      </div>
    );
  }
}

LayerList.propTypes = {
  // State
  layers: React.PropTypes.array,
  activeLayers: React.PropTypes.array,
  year: React.PropTypes.string,
  scenario: React.PropTypes.string,
  // Actions
  onSelectLayer: React.PropTypes.func,
  setFilters: React.PropTypes.func
};
