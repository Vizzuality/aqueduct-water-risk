import { createAction, createThunkAction } from 'redux-tools';
import { replace } from 'react-router-redux';

// actions
import { setMapLocation } from 'modules/map/actions';
import { setFilters, setPonderation } from 'modules/map-view-tab/actions';
import { fetchFromGeostore, setGeostoreId } from 'modules/analyzeLocations';

export const setScope = createAction('APP__SET-SCOPE');

export const updateUrl = createThunkAction('APP__UPDATE-URL', () =>
  (dispatch, getState) => {
    const {
      map,
      mapView,
      app: { scope },
      analyzeLocations
    } = getState();
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
        ponderation: ponderation.scheme,
        scope,
        geoStore: points.geoStore
      }
    };

    dispatch(replace(locationDescriptor));
  });

export const onEnterMapPage = createThunkAction('APP__MAP-PAGE-HOOK', ({ params, done }) =>
  (dispatch) => {
    const { location } = params;

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

    if (location.query.ponderation) dispatch(setPonderation({ scheme: location.query.ponderation }));
    if (location.query.scope) dispatch(setScope(location.query.scope));
    if (location.query.geoStore) {
      dispatch(setGeostoreId(location.query.geoStore));
      dispatch(fetchFromGeostore(location.query.geoStore));
    }

    done();
  });

export default {
  setScope,
  updateUrl,
  onEnterMapPage
};
