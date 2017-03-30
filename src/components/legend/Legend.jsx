import React from 'react';
import ChoroplethItem from './ChoroplethItem';
import startCase from 'lodash/startCase';
import upperFirst from 'lodash/upperFirst';

const legendItems = {
  choropleth: ChoroplethItem
};

export default function Legend({ layers, config }) {
  const indicator = config.layers.active[0];
  let name = upperFirst(startCase(indicator));
  name += indicator === 'water_stress' ? ` - ${upperFirst(config.ponderation.scheme)}` : '';

  return (
    <section className="c-legend">
      <div className="legend-content">
        {layers.map((layer, index) => {
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

Legend.propTypes = {
  layers: React.PropTypes.array,
  config: React.PropTypes.object
};
