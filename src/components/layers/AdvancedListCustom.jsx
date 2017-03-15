import React from 'react';
import { Checkbox, Timeline } from 'aqueduct-components';
import { points } from 'constants/points';

export default function AdvancedListCustom(props) {
  function getLayers(layers, deep) {
    return (
      <ul className="layerlist-list -advanced">
        {layers.map((l, index) => {
          return (
            <li className="layerlist-item" key={index}>
              {Array.isArray(l.ponderation) ?
                <span>
                  <Checkbox
                    className="layerlist-cbox"
                    label={l.name}
                    name={l.id}
                    value={l.id}
                    onChange={val => console.log(val)}
                  />
                <Timeline className="-rate" items={points} selected={{ value: '3' }} onChange={val => console.log(val)} />
                </span> :
                <span className={deep < 2 ? 'title -upper' : 'title'}>
                  <span>{l.name}</span>
                </span>
                }
              {l.children && l.children.length &&
                getLayers(l.children, deep + 1)
              }
            </li>
          );
        })}
      </ul>
    );
  }

  // Omit "Overall water risk"
  const layers = props.layers[0].children;

  return getLayers(layers, 0);
}

AdvancedListCustom.propTypes = {
  layers: React.PropTypes.array,
  activeLayers: React.PropTypes.array,
  onSelectLayer: React.PropTypes.func
};

AdvancedListCustom.defaultProps = {
  layers: [],
  activeLayers: []
};
