import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Icon } from 'aqueduct-components';
import { futureLayers, scenarioOptions } from 'constants/layers';
import Presets from 'components/presets/Presets';
import Future from './Future';
import List from './List';
import AdvancedList from './AdvancedList';
import AdvancedListCustom from './AdvancedListCustom';
import PonderationChart from 'components/ponderation-chart/PonderationChart';

export default class LayerList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      advanced: false
    };
  }

  /* Partial renders */
  renderLayerList() {
    const props = {
      layers: this.props.layers,
      activeLayers: this.props.activeLayers,
      onSelectLayer: this.props.onSelectLayer
    };

    let list;

    if (this.state.advanced) {
      list = this.props.ponderation.scheme === 'custom' ?
        <AdvancedListCustom {...props} onSelectLayer={this.props.setPonderation} customPonderation={this.props.ponderation.custom} /> :
        <AdvancedList {...props} ponderation={this.props.ponderation.scheme} />;
    } else {
      list = <List {...props} />;
    }

    return list;
  }

  renderCurrent() {
    return (
      <div>
        <div className="layerlist-header">
          <span className="layerlist-title">Indicators</span>
          <span className="advanced">
            <Checkbox
              className="-reverse"
              label="Change Indicators and Weightings"
              name="advanced"
              value="advanced"
              onChange={val => this.setState({ advanced: val.checked })}
            />
          </span>
        </div>
        {this.state.advanced &&
          <div>
            <Presets onChange={this.props.setPonderation} ponderation={this.props.ponderation.scheme} />
            <PonderationChart ponderation={this.props.ponderation} />
          </div>
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
  layers: PropTypes.array,
  activeLayers: PropTypes.array,
  year: PropTypes.string,
  scenario: PropTypes.string,
  ponderation: PropTypes.object,
  onSelectLayer: PropTypes.func,
  setFilters: PropTypes.func,
  setPonderation: PropTypes.func
};
