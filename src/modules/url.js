import { dispatch } from 'main';
import { replace } from 'react-router-redux';
import { setMapLocation } from 'modules/map/actions';
import { setFilters, setPonderation } from 'modules/mapView';
import { setScope } from 'modules/scope';
import { fetchFromGeostore, setGeostoreId } from 'modules/analyzeLocations';

function updateUrl() {
  return (storeDispatch, getState) => {
    const { map, mapView, scope, analyzeLocations } = getState();
    const { year, scenario, timeScale, projection, month, indicator } = mapView.filters;
    const { ponderation } = mapView;
    const { points } = analyzeLocations;

    const locationDescriptor = {
      pathname: '/',
      query: {
        lat: map.center.lat.toFixed(2),
        lng: map.center.lng.toFixed(2),
        zoom: map.zoom,
        year,
        scenario,
        timeScale,
        month,
        projection,
        indicator,
        // layers: (Array.isArray(layers.active)) ? layers.active.join(',') : layers.active,
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
      ...(location.query.lat && location.query.lng) && {
        center: {
          lat: +location.query.lat,
          lng: +location.query.lng
        }
      }
    };
    dispatch(setMapLocation(map));
  }
  if (location.query.year) {
    const { year, scenario, timeScale, projection, month, indicator } = location.query;
    dispatch(setFilters({
      year,
      scenario,
      timeScale,
      month,
      projection,
      indicator
    }));
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
