
function toGeoJson({ lat, lng }) {
  return {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Point',
      coordinates: [lat, lng]
    }
  };
}

function toGeoJsonCollection(points) {
  return {
    geojson: {
      type: 'FeatureCollection',
      features: points.map(p => toGeoJson(p))
    }
  };
}

export { toGeoJson, toGeoJsonCollection };
