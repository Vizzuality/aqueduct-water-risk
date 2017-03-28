
function defaultKeyParse(indicator) {
  return {
    overall_water_risk: '_default',
    physical_risk_quantity: 'def_pquant',
    physical_risk_quality: 'def_pqual',
    regulatory_and_reputational_risk: 'def_regrep'
  }[indicator];
}

/* sqlParams parsing */
function sqlParamsParse(layers, config) {
  const { custom } = config.ponderation;
  const customWeights = [custom.water_stress, custom.interannual_variability, custom.seasonal_variability, custom.flood_occurrence, custom.drought_severity, custom.upstream_storage,
    custom.groundwater_stress, custom.return_flow_ratio, custom.upstream_protected_land, custom.media_coverage, custom.access_to_water, custom.threatened_amphibians];

  let { scheme } = config.ponderation;
  const indicator = config.layers.active;
  scheme = scheme === 'default' ? defaultKeyParse(indicator) : scheme;

  // TODO: add REAL parsing for "indicators layer"
  const paramsMap = {
    weight_indicator: scheme,
    indicator: config.layers.active[0],
    scenario: 'historic',
    period_type: 'year',
    period_value: 0,
    year: '2014',
    data_type: 'absolute',
    custom_weights: JSON.stringify(customWeights)
  };

  let stringLayers = JSON.stringify(layers);

  // TODO: iterate over paramsConfig
  Object.keys(paramsMap).forEach((field) => {
    stringLayers = stringLayers.replace(new RegExp(`{{${field}}}`, 'gi'), paramsMap[field]);
  });
  return JSON.parse(stringLayers);
}

export { sqlParamsParse, defaultKeyParse };
