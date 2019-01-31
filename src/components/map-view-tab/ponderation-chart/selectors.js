import { createSelector } from 'reselect';

// constants
import { PRESET_VALUES } from 'constants/presets';

// utils
import { ponderationChart } from 'utils/ponderationChart';

// states
const getPonderation = state => state.mapView.ponderation;

export const getData = createSelector(
  [getPonderation],
  (ponderation) => {
    const source = PRESET_VALUES[ponderation.scheme];
    const quantityTotal = source.bws_cat + source.bwd_cat + source.gtd_cat +
      source.iav_cat + source.sev_cat + source.drr_cat + source.rfr_cat + source.cfr_cat;
    const qualityTotal = source.ucw_cat + source.cep_cat;
    const regulatoryTotal = source.udw_cat + source.usa_cat + source.rri_cat;
    const total = quantityTotal + qualityTotal + regulatoryTotal;
    const values = {
      quantity: (quantityTotal / total) * 100,
      quality: (qualityTotal / total) * 100,
      regulatory: (regulatoryTotal / total) * 100
    };

    return {
      ...ponderationChart,
      data: [
        {
          name: 'table',
          values: [
            { x: 'Water Quantity Risk', y: values.quantity },
            { x: 'Water Quality Risk', y: values.quality },
            { x: 'Regulatory and Reputational', y: values.regulatory }
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
  }
);

export default { getData };
