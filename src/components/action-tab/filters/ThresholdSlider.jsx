import React, { Fragment } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import SliderMarkLabel from './SliderMarkLabel'
import { style } from './slider_style'
import { LEGENDS } from 'components/map/constants';

const ThresholdSlider = ({ indicatorId }) => {
  const min = 0;
  const max = 100;
  const step = 10;
  const indicator = LEGENDS[indicatorId];
  const { items=[] } = indicator
  const colors = items.map(i => i.color);
  const {
    dotStyle,
    handleStyle,
    railStyle,
    trackStyle
  } = style({ colors });

  const marks = {};
  items.forEach(({ name, value }, i) => {
    marks[i*20] = <SliderMarkLabel label={name} range={value} />
  });

  // const createSliderWithTooltip = Slider.createSliderWithTooltip;
  return (
    <Fragment>
      <Slider
        marks={marks}
        min={min}
        max={max}
        step={step}
        dots
        tooltipVisible
        handleStyle={handleStyle}
        trackStyle={trackStyle}
        railStyle={railStyle}
        dotStyle={dotStyle}
      />
    </Fragment>
  );
};

ThresholdSlider.propTypes = { };

export default ThresholdSlider;
