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
  rri_cat: 'w_awr_def_rrr_cat',
  // monthly exclusive
};

export const INDICATOR_COLUMNS = {
  // common columns for all indicators
  common: [
    { label: 'Name', value: '' },
    { label: 'Country', value: '' },
    { label: 'River Basin', value: '' }
  ],
  // Overall Water Risk
  w_awr_def_tot_cat: [{ label: 'Overall Water Risk', value: 'w_awr_def_tot_cat' }],
  // Water Quantity Risk
  w_awr_def_qan_cat: [
    { label: 'Water Quantity Risk', value: 'bws_cat' },
    { label: 'Baseline Water Stress', value: 'bwd_cat' },
    { label: 'Groundwater Table Decline', value: 'gtd_cat' },
    { label: 'Interannual Variability', value: 'iav_cat' },
    { label: 'Seasonal Variability', value: 'sev_cat' },
    { label: 'Drought Risk', value: 'drr_cat' },
    { label: 'Riverine Flood Risk Stress', value: 'rfr_cat' },
    { label: 'Coastal Flood Risk', value: 'cfr_cat' }
  ],
  // Water Quality Risk
  w_awr_def_qal_cat: [
    { label: 'Water Quality Risk', value: 'w_awr_def_qal_cat' },
    { label: 'Untreated Collected Wastewater', value: 'ucw_cat' },
    { label: 'Coastal Eutrophication Potential', value: 'cep_cat' }
  ],
  // Regulatory and Reputational
  w_awr_def_rrr_cat: [
    { label: 'Regulatory and Reputational', value: 'w_awr_def_rrr_cat' },
    { label: 'Unimproved/no drinking water', value: 'udw_cat' },
    { label: 'Unimproved/no sanitation', value: 'usa_cat' },
    { label: 'RepRisk Index', value: 'rri_cat' }
  ],
  projected_change: [
    { label: 'Projected Change In {{indicator}} ({{projection}} To {{year}} {{scenario}} )', value: 'rri_cat' }
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

export default {
  INDICATORS,
  FUTURE_INDICATORS,
  PARENT_CHILDREN_LAYER_RELATION,
  INDICATOR_COLUMNS,
  INDICATOR_SCHEME_ORDER,
  EXCLUSIVE_MONTHLY_INDICATORS,
  DEFAULT_FUTURE_INDICATOR,
  DEFAULT_FUTURE_YEAR,
  FUTURE_INDICATORS_IDS,
  ANALYZER_LOCATION_INDICATORS
};
