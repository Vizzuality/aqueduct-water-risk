import React from 'react';
import ChoroplethItem from './ChoroplethItem';

const legendItems = {
  choropleth: ChoroplethItem
};

export default function Legend({ layers }) {
  return (
    <section className="c-legend">
      <div className="legend-content">
        {layers.map((layer, index) => {
          const LegendItem = legendItems[layer.legendConfig.type];
          return (
            <li key={index}>
              {LegendItem ? <LegendItem layer={layer} /> : null}
            </li>
          );
        })}
      </div>
    </section>
  );
}

Legend.propTypes = {
  layers: React.PropTypes.array
};
