import React from 'react';

export default function ChoroplethItem({ layer }) {
  return (
    <div className="c-legend-item -choropleth">
      <span className="legend-item-name">{layer.name}</span>
      <ol className="list">
        {layer.legendConfig.items.map((item, index) => {
          return (
            <li className="list-item" key={index}>
              <span className="item-color" style={{ backgroundColor: item.color }} />
              <span className="item-name">{item.name}</span>
              {item.value && <span className="item-value">{item.value}</span>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

ChoroplethItem.propTypes = {
  layer: React.PropTypes.object
};
