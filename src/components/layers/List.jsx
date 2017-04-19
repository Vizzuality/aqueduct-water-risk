import React from 'react';
import { Radio, Icon } from 'aqueduct-components';
import classnames from 'classnames';

export default function List(props) {
  function getLayers(layers, deep) {
    return (
      <ul className="layerlist-list">
        {layers.map((l, index) => {
          const cNames = classnames('layerlist-item', {
            '-selected': props.activeLayers.includes(l.id)
          });
          return (
            <li className={cNames} key={index}>
              <span className={deep < 2 ? 'title -upper' : 'title'}>
                <Radio
                  label={l.name}
                  onChange={i => props.onSelectLayer([i])}
                  name="layer"
                  value={l.id}
                  className="-secondary"
                  selected={props.activeLayers[0]}
                />
              <Icon className="item-icon" name="icon-info" />
              </span>
              {l.children && l.children.length &&
                getLayers(l.children, deep + 1)
              }
            </li>
          );
        })}
      </ul>
    );
  }

  return getLayers(props.layers, 0);
}

React.propTypes = {
  activeLayers: React.PropTypes.array,
  layers: React.PropTypes.array,
  onSelectLayer: React.PropTypes.func
};
