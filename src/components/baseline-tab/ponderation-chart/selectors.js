import { createSelector } from 'reselect';

// constants
import { PRESET_VALUES } from 'constants/presets';

// utils
import { getPresetBreakdown } from 'utils/weights';
import { ponderationChart } from 'utils/ponderationChart';

// states
const getPonderation = state => state.settings.ponderation;

export const getData = createSelector(
  [getPonderation],
  (ponderation) => {
    const { scheme, custom } = ponderation;
    const source = scheme === 'custom' ? custom : PRESET_VALUES[scheme];
    const values = getPresetBreakdown(source);

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
