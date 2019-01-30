import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Checkbox, Timeline } from 'aqueduct-components';
import { points } from 'constants/points';

export default function AdvancedListCustom(props) {
  function setCustomValue(value, id) {
    props.onSelectLayer({
      custom: {
        [id]: value
      }
    });
  }

  function getLayers(layers, deep) {
    return (
      <ul className="layerlist-list -advanced">
        {layers.map((l, index) => {
          const cNames = classnames('layerlist-item', {
            '-disabled': l.disabled
          });

          return (
            <li className={cNames} key={index}>
              {l.ponderation ?
                <span>
                  <Checkbox
                    className="layerlist-cbox"
                    label={l.name}
                    name={l.id}
                    value={l.id}
                    disabled={l.disabled}
                    onChange={item => setCustomValue(item.checked ? 1 : null, item.value)}
                    defaultChecked={props.customPonderation[l.id] !== null && !l.optional && !l.disabled}
                  />
                  <Timeline
                    className="-rate -fixed"
                    items={points}
                    disabled={!props.customPonderation[l.id]}
                    selected={{ value: props.customPonderation[l.id] }}
                    onChange={i => setCustomValue(i.value, l.id)}
                  />
                </span> :
                <span className={deep < 2 ? 'title -upper' : 'title'}>{l.name}</span>
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
  layers: PropTypes.array,
  activeLayers: PropTypes.array,
  onSelectLayer: PropTypes.func,
  customPonderation: PropTypes.object
};

AdvancedListCustom.defaultProps = {
  layers: [],
  activeLayers: []
};
