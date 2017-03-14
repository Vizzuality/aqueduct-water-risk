import React from 'react';
import { Checkbox, Icon } from 'aqueduct-components';
import { futureLayers, scenarioOptions } from 'constants/layers';
import Presets from 'components/presets/Presets';
import Future from './Future';
import List from './List';
import AdvancedList from './AdvancedList';

export default class LayerList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      advanced: false
    };
  }

  /* Partial renders */
  renderLayerList() {
    return this.state.advanced ?
      <AdvancedList
        layers={this.props.layers}
        activeLayers={this.props.activeLayers}
      /> :
      <List
        layers={this.props.layers}
        activeLayers={this.props.activeLayers}
        onSelectLayer={this.props.onSelectLayer}
      />;
  }

  renderCurrent() {
    return (
      <div>
        <div className="layerlist-header">
          <span className="layerlist-title">Indicators</span>
          <span className="advanced">
            <Checkbox
              className="-reverse"
              label="Change indicator weightings"
              name="advanced"
              value="advanced"
              onChange={val => this.setState({ advanced: val.checked })}
            />
          </span>
        </div>
        {this.state.advanced &&
          <Presets onChange={this.props.setPonderation} ponderation={this.props.ponderation} />
        }
        {this.renderLayerList(this.props.layers, 0)}
      </div>
    );
  }

  renderFuture() {
    return (
      <Future
        layers={futureLayers}
        scenarioOptions={scenarioOptions}
        activeLayers={this.props.activeLayers}
        onSelectLayer={this.props.onSelectLayer}
        setFilters={this.props.setFilters}
        scenario={this.props.scenario}
      />
    );
  }

  /* Render */
  render() {
    return (
      <div className="c-layerlist">
        {this.props.year === 'baseline' ? this.renderCurrent() : this.renderFuture()}
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
  ponderation: React.PropTypes.string,
  // Actions
  onSelectLayer: React.PropTypes.func,
  setFilters: React.PropTypes.func,
  setPonderation: React.PropTypes.func
};
