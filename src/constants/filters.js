import { APP_DEFINITIONS } from "aqueduct-components";

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

export const BASIN_MODAL_PROPS = {
  name: 'Desired Conditions Threshold',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quid sentiat, non videtis. Duo Reges: constructio interrete. Torquatus, is qui consul cum Cn. Sed emolumenta communia esse dicuntur, recte autem facta et peccata non habentur communia. Re mihi non aeque satisfacit, et quidem locis pluribus. Praeclare enim Plato: Beatum, cui etiam in senectute contigerit, ut sapientiam verasque opiniones assequi possit. Sed erat aequius Triarium aliquid de dissensione nostra iudicare. Quis enim confidit semper sibi illud stabile et firmum permansurum, quod fragile et caducum sit?'
};

// The content rendered in AsideContext is edited
// A few columns in the description table are removed
export const WATER_RISK_PROPS = {
  info: Object.assign(APP_DEFINITIONS['water-risk'], {
    description: "<p>The map displays the level of water risk in areas producing the selected crop(s).</p><p>The table below describes each of the water risk indicators. Note that some are more relevant for irrigated agriculture, and some are more relevant for rainfed agriculture. Future projections are only available for water stress and seasonal variability and are based on business-as-usual climate change and water demand scenarios.</p><div class='c-table'><table class='table'><tr><th>Indicator</th><th class='description'>Description</th></tr><tr><td>Baseline Water Stress</td><td>Baseline water stress measures the ratio of total water withdrawals to available renewable surface and groundwater supplies. Water withdrawals include domestic, industrial, irrigation, and livestock consumptive and nonconsumptive uses. Available renewable water supplies include the impact of upstream consumptive water users and large dams on downstream water availability. Higher values indicate more competition among users.</td></tr><tr><td>Baseline Water Depletion</td><td>Baseline water depletion measures the ratio of total water consumption to available renewable water supplies. Total water consumption includes domestic, industrial, irrigation, and livestock consumptive uses. Available renewable water supplies include the impact of upstream consumptive water users and large dams on downstream water availability. Higher values indicate larger impact on the local water supply and decreased water availability for downstream users. Baseline water depletion is similar to baseline water stress; however, instead of looking at total water withdrawal (consumptive plus nonconsumptive), baseline water depletion is calculated using consumptive withdrawal only.</td></tr><tr><td>Groundwater Table Decline</td><td>Groundwater table decline measures the average decline of the groundwater table as the average change for the period of study (1990–2014). The result is expressed in centimeters per year (cm/yr). Higher values indicate higher levels of unsustainable groundwater withdrawals.</td></tr><tr><td>Coastal Eutrophication Potential</td><td>Coastal eutrophication potential (CEP) measures the potential for riverine loadings of nitrogen (N), phosphorus (P), and silica (Si) to stimulate harmful algal blooms in coastal waters. The CEP indicator is a useful metric to map where anthropogenic activities produce enough point-source and nonpoint-source pollution to potentially degrade the environment. When N and P are discharged in excess over Si with respect to diatoms, a major type of algae, undesirable algal species often develop. The stimulation of algae leading to large blooms may in turn result in eutrophication and hypoxia (excessive biological growth and decomposition that reduces oxygen available to other organisms). It is therefore possible to assess the potential for coastal eutrophication from a river’s N, P, and Si loading. Higher values indicate higher levels of excess nutrients with respect to silica, creating more favorable conditions for harmful algal growth and eutrophication in coastal waters downstream.</td></tr><tr><td>Unimproved/No Drinking Water</td><td>Unimproved/no drinking water reflects the percentage of the population collecting drinking water from an unprotected dug well or spring, or directly from a river, dam, lake, pond, stream, canal, or irrigation canal (WHO and UNICEF 2017). Specifically, the indicator aligns with the unimproved and surface water categories of the Joint Monitoring Programme (JMP)—the lowest tiers of drinking water services. Higher values indicate areas where people have less access to safe drinking water supplies.</td></tr><tr><td>Unimproved/No Sanitation</td><td>Unimproved/no sanitation reflects the percentage of the population using pit latrines without a slab or platform, hanging/bucket latrines, or directly disposing human waste in fields, forests, bushes, open bodies of water, beaches, other open spaces, or with solid waste (WHO and UNICEF 2017). Specifically, the indicator aligns with JMP’s unimproved and open defecation categories— the lowest tier of sanitation services. Higher values indicate areas where people have less access to improved sanitation services.</td></tr></table></div>",
    source: "WRI Aqueduct 2019 (Hyperlink: <a href='https://www.wri.org/publication/aqueduct-30'>https://www.wri.org/publication/aqueduct-30</a>)"
  })
};

export default {
  TIMEFRAME_OPTIONS,
  timeScaleOptions,
  MONTH_OPTIONS,
  projectionOptions,
  SCENARIO_MODAL_DESCRIPTION,
  TIMEFRAME_MODAL_DESCRIPTION,
  BASIN_MODAL_PROPS
};
