const INDICATOR_COLUMNS = {
  overall_water_risk: [
    { label: 'Basin', value: 'basinid' },
    { label: 'Water Risk', value: 'water_risk' }
  ],
  physical_risk_quantity: [
    { label: 'Water Stress', value: 'water_stress' },
    { label: 'Interannual Variability', value: 'interannual_variability' },
    { label: 'Seasonal Variability', value: 'seasonal_variability' },
    { label: 'Flood Occurrence', value: 'flood_occurrence' },
    { label: 'Drought Severity', value: 'drought_severity' },
    { label: 'Upstream Storage', value: 'upstream_storage' },
    { label: 'Groundwater Stress', value: 'groundwater_stress' }
  ],
  physical_risk_quality: [
    { label: 'Return Flow Ratio', value: 'return_flow_ratio' },
    { label: 'Upstream Protected Land', value: 'upstream_protected_land' }
  ],
  regulatory_and_reputational_risk: [
    { label: 'Media Coverage', value: 'media_coverage' },
    { label: 'Access to Water', value: 'access_to_water' },
    { label: 'Threatened Amphibians', value: 'threatened_amphibians' }
  ],
  // projected_change
  999191: []
};

const INDICATOR_SCHEME_ORDER = [
  'water_stress', 'interannual_variability', 'seasonal_variability', 'flood_occurrence',
  'drought_severity', 'upstream_storage', 'groundwater_stress', 'return_flow_ratio',
  'upstream_protected_land', 'media_coverage', 'access_to_water', 'threatened_amphibians'
];

export { INDICATOR_COLUMNS, INDICATOR_SCHEME_ORDER };
