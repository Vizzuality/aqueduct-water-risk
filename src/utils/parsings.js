/* sqlParams parsing */
function sqlParamsParse(layers, paramsMap) {
  let stringLayers = JSON.stringify(layers);
  Object.keys(paramsMap).forEach((field) => {
    stringLayers = stringLayers.replace(new RegExp(`{{${field}}}`, 'gi'), paramsMap[field]);
  });
  return JSON.parse(stringLayers);
}

export { sqlParamsParse };
