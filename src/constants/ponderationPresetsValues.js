const WEIGHT_SCHEME_ORDER = [
  'water_stress', 'interannual_variability', 'seasonal_variability', 'flood_occurrence',
  'drought_severity', 'upstream_storage', 'groundwater_stress', 'return_flow_ratio',
  'upstream_protected_land', 'media_coverage', 'access_to_water', 'threatened_amphibians'
];

const WEIGHT_COLUMNS = [
  { label: 'Access to Water', value: 'access_to_water' },
  { label: 'Basin', value: 'basinid' },
  { label: 'Drought Severity', value: 'drought_severity' },
  { label: 'Flood Occurrence', value: 'flood_occurrence' },
  { label: 'Groundwater Stress', value: 'groundwater_stress' },
  { label: 'Interannual Variability', value: 'interannual_variability' },
  { label: 'Media Coverage', value: 'media_coverage' },
  { label: 'Return Flow Ratio', value: 'return_flow_ratio' },
  { label: 'Seasonal Variability', value: 'seasonal_variability' },
  { label: 'Threatened Amphibians', value: 'threatened_amphibians' },
  { label: 'Upstream Protected Land', value: 'upstream_protected_land' },
  { label: 'Upstream Storage', value: 'upstream_storage' },
  { label: 'Water Risk', value: 'water_risk' },
  { label: 'Water Stress', value: 'water_stress' }
];

const ponderationValues = {
  default: {
    media_coverage: 4,
    access_to_water: 1,
    threatened_amphibians: 0.5,
    return_flow_ratio: 1,
    upstream_protected_land: 1,
    water_stress: 2,
    interannual_variability: 2,
    seasonal_variability: 1,
    flood_occurrence: 0.5,
    drought_severity: 1,
    upstream_storage: 2,
    groundwater_stress: 0.5
  },
  w_agr: {
    media_coverage: 4,
    access_to_water: 2,
    threatened_amphibians: 0.5,
    return_flow_ratio: 1,
    upstream_protected_land: 2,
    water_stress: 2,
    interannual_variability: 2,
    seasonal_variability: 0.5,
    flood_occurrence: 0.25,
    drought_severity: 0.25,
    upstream_storage: 2,
    groundwater_stress: 1
  },
  w_power: {
    media_coverage: 4,
    access_to_water: 1,
    threatened_amphibians: 2,
    return_flow_ratio: 1,
    upstream_protected_land: 4,
    water_stress: 1,
    interannual_variability: 1,
    seasonal_variability: 0.15,
    flood_occurrence: null,
    drought_severity: 0.5,
    upstream_storage: 0.5,
    groundwater_stress: 2
  },
  w_semico: {
    media_coverage: 4,
    access_to_water: 1,
    threatened_amphibians: 1,
    return_flow_ratio: 1,
    upstream_protected_land: 1,
    water_stress: 2,
    interannual_variability: 2,
    seasonal_variability: 4,
    flood_occurrence: 2,
    drought_severity: 2,
    upstream_storage: 1,
    groundwater_stress: 2
  },
  w_oilgas: {
    media_coverage: 1,
    access_to_water: 0.5,
    threatened_amphibians: 0.5,
    return_flow_ratio: 0.5,
    upstream_protected_land: 1,
    water_stress: 1,
    interannual_variability: 4,
    seasonal_variability: 0.25,
    flood_occurrence: null,
    drought_severity: 4,
    upstream_storage: 4,
    groundwater_stress: 1
  },
  w_chem: {
    media_coverage: 2,
    access_to_water: 1,
    threatened_amphibians: 1,
    return_flow_ratio: 1,
    upstream_protected_land: 4,
    water_stress: 1,
    interannual_variability: 2,
    seasonal_variability: 2,
    flood_occurrence: 0.5,
    drought_severity: 4,
    upstream_storage: 4,
    groundwater_stress: 2
  },
  w_mine: {
    media_coverage: 4,
    access_to_water: 1,
    threatened_amphibians: 1,
    return_flow_ratio: 4,
    upstream_protected_land: 0.5,
    water_stress: 1,
    interannual_variability: 4,
    seasonal_variability: 1,
    flood_occurrence: 0.25,
    drought_severity: 4,
    upstream_storage: 4,
    groundwater_stress: 1
  },
  w_foodbv: {
    media_coverage: 2,
    access_to_water: 1,
    threatened_amphibians: 0.5,
    return_flow_ratio: 0.5,
    upstream_protected_land: 1,
    water_stress: 2,
    interannual_variability: 1,
    seasonal_variability: 2,
    flood_occurrence: 1,
    drought_severity: 2,
    upstream_storage: 1,
    groundwater_stress: 0.5
  },
  w_constr: {
    media_coverage: 4,
    access_to_water: 1,
    threatened_amphibians: 0.5,
    return_flow_ratio: 1,
    upstream_protected_land: 1,
    water_stress: 2,
    interannual_variability: 2,
    seasonal_variability: 1,
    flood_occurrence: 0.5,
    drought_severity: 0.5,
    upstream_storage: 1,
    groundwater_stress: 0.25
  },
  w_tex: {
    media_coverage: 4,
    access_to_water: 1,
    threatened_amphibians: 0.5,
    return_flow_ratio: 1,
    upstream_protected_land: 1,
    water_stress: 2,
    interannual_variability: 2,
    seasonal_variability: 2,
    flood_occurrence: 0.5,
    drought_severity: 1,
    upstream_storage: 2,
    groundwater_stress: 0.5
  }
};

export { WEIGHT_SCHEME_ORDER, WEIGHT_COLUMNS, ponderationValues };
