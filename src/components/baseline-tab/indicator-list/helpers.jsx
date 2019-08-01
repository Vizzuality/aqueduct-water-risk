import React from 'react';
import classnames from 'classnames';
import { Radio, Icon } from 'aqueduct-components';

// constants
import { INDICATOR_NAMES_RELATION } from 'constants/indicators';

// utils
import { logEvent } from 'utils/analytics';

export const renderList = (properties = {}, deep = 0) => {
  const {
    indicators,
    currentIndicator,
    setFilters,
    openModal
  } = properties;

  const handleChangeIndicator = (indicator) => {
    setFilters({ indicator });
    logEvent('Map Data', 'Add data to the map', INDICATOR_NAMES_RELATION[indicator]);
  };

  return (
    <ul className="layerlist-list">
      {indicators.map((_indicator, index) => {
        const itemClass = classnames(
          'layerlist-item',
          {
            '-selected': currentIndicator === _indicator.id,
            '-disabled': _indicator.disabled
          }
        );
        const titleClass = classnames(
          'title',
          { '-upper': deep < 2 });

        if (!_indicator.optional) {
          return (
            <li
              key={index}
              className={itemClass}
            >
              <span className={titleClass}>
                <Radio
                  label={_indicator.name}
                  onChange={(indicator) => { handleChangeIndicator(indicator); }}
                  name={`indicator-${_indicator.id}`}
                  value={_indicator.id}
                  disabled={_indicator.disabled}
                  className="-secondary"
                  selected={currentIndicator}
                />
                <button
                  type="button"
                  className="icon-container -info"
                  onClick={() => openModal(_indicator.id)}
                >
                  <Icon
                    name="icon-info"
                    className="title-icon"
                  />
                </button>
              </span>
              {(_indicator.children && _indicator.children.length) &&
                renderList({ ...properties, indicators: _indicator.children }, deep + 1)
              }
            </li>
          );
        }
        return null;
      })}
    </ul>
  );
};

export default { renderList };
