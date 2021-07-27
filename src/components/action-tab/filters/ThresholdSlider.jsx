import React from 'react';
import { func, number, string } from 'prop-types';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';

import { LEGENDS } from 'components/map/constants';
import SliderMarkLabel from './SliderMarkLabel';
import { style } from './slider_style';

const ThresholdSlider = ({ indicatorId, threshold, handleChange }) => {
  const indicator = LEGENDS[indicatorId];
  const {
    items = [],
    rangeValues = [],
    defaultValue = 0,
    unit = ''
  } = indicator;
  const colors = items.map(i => i.color);
  const {
    dotStyle,
    handleStyle,
    railStyle,
    trackStyle
  } = style({ colors });

  const min = 0;
  const max = 100;
  const step = 10;

  let sliderDefaultValue = defaultValue;
  const valueMap = {};
  rangeValues.forEach((v, i) => {
    const sliderValue = i * 10;
    if (v === defaultValue) sliderDefaultValue = sliderValue;
    valueMap[sliderValue] = v;
  });
  const getActualValue = v => valueMap[v];
  const getSliderValue = v => Object.keys(valueMap).find(key => valueMap[key] === v);

  const marks = {};
  items.forEach(({ name, value }, i) => {
    marks[i * 20] = <SliderMarkLabel label={name} range={value} />;
  });

  const tooltipValue = (value) => {
    let prefix = '';
    const actualValue = getActualValue(value);
    if (rangeValues.indexOf(actualValue) > 0) {
      prefix = '> ';
    }
    return `${prefix}${actualValue} ${unit}`;
  };

  const handleValueChange = (value) => {
    handleChange(getActualValue(value));
  };

  const SliderWithTooltip = createSliderWithTooltip(Slider);

  return (
    <div style={{ marginLeft: 5 }} >
      <SliderWithTooltip
        marks={marks}
        min={min}
        max={max}
        step={step}
        defaultValue={threshold === null ? sliderDefaultValue : getSliderValue(threshold)}
        tipFormatter={tooltipValue}
        dots
        tooltipVisible
        handleStyle={handleStyle}
        trackStyle={trackStyle}
        railStyle={railStyle}
        dotStyle={dotStyle}
        tipProps={{ visible: true }}
        onChange={handleValueChange}
      />
    </div>
  );
};

ThresholdSlider.propTypes = {
  indicatorId: string,
  threshold: number,
  handleChange: func
};

export default ThresholdSlider;
