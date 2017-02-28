import { replace } from 'react-router-redux';

function updateUrl() {
  return (storeDispatch, getState) => {
    const { map, mapView } = getState();
    const { year, scenario, timeScale, geoScale } = mapView.filters;
    const { layers } = mapView;

    const locationDescriptor = {
      pathname: '/',
      query: {
        lat: map.latLng.lat.toFixed(2),
        lng: map.latLng.lng.toFixed(2),
        zoom: map.zoom,
        year,
        scenario,
        timeScale,
        geoScale,
        layers: layers.active
      }
    };
    storeDispatch(replace(locationDescriptor));
  };
}

export { updateUrl };
