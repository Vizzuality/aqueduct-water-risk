import React from 'react';
import classnames from 'classnames';
import { Checkbox, Timeline } from 'aqueduct-components';

// constants
import { PRESET_POINTS } from 'constants/presets';

export const renderList = (properties = {}, deep = 0) => {
  const {
    indicators,
    customPonderation,
    setPonderation,
    onCheckIndicator
  } = properties;

  return (
    <ul className="layerlist-list -advanced">
      {indicators.map((_indicator, index) => {
        const itemClass = classnames(
          'layerlist-item',
          { '-disabled': _indicator.disabled }
        );
        const titleClass = classnames(
          'title',
          { '-upper': deep < 2 }
        );

        return (
          <li
            key={index}
            className={itemClass}
          >
            {_indicator.ponderation ?
              <span>
                <Checkbox
                  className="layerlist-cbox"
                  label={_indicator.name}
                  name={_indicator.id}
                  value={_indicator.id}
                  disabled={_indicator.disabled}
                  onChange={({ checked, value }) => { onCheckIndicator(checked, value); }}
                  defaultChecked={customPonderation[_indicator.id] !== 'null' && !_indicator.optional && !_indicator.disabled}
                />
                <Timeline
                  className="-rate -fixed"
                  items={PRESET_POINTS}
                  disabled={customPonderation[_indicator.id] === 'null'}
                  selected={{ value: customPonderation[_indicator.id] }}
                  onChange={({ value }) => { setPonderation({ custom: { [_indicator.id]: value } }); }}
                />
              </span> :
              <span className={titleClass}>
                {_indicator.name}
              </span>
              }
            {(_indicator.children && _indicator.children.length) &&
              renderList({ ...properties, indicators: _indicator.children }, deep + 1)
            }
          </li>
        );
      })}
    </ul>
  );
};

export default { renderList };
