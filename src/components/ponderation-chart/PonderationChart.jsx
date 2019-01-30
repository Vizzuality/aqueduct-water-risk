import React from 'react';
import PropTypes from 'prop-types';
import { ponderationChart } from 'utils/ponderationChart';
import { ponderationValues } from 'constants/ponderationPresetsValues';
import VegaChart from 'components/vega-chart/VegaChart';

export default function PonderationChart({ ponderation }) {
  const values = {};
  const source = ponderation.scheme === 'custom' ? ponderation.custom : ponderationValues[ponderation.scheme];

  const quantityTotal = source.water_stress + source.interannual_variability + source.seasonal_variability +
    source.flood_occurrence + source.drought_severity + source.upstream_storage + source.groundwater_stress;
  const qualityTotal = source.return_flow_ratio + source.upstream_protected_land;
  const regulatoryTotal = source.media_coverage + source.access_to_water + source.threatened_amphibians;
  const total = quantityTotal + qualityTotal + regulatoryTotal;

  values.quantity = (quantityTotal / total) * 100;
  values.quality = (qualityTotal / total) * 100;
  values.regulatory = (regulatoryTotal / total) * 100;

  const data = {
    ...ponderationChart,
    data: [
      {
        name: 'table',
        values: [
          { x: 'Physical risk quantity', y: values.quantity },
          { x: 'Physical risk quality', y: values.quality },
          { x: 'Regulatory and reputational risk', y: values.regulatory }
        ],
        transform: [
          { type: 'pie', field: 'y' },
          {
            type: 'formula',
            field: 'x_percent',
            expr: 'round((datum.layout_end - datum.layout_start)/2/PI*100) + \'% \' + datum.x'
          }
        ]
      }
    ]
  };

  return (
    <div className="c-ponderation-chart">
      <VegaChart data={data} />
    </div>
  );
}

PonderationChart.propTypes = {
  ponderation: PropTypes.object
};
