import React from 'react';
import { Timeline, Radio, Icon } from 'aqueduct-components';

const points = [
  {
    label: '',
    value: '1'
  },
  {
    label: '',
    value: '2'
  },
  {
    label: '',
    value: '3'
  },
  {
    label: '',
    value: '4'
  },
  {
    label: '',
    value: '5'
  }
];

export default function AdvancedList(props) {
  function getLayers(layers, deep) {
    return (
      <ul className="layerlist-list -advanced">
        {layers.map((l, index) => {
          return (
            <li className="layerlist-item" key={index}>
              {Array.isArray(l.ponderation) ?
                <span>
                  <span>{l.name}</span>
                  <Timeline className="-rate -bloqued" items={points} selected={{ value: '3' }} onChange={() => {}} />
                </span> :
                <span className={deep < 2 ? '-upper' : ''}>
                  <Radio
                    label={l.name}
                    onChange={i => props.onSelectLayer([i])}
                    name="layer"
                    value={l.id}
                    selected={props.activeLayers[0]}
                  />
                  <Icon name="icon-info" />
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

  return getLayers(props.layers, 0);
}

AdvancedList.propTypes = {
  layers: React.PropTypes.array,
  activeLayers: React.PropTypes.array
};

AdvancedList.defaultProps = {
  layers: [],
  activeLayers: []
};
