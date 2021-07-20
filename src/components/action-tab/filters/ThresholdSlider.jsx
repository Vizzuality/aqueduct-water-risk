import React, { Fragment } from 'react';
import Slider, {createSliderWithTooltip} from 'rc-slider';
import 'rc-slider/assets/index.css';
import SliderMarkLabel from './SliderMarkLabel'
import { style } from './slider_style'
import { LEGENDS } from 'components/map/constants';

const ThresholdSlider = ({ indicatorId }) => {
  const indicator = LEGENDS[indicatorId];
  const { items=[], rangeValues=[] } = indicator
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

  const valueMap = {};
  rangeValues.forEach((v, i) => valueMap[i * 10] = v);
  const getActualValue = v => valueMap[v];

  const marks = {};
  items.forEach(({ name, value }, i) => {
    marks[i * 20] = <SliderMarkLabel label={name} range={value} />
  });


  const handleChange = (value) => {
    // getActualValue(value)
    // update filter state
  };

  const SliderWithTooltip = createSliderWithTooltip(Slider);
  return (
    <div style={ { marginLeft: 15} }>
      <SliderWithTooltip
        marks={marks}
        min={min}
        max={max}
        step={step}
        tipFormatter={getActualValue}
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
