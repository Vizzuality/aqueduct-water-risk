
export const toGeoJson = ({ lat, lng }) => {
  return {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Point',
      coordinates: [lat, lng]
    }
  };
};

export const toGeoJsonCollection = (points) => {
  return {
    geojson: {
      type: 'FeatureCollection',
      features: points.map(p => toGeoJson(p))
    }
  };
};

// TO-DO: this function will replace toGeoJsonCollection function when service is ready
export const futureToGeoJsonCollection = (points) => {
  return {
    geojson: {
      type: 'FeatureCollection',
      features: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'MultiPoint',
          coordinates: points.map(({ lat, lng }) => ([lat, lng]))
        }
      }
    }
  };
};

export default {
  toGeoJson,
  toGeoJsonCollection,
  futureToGeoJsonCollection
};
