import React from 'react';
import PropTypes from 'prop-types';
import ChoroplethItem from './ChoroplethItem';
import startCase from 'lodash/startCase';
import upperFirst from 'lodash/upperFirst';
import { Icon } from 'aqueduct-components';

const legendItems = {
  choropleth: ChoroplethItem
};

export default class Legend extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      closed: false
    };

    // Bindings
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      closed: !this.state.closed
    });
  }

  render() {
    const { layers, config } = this.props;

    const indicator = config.layers.active[0];
    const name = upperFirst(startCase(indicator));

    return (
      <section className="c-legend">
        <header className="legend-header">
          <h1 className="legend-title">legend</h1>
          <button onClick={this.toggle} className="header-btn" type="button">
            <Icon name={`icon-arrow-${this.state.closed ? 'down' : 'up'}-2`} className="header-icon" />
          </button>
        </header>
        <div className="legend-content">
          {this.state.closed || layers.map((layer, index) => {
            const LegendItem = legendItems[layer.legendConfig.type];
            return (
              <li key={index}>
                {LegendItem ? <LegendItem layer={layer} name={name} /> : null}
              </li>
            );
          })}
        </div>
      </section>
    );
  }
}

Legend.propTypes = {
  layers: PropTypes.array,
  config: PropTypes.object
};
