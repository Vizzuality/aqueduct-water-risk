
export const TIMEFRAME_OPTIONS = [
  { value: '2030', label: '2030' },
  { value: '2040', label: '2040' }
];

export const timeScaleOptions = [
  { value: 'annual', label: 'Annual' },
  { value: 'monthly', label: 'Monthly' }
];

export const MONTH_OPTIONS = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' }
];

export const projectionOptions = [
  { value: 'absolute', label: 'Absolute value' },
  { value: 'bs', label: 'Change from baseline' }
];

export const SCENARIO_MODAL_DESCRIPTION = {
  title: 'Scenarios',
  description: `<p>Optimistic:</p>
  <p>The "optimistic" scenario (SSP2 RCP4.5) represents a world with stable economic development and carbon emissions peaking and declining by 2040, with emissions constrained to stabilize at ~650 ppm CO2 and temperatures to 1.1–2.6°C by 2100.</p>

  <p>Business as usual</p>
  </p>The "business as usual" scenario (SSP2 RCP8.5) represents a world with stable economic development and steadily rising global carbon emissions, with CO2 concentrations reaching ~1370 ppm by 2100 and global mean temperatures increasing by 2.6–4.8°C relative to 1986–2005 levels.</p>

  <p>Pessimistic</p>
  <p>The "pessimistic" scenario (SSP3 RCP8.5) represents a fragmented world with uneven economic development, higher population growth, lower GDP growth, and a lower rate of urbanization, all of which potentially affect water usage; and steadily rising global carbon emissions, with CO2 concentrations reaching ~1370 ppm by 2100 and global mean temperatures increasing by 2.6–4.8°C relative to 1986–2005 levels.</p>`,
  source: '<a href="https://www.wri.org/publication/aqueduct-water-stress-projections-decadal-projections-water-supply-and-demand-using" target="_blank" rel="noopener noreferrer">Aqueduct 2015</a>'
};

export const TIMEFRAME_MODAL_DESCRIPTION = {
  title: 'Temporal resolution',
  description: 'Depending on the temporal resolution selected, different indicators will be available.'
};

export default {
  TIMEFRAME_OPTIONS,
  timeScaleOptions,
  MONTH_OPTIONS,
  projectionOptions,
  SCENARIO_MODAL_DESCRIPTION,
  TIMEFRAME_MODAL_DESCRIPTION
};
