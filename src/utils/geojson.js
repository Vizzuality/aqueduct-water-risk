export const toGeoJsonCollection = (points, properties = {}) => {
  return {
    geojson: {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties,
        geometry: {
          type: 'MultiPoint',
          coordinates: points.map(({ lat, lng }) => ([lng, lat]))
        }
      }]
    }
  };
};

export default { toGeoJsonCollection };
