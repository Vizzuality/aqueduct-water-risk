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
    const { scheme, custom } = ponderation;
    const source = scheme === 'custom' ? custom : PRESET_VALUES[scheme];
    const quantityTotal = (+source.bws_cat || 0) + (+source.bwd_cat || 0) + (+source.gtd_cat || 0) +
      (+source.iav_cat || 0) + (+source.sev_cat || 0) + (+source.drr_cat || 0) + (+source.rfr_cat || 0) + (+source.cfr_cat || 0);
    const qualityTotal = (+source.ucw_cat || 0) + (+source.cep_cat || 0);
    const regulatoryTotal = (+source.udw_cat || 0) + (+source.usa_cat || 0) + (+source.rri_cat || 0);
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
