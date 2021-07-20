import React, { Fragment } from 'react';
import Slider, {createSliderWithTooltip} from 'rc-slider';
import 'rc-slider/assets/index.css';
import SliderMarkLabel from './SliderMarkLabel'
import { style } from './slider_style'
import { LEGENDS } from 'components/map/constants';

const ThresholdSlider = ({ indicatorId }) => {
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

  let sliderDefaultValue = defaultValue
  const valueMap = {};
  rangeValues.forEach((v, i) => {
    const sliderValue = i * 10
    if (v === defaultValue) sliderDefaultValue = sliderValue
    valueMap[sliderValue] = v
  });
  const getActualValue = v => valueMap[v];

  const marks = {};
  items.forEach(({ name, value }, i) => {
    marks[i * 20] = <SliderMarkLabel label={name} range={value} />;
  });


  const handleChange = (value) => {
    // getActualValue(value)
    // update filter state
  };

  const tooltipValue = (value) => {
    let prefix = '';
    const actualValue = getActualValue(value)
    if (rangeValues.indexOf(actualValue) > 0) {
      prefix = '> ';
    }
    return `${prefix}${actualValue} ${unit}`;
  };

  const SliderWithTooltip = createSliderWithTooltip(Slider);
  return (
    <div style={{ marginLeft: 5 }} >
      <SliderWithTooltip
        marks={marks}
        min={min}
        max={max}
        step={step}
        defaultValue={sliderDefaultValue}
        tipFormatter={tooltipValue}
        dots
        tooltipVisible
        handleStyle={handleStyle}
        trackStyle={trackStyle}
        railStyle={railStyle}
        dotStyle={dotStyle}
        tipProps={{ visible: true }}
        onChange={handleChange}
      />
    </div>
  );
};

ThresholdSlider.propTypes = { };

export default ThresholdSlider;
