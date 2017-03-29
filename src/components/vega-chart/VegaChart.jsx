import React from 'react';
import vega from 'vega';
import isEqual from 'lodash/isEqual';

export default class VegaChart extends React.Component {

  componentDidMount() {
    this.renderChart();
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps.data, this.props.data);
  }

  componentDidUpdate() {
    // We should check if the data has changed
    this.renderChart();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeEvent);
  }

  parseVega() {
    this.props.toggleLoading && this.props.toggleLoading(true);

    vega.parse.spec(this.props.data, this.props.theme, (err, chart) => {
      this.props.toggleLoading && this.props.toggleLoading(false);
      if (!err) {
        this.vis = chart({
          el: this.chart,
          renderer: 'canvas'
        });
        this.vis.update();
      }
    });
  }

  handleResize() {
    this.renderChart();
  }

  renderChart() {
    this.parseVega();
  }

  render() {
    return (
      <div className="c-chart">
        <div ref={(c) => { this.chart = c; }} className="chart" />
      </div>
    );
  }
}

VegaChart.propTypes = {
  // Define the chart data
  data: React.PropTypes.any.isRequired,
  toggleLoading: React.PropTypes.func,
  theme: React.PropTypes.object
};

VegaChart.defaultProps = {
  theme: {}
};
