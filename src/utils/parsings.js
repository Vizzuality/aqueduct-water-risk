/* sqlParams parsing */
function sqlParamsParse(layers, paramsMap) {
  let stringLayers = JSON.stringify(layers);
  Object.keys(paramsMap).forEach((field) => {
    stringLayers = stringLayers.replace(new RegExp(`{{${field}}}`, 'gi'), paramsMap[field]);
  });
  return JSON.parse(stringLayers);
}

function defaultKeyParse(indicator) {
  return {
    overall_water_risk: '_default',
    physical_risk_quantity: 'def_pquant',
    physical_risk_quality: 'def_pqual',
    regulatory_and_reputational_risk: 'def_regrep'
  }[indicator];
}

export { sqlParamsParse, defaultKeyParse };
