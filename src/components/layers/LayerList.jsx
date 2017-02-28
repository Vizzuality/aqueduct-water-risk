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
  renderLayerList(layers) {
    return (
      <ul className="layerlist-list">
        {layers.map((l, index) => {
          return (
            <li className="layerlist-item" key={index}>
              <span>
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
                this.renderLayerList(l.children)
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
        {this.renderLayerList(this.props.layers)}
      </div>
    );
  }

  renderFuture() {
    return (
      <div>
        <div>
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
        <div>
          <RadioGroup
            name="scenario"
            items={scenarioOptions}
            onChange={selected => this.props.setFilters({ scenario: selected.value })}
            selected={this.props.scenario}
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
