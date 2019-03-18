export const toGeoJsonCollection = (points) => {
  return {
    geojson: {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'MultiPoint',
          coordinates: points.map(({ lat, lng }) => ([lat, lng]))
        }
      }]
    }
  };
};

export default { toGeoJsonCollection };
