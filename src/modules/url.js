import { dispatch } from 'main';
import { replace } from 'react-router-redux';
import { setMapLocation } from 'modules/map';
import { setFilters, setActiveLayers, setPonderation } from 'modules/mapView';
import { setScope } from 'modules/scope';
import { fetchFromGeostore, setGeostoreId } from 'modules/analyseLocations';

function updateUrl() {
  return (storeDispatch, getState) => {
    const { map, mapView, scope, analyseLocations } = getState();
    const { year, scenario, timeScale, geoScale, projection } = mapView.filters;
    const { layers, ponderation } = mapView;
    const { points } = analyseLocations;

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
        projection,
        layers: layers.active.join(','),
        ponderation: ponderation.scheme,
        scope: scope.name,
        geoStore: points.geoStore
      }
    };
    storeDispatch(replace(locationDescriptor));
  };
}

function onEnterMapPage({ location }, replaceUrl, done) {
  // TODO: this check is not as consistent as it should be. The right solution could be grouping all map params inside "map"
  // if there are map position params
  if (location.query.zoom) {
    const map = {
      zoom: +location.query.zoom,
      latLng: {
        lat: +location.query.lat,
        lng: +location.query.lng
      }
    };
    dispatch(setMapLocation(map));
  }
  if (location.query.year) {
    const { year, scenario, timeScale, geoScale, projection } = location.query;
    dispatch(setFilters({
      year,
      scenario,
      timeScale,
      geoScale,
      projection
    }));
  }
  if (location.query.layers) {
    dispatch(setActiveLayers(location.query.layers.split(',')));
  }
  if (location.query.ponderation) {
    dispatch(setPonderation({ scheme: location.query.ponderation }));
  }
  if (location.query.scope) {
    dispatch(setScope(location.query.scope));
  }
  if (location.query.geoStore) {
    dispatch(setGeostoreId(location.query.geoStore));
    dispatch(fetchFromGeostore(location.query.geoStore));
  }

  done();
}

export { updateUrl, onEnterMapPage };
