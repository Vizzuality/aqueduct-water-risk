export const INDICATORS = [
  {
    id: 'w_awr_def_tot_cat',
    name: 'Overall Water Risk',
    overall: true,
    children: [
      {
        id: 'w_awr_def_qan_cat',
        name: 'Water Quantity Risk',
        children: [
          {
            id: 'bws_cat',
            name: 'Baseline Water Stress',
            ponderation: true
          },
          {
            id: 'bwd_cat',
            name: 'Baseline Water Depletion',
            ponderation: true
          },
          {
            id: 'gtd_cat',
            name: 'Groundwater Table Decline',
            ponderation: true
          },
          {
            id: 'iav_cat',
            name: 'Interannual Variability',
            ponderation: true
          },
          {
            id: 'sev_cat',
            name: 'Seasonal Variability',
            ponderation: true
          },
          {
            id: 'drr_cat',
            name: 'Drought Risk',
            ponderation: true
          },
          {
            id: 'rfr_cat',
            name: 'Riverine Flood Risk',
            ponderation: true
          },
          {
            id: 'cfr_cat',
            name: 'Coastal Flood Risk',
            ponderation: true
          }
        ]
      },
      {
        id: 'w_awr_def_qal_cat',
        name: 'Water Quality Risk',
        children: [
          {
            id: 'ucw_cat',
            name: 'Untreated Collected Wastewater',
            ponderation: true
          },
          {
            id: 'cep_cat',
            name: 'Coastal Eutrophication Potential',
            ponderation: true
          }
        ]
      },
      {
        id: 'w_awr_def_rrr_cat',
        name: 'Regulatory and Reputational',
        children: [
          {
            id: 'udw_cat',
            name: 'Unimproved/no drinking water',
            ponderation: true
          },
          {
            id: 'usa_cat',
            name: 'Unimproved/no sanitation',
            ponderation: true
          },
          {
            id: 'rri_cat',
            name: 'RepRisk Index',
            ponderation: true
          }
        ]
      }
    ]
  }
];

export const FUTURE_INDICATORS = {
  bs: [
    // projected change in water stress
    {
      id: '5aafeab1-4b48-40b0-9042-f654f1531aaf',
      name: 'Water Stress'
    },
      // projected change in seasonal variability
    {
      id: '45a1f9c5-7b0b-4705-978f-1e98dc8b3277',
      name: 'Seasonal Variability'
    },
    // projected change in water supply
    {
      id: 'c124cfce-0414-4cf3-ba2d-e63634199b04',
      name: 'Water Supply'
    },
    // projected change in water demand
    {
      id: 'a3795c06-d2eb-4aa3-8e24-62965b69e5ce',
      name: 'Water Demand'
    }
  ],
  absolute: [
    // projected water stress
    {
      id: 'd5c8316c-de80-4be3-a973-d3fbafc7eaca',
      name: 'Water Stress'
    },
    // projected seasonal variability
    {
      id: 'd7d5fd18-e8e4-4654-b595-7accbb582992',
      name: 'Seasonal Variability'
    },
    // projected water supply
    {
      id: 'a045b21a-c2ff-4ec5-b7fa-2c1f206b8911',
      name: 'Water Supply'
    },
    // projected water demand
    {
      id: 'cf7e6a51-3366-42d7-a8ae-ef0f1f11a5f1',
      name: 'Water Demand'
    }
  ]
};

export const INDICATOR_NAMES_RELATION = {
  w_awr_def_tot_cat: 'Overall Water Risk',
  w_awr_def_qan_cat: 'Water Quantity Risk',
  w_awr_def_qal_cat: 'Water Quality Risk',
  w_awr_def_rrr_cat: 'Regulatory and Reputational',
  // Water Quantity Risk
  bws_cat: 'Baseline Water Stress',
  bwd_cat: 'Baseline Water Depletion',
  gtd_cat: 'Groundwater Table Decline',
  iav_cat: 'Interannual Variability',
  sev_cat: 'Seasonal Variability',
  drr_cat: 'Drought Risk',
  rfr_cat: 'Riverine Flood Risk',
  cfr_cat: 'Coastal Flood Risk',
  // Water Quality Risk
  ucw_cat: 'Untreated Collected Wastewater',
  cep_cat: 'Coastal Eutrophication Potential',
  // Regulatory and Reputational
  udw_cat: 'Unimproved/no drinking water',
  usa_cat: 'Unimproved/no sanitation',
  rri_cat: 'RepRisk Index',
  // future
  '5aafeab1-4b48-40b0-9042-f654f1531aaf': 'Water Stress',
  '45a1f9c5-7b0b-4705-978f-1e98dc8b3277': 'Seasonal Variability',
  'c124cfce-0414-4cf3-ba2d-e63634199b04': 'Water Supply',
  'a3795c06-d2eb-4aa3-8e24-62965b69e5ce': 'Water Demand',
  'd5c8316c-de80-4be3-a973-d3fbafc7eaca': 'Water Stress',
  'd7d5fd18-e8e4-4654-b595-7accbb582992': 'Seasonal Variability',
  'a045b21a-c2ff-4ec5-b7fa-2c1f206b8911': 'Water Supply',
  'cf7e6a51-3366-42d7-a8ae-ef0f1f11a5f1': 'Water Demand'
};

export const INDICATOR_DESCRIPTIONS = {
  w_awr_def_tot_cat: {
    name: INDICATOR_NAMES_RELATION.w_awr_def_tot_cat,
    description: `Overall water risk measures all water-related risks, by aggregating all selected indicators
    from the Physical Quantity, Quality and Regulatory & Reputational Risk categories. Higher values
    indicate higher water risk.`,
    sources: [{
      name: 'WRI Aqueduct 2014',
      link: 'https://www.wri.org/publication/aqueduct-global-maps-21-indicators'
    }]
  },
  w_awr_def_qan_cat: {
    name: INDICATOR_NAMES_RELATION.w_awr_def_qan_cat,
    description: `Physical risks quantity measures risk related to too little or too much water,
    by aggregating all selected indicators from the Physical Risk Quantity category. Higher values indicate higher water quantity risks.`,
    sources: [{
      name: 'WRI Aqueduct 2014',
      link: 'https://www.wri.org/publication/aqueduct-global-maps-21-indicators'
    }]
  },
  w_awr_def_qal_cat: {
    name: INDICATOR_NAMES_RELATION.w_awr_def_qal_cat,
    description: `Physical risks quality measures risk related to water that is unfit for use,
    by aggregating all selected indicators from the Physical Risk Quality category. Higher values indicate higher water quality risks.`,
    sources: [{
      name: 'WRI Aqueduct 2014',
      link: 'https://www.wri.org/publication/aqueduct-global-maps-21-indicators'
    }]
  },
  w_awr_def_rrr_cat: {
    name: INDICATOR_NAMES_RELATION.w_awr_def_rrr_cat,
    description: `Regulatory and reputational risks measures risk related to uncertainty in regulatory change,
    as well as conflicts with the public regarding water issues. Higher values indicate higher regulatory and
    reputational water risks.`,
    sources: [{
      name: 'WRI Aqueduct 2014',
      link: 'https://www.wri.org/publication/aqueduct-global-maps-21-indicators'
    }]
  },
  // Water Quantity Risk
  bws_cat: {
    name: INDICATOR_NAMES_RELATION.bws_cat,
    description: `Baseline water stress measures the ratio of total water withdrawals to available renewable water supplies.
    Water withdrawals include domestic, industrial, irrigation and livestock consumptive and non-consumptive uses. Available renewable
    water supplies include surface and groundwater supplies and considers the impact of upstream consumptive water users and large dams
    on downstream water availability. Higher values indicate more competition among users.`,
    sources: [{
      name: 'WRI Aqueduct 2014',
      link: 'https://www.wri.org/publication/aqueduct-global-maps-21-indicators'
    },
    { name: 'FAO AQUASTAT 2008-2012' },
    { name: 'NASA GLDAS-2 2012' },
    { name: 'Shiklomanov and Rodda 2004' },
    { name: 'Flörke et al. 2012' },
    { name: 'Matsutomi et al. 2009' }
    ]
  },
  bwd_cat: {
    name: INDICATOR_NAMES_RELATION.bwd_cat,
    description: `Baseline water depletion measures the ratio of total water consumption to available renewable
    water supplies. Total water consumption includes domestic, industrial, irrigation and livestock consumptive uses.
    Available renewable water supplies include surface and groundwater supplies and considers the impact of upstream consumptive
    water users and large dams on downstream water availability. Higher values indicate larger impact on the local water supply
    and decreased water availability for downstream users.`,
    sources: []
  },
  gtd_cat: {
    name: INDICATOR_NAMES_RELATION.gtd_cat,
    description: `Groundwater table decline measures the average annual decline of the groundwater table.
    Higher values indicate higher levels of unsustainable groundwater withdrawals.`,
    sources: [
      { name: 'Gleeson' },
      { name: 'Wada' },
      { name: 'Bierkens' },
      { name: 'van Beek 2012' }
    ]
  },
  iav_cat: {
    name: INDICATOR_NAMES_RELATION.iav_cat,
    description: `Interannual variability measures the average between-year variability of available water supply,
    including both renewable surface and groundwater supplies. Higher values indicate wider variations in available supply from year to year.`,
    sources: [{
      name: 'WRI Aqueduct 2014',
      link: 'https://www.wri.org/publication/aqueduct-global-maps-21-indicators'
    },
    { name: 'NASA GLDAS-2 2012' }
    ]
  },
  sev_cat: {
    name: INDICATOR_NAMES_RELATION.sev_cat,
    description: `Seasonal variability measures the average within-year variability of available water supply, including both renewable surface and groundwater supplies.
    Higher values indicate wider variations of available supply within a year.`,
    sources: [{
      name: 'WRI Aqueduct 2014',
      link: 'https://www.wri.org/publication/aqueduct-global-maps-21-indicators'
    },
    { name: 'NASA GLDAS-2 2012' }
    ]
  },
  drr_cat: {
    name: INDICATOR_NAMES_RELATION.drr_cat,
    description: `Drought risk measures where droughts are likely to occur, the population and assets exposed, and the
    vulnerability of the population and assets to suffering adverse effects. Higher values indicate higher risk of drought.`,
    sources: [{ name: 'Sheffield and Wood 2007' }]
  },
  rfr_cat: {
    name: INDICATOR_NAMES_RELATION.rfr_cat,
    description: `Riverine flood risk measures the percentage of population expected to be affected by riverine
    flooding in an average year, accounting for existing flood protection standards.
    Higher values indicate greater proportion of the population is expected to be impacted by riverine floods.`,
    sources: []
  },
  cfr_cat: {
    name: INDICATOR_NAMES_RELATION.gtd_cat,
    description: `Coastal flood risk measures the percentage of population expected to be affected by coastal flooding in
    an average year, accounting for existing flood protection standards. Higher values indicate greater proportion of the
    population is expected to be impacted by coastal floods.`,
    sources: []
  },
  // Water Quality Risk
  ucw_cat: {
    name: INDICATOR_NAMES_RELATION.ucw_cat,
    description: `Untreated connected wastewater measures the percentage of domestic wastewater that is connected through a
    sewerage system and not treated to at least a primary treatment level.
    Higher values indicate higher percentages of point source wastewater discharged without treatment.`,
    sources: []
  },
  cep_cat: {
    name: INDICATOR_NAMES_RELATION.cep_cat,
    description: `Coastal Eutrophication Potential measures the potential for riverine loadings of nitrogen, phosphorus and
    silica to stimulate harmful algal blooms in coastal waters. Higher values indicate higher levels of excess nutrients with
    respect to silica, creating more favorable conditions for harmful algal growth and eutrophication in coastal waters downstream.`,
    sources: []
  },
  // Regulatory and Reputational
  udw_cat: {
    name: INDICATOR_NAMES_RELATION.udw_cat,
    description: `Unimproved/ no drinking water measures the percentage of the population that relies on drinking water from an unprotected dug well
    or spring, or direct surface water. Higher values indicate areas where people have less access to safe drinking water supplies.`,
    sources: []
  },
  usa_cat: {
    name: INDICATOR_NAMES_RELATION.usa_cat,
    description: `Unimproved/ no sanitation measures the percentage of population using pit latrines without a slab or platform, or a hanging
    or bucket latrine. Higher values indicate areas where people have less access to improved sanitation services.`,
    sources: []
  },
  rri_cat: {
    name: INDICATOR_NAMES_RELATION.rri_cat,
    description: `The RepRisk Index measures environmental, social, and governance (ESG)-related reputational risk. Peak RepRisk Index equals
    the highest level of the RepRisk Index in a given country over the last two years. Higher values indicate higher overall ESG-related risks.`,
    sources: []
  },
  // future
  '5aafeab1-4b48-40b0-9042-f654f1531aaf': {
    name: INDICATOR_NAMES_RELATION['5aafeab1-4b48-40b0-9042-f654f1531aaf'],
    description: `Projected change in water stress shows how development and/or climate change are expected to
      affect water stress, the ratio of water use to supply. The "business as usual" scenario (SSP2 RCP8.5) represents
      a world with stable economic development and steadily rising global carbon emissions.`,
    sources: [{
      name: 'WRI 2015',
      link: 'https://www.wri.org/publication/aqueduct-water-stress-projections-decadal-projections-water-supply-and-demand-using'
    }]
  },
  '45a1f9c5-7b0b-4705-978f-1e98dc8b3277': {
    name: INDICATOR_NAMES_RELATION['45a1f9c5-7b0b-4705-978f-1e98dc8b3277'],
    description: `Projected change in seasonal variability shows how climate change is expected to affect the variability of water supply
      between the months of the year. The "business as usual" scenario (SSP2 RCP8.5) represents a world with stable economic development and
      steadily rising global carbon emissions.`,
    sources: [{
      name: 'WRI 2015',
      link: 'https://www.wri.org/publication/aqueduct-water-stress-projections-decadal-projections-water-supply-and-demand-using'
    }]
  },
  'c124cfce-0414-4cf3-ba2d-e63634199b04': {
    name: INDICATOR_NAMES_RELATION['c124cfce-0414-4cf3-ba2d-e63634199b04'],
    description: `Projected change in water supply shows how climate change is expected to affect water supply.
      The "business as usual" scenario (SSP2 RCP8.5) represents a world with stable economic development and steadily
      rising global carbon emissions.`,
    sources: [{
      name: 'WRI 2015',
      link: 'https://www.wri.org/publication/aqueduct-water-stress-projections-decadal-projections-water-supply-and-demand-using'
    }]
  },
  'a3795c06-d2eb-4aa3-8e24-62965b69e5ce': {
    name: INDICATOR_NAMES_RELATION['a3795c06-d2eb-4aa3-8e24-62965b69e5ce'],
    description: `Projected change in water demand shows how development and/or climate change are expected to affect water demand.
      The "business as usual" scenario (SSP2 RCP8.5) represents a world with stable economic development and steadily rising global carbon emissions.`,
    sources: [{
      name: 'WRI 2015',
      link: 'https://www.wri.org/publication/aqueduct-water-stress-projections-decadal-projections-water-supply-and-demand-using'
    }]
  },
  'd5c8316c-de80-4be3-a973-d3fbafc7eaca': {
    name: INDICATOR_NAMES_RELATION['d5c8316c-de80-4be3-a973-d3fbafc7eaca'],
    description: `Projected change in water stress shows how development and/or climate change are expected to
      affect water stress, the ratio of water use to supply. The "business as usual" scenario (SSP2 RCP8.5) represents
      a world with stable economic development and steadily rising global carbon emissions.`,
    sources: [{
      name: 'WRI 2015',
      link: 'https://www.wri.org/publication/aqueduct-water-stress-projections-decadal-projections-water-supply-and-demand-using'
    }]
  },
  'd7d5fd18-e8e4-4654-b595-7accbb582992': {
    name: INDICATOR_NAMES_RELATION['d7d5fd18-e8e4-4654-b595-7accbb582992'],
    description: `Projected change in seasonal variability shows how climate change is expected to affect the variability of water supply
      between the months of the year. The "business as usual" scenario (SSP2 RCP8.5) represents a world with stable economic development and
      steadily rising global carbon emissions.`,
    sources: [{
      name: 'WRI 2015',
      link: 'https://www.wri.org/publication/aqueduct-water-stress-projections-decadal-projections-water-supply-and-demand-using'
    }]
  },
  'a045b21a-c2ff-4ec5-b7fa-2c1f206b8911': {
    name: INDICATOR_NAMES_RELATION['a045b21a-c2ff-4ec5-b7fa-2c1f206b8911'],
    description: `Projected change in water supply shows how climate change is expected to affect water supply.
      The "business as usual" scenario (SSP2 RCP8.5) represents a world with stable economic development and steadily
      rising global carbon emissions.`,
    sources: [{
      name: 'WRI 2015',
      link: 'https://www.wri.org/publication/aqueduct-water-stress-projections-decadal-projections-water-supply-and-demand-using'
    }]
  },
  'cf7e6a51-3366-42d7-a8ae-ef0f1f11a5f1': {
    name: INDICATOR_NAMES_RELATION.rri_cat,
    description: `Projected change in water demand shows how development and/or climate change are expected to affect water demand.
      The "business as usual" scenario (SSP2 RCP8.5) represents a world with stable economic development and steadily rising global carbon emissions.`,
    sources: [{
      name: 'WRI 2015',
      link: 'https://www.wri.org/publication/aqueduct-water-stress-projections-decadal-projections-water-supply-and-demand-using'
    }]
  }
};

// relates children layers with its parent in a straight way
export const PARENT_CHILDREN_LAYER_RELATION = {
  // Water Quantity Risk
  bws_cat: 'w_awr_def_qan_cat',
  bwd_cat: 'w_awr_def_qan_cat',
  gtd_cat: 'w_awr_def_qan_cat',
  iav_cat: 'w_awr_def_qan_cat',
  sev_cat: 'w_awr_def_qan_cat',
  drr_cat: 'w_awr_def_qan_cat',
  rfr_cat: 'w_awr_def_qan_cat',
  cfr_cat: 'w_awr_def_qan_cat',
  // Water Quality Risk
  ucw_cat: 'w_awr_def_qal_cat',
  cep_cat: 'w_awr_def_qal_cat',
  // Regulatory and Reputational
  udw_cat: 'w_awr_def_rrr_cat',
  usa_cat: 'w_awr_def_rrr_cat',
  rri_cat: 'w_awr_def_rrr_cat'
};

export const INDICATOR_COLUMNS = {
  // common columns for all indicators
  common: [
    { label: 'Country', value: 'country' },
    { label: 'Province', value: 'province' },
    { label: 'Major Basin', value: 'major_basin' },
    { label: 'Minor Basin', value: 'minor_basin' }
  ],
  // Overall Water Risk
  w_awr_def_tot_cat: [{ label: 'Overall Water Risk', value: 'w_awr_def_tot_label' }],
  // Water Quantity Risk
  w_awr_def_qan_cat: [
    { label: 'Water Quantity Risk', value: 'w_awr_def_qan_label' },
    { label: 'Baseline Water Stress', value: 'bwd_label' },
    { label: 'Groundwater Table Decline', value: 'gtd_label' },
    { label: 'Interannual Variability', value: 'iav_label' },
    { label: 'Seasonal Variability', value: 'sev_label' },
    { label: 'Drought Risk', value: 'drr_label' },
    { label: 'Riverine Flood Risk Stress', value: 'rfr_label' },
    { label: 'Coastal Flood Risk', value: 'cfr_label' }
  ],
  // Water Quality Risk
  w_awr_def_qal_cat: [
    { label: 'Water Quality Risk', value: 'w_awr_def_qal_label' },
    { label: 'Untreated Collected Wastewater', value: 'ucw_label' },
    { label: 'Coastal Eutrophication Potential', value: 'cep_label' }
  ],
  // Regulatory and Reputational
  w_awr_def_rrr_cat: [
    { label: 'Regulatory and Reputational', value: 'w_awr_def_rrr_label' },
    { label: 'Unimproved/no drinking water', value: 'udw_label' },
    { label: 'Unimproved/no sanitation', value: 'usa_label' },
    { label: 'RepRisk Index', value: 'rri_label' }
  ],
  projected_change: [
    { label: 'Projected Change In {{indicator}} ({{projection}} To {{year}} {{scenario}} )', value: 'rri_label' }
  ],
  // monthly exclusive
  monthly: {
    bws_cat: [{ label: 'Water Quantity Risk', value: 'bws_cat' }],
    bwd_cat: [{ label: 'Baseline Water Stress', value: 'bwd_cat' }],
    iav_cat: [{ label: 'Interannual Variability', value: 'iav_cat' }]
  }
};

export const INDICATOR_SCHEME_ORDER = [
  'bws_cat', 'bwd_cat', 'gtd_cat', 'iav_cat',
  'sev_cat', 'drr_cat', 'rfr_cat', 'cfr_cat',
  'ucw_cat', 'cep_cat', 'udw_cat', 'usa_cat', 'rri_cat'
];

export const EXCLUSIVE_MONTHLY_INDICATORS = ['bws_cat', 'bwd_cat', 'iav_cat'];

export const DEFAULT_FUTURE_INDICATOR = {
  bs: '5aafeab1-4b48-40b0-9042-f654f1531aaf',
  absolute: 'd5c8316c-de80-4be3-a973-d3fbafc7eaca'
};

export const DEFAULT_FUTURE_YEAR = '2030';

export const FUTURE_INDICATORS_IDS = [...FUTURE_INDICATORS.bs, ...FUTURE_INDICATORS.absolute].map(_indicator => _indicator.id);

export const ANALYZER_LOCATION_INDICATORS = [
  INDICATORS[0],
  ...INDICATORS[0].children,
  {
    name: 'Projected change',
    isFuture: true,
    // this id will change based on user's selection
    id: DEFAULT_FUTURE_INDICATOR.bs
  }
];

export const INDICATORS_MODAL_DEFINITION = {
  title: 'Relevance to Industry',
  description: `
  <ul>
    <li>No weight 0 Not relevant</li>
    <li>Very Low 0.25 Represents very low relevance to the industry</li>
    <li>Low 0.5 Represents low relevance to the industry</li>
    <li>Medium 1 Represents medium relevance to the industry</li>
    <li>High 2 Represents high relevance to the industry</li>
    <li>Very High 4 Represents very high relevance to the industry</li>
  </ul>`
};

export default {
  INDICATORS,
  FUTURE_INDICATORS,
  PARENT_CHILDREN_LAYER_RELATION,
  INDICATOR_COLUMNS,
  INDICATOR_NAMES_RELATION,
  INDICATOR_DESCRIPTIONS,
  INDICATOR_SCHEME_ORDER,
  EXCLUSIVE_MONTHLY_INDICATORS,
  DEFAULT_FUTURE_INDICATOR,
  DEFAULT_FUTURE_YEAR,
  FUTURE_INDICATORS_IDS,
  ANALYZER_LOCATION_INDICATORS,
  INDICATORS_MODAL_DEFINITION
};
