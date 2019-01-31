import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import VegaChart from 'components/vega-chart/VegaChart';

class PonderationChart extends PureComponent {
  render() {
    const { data } = this.props;

    return (
      <div className="c-ponderation-chart">
        <VegaChart data={data} />
      </div>
    );
  }
}

export default PonderationChart;

PonderationChart.propTypes = { data: PropTypes.object.isRequired };
