import React from 'react';
import classnames from 'classnames';
import { Timeline, Radio, Icon } from 'aqueduct-components';

// constants
import { PRESET_VALUES, PRESET_POINTS } from 'constants/presets';

export const renderList = (properties = {}, deep = 0) => {
  const {
    indicators,
    currentIndicator,
    ponderation,
    setFilters,
    openModal
  } = properties;

  return (
    <ul className="layerlist-list -advanced">
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

        const timelineClass = classnames(
          '-rate -fixed -bloqued',
          { '-disabled': _indicator.disabled }
        );

        if (!_indicator.optional) {
          return (
            <li
              key={index}
              className={itemClass}
            >
              {_indicator.ponderation ?
                <span>
                  <div className="ponderation-header -no-radio">
                    <span className="timeline-title">{_indicator.name}</span>
                    <button
                      type="button"
                      className="icon-container"
                      onClick={() => { openModal(_indicator.id); }}
                    >
                      <Icon
                        name="icon-info"
                        className="title-icon"
                      />
                    </button>

                  </div>
                  <Timeline
                    className={timelineClass}
                    items={PRESET_POINTS}
                    selected={{ value: PRESET_VALUES[ponderation][_indicator.id] }}
                  />
                </span> :
                <span className={titleClass}>
                  <Radio
                    label={_indicator.name}
                    onChange={(indicator) => { setFilters({ indicator }); }}
                    name={`indicator-${_indicator.id}`}
                    value={_indicator.id}
                    selected={currentIndicator}
                    className="-secondary"
                  />
                  <button
                    type="button"
                    className="icon-container"
                    onClick={() => { openModal(_indicator.id); }}
                  >
                    <Icon
                      name="icon-info"
                      className="title-icon"
                    />
                  </button>
                </span>
              }
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
