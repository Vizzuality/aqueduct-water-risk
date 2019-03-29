import { createAction, createThunkAction } from 'redux-tools';
import { replace } from 'react-router-redux';

// actions
import { setMapLocation, setLayerParametrization } from 'modules/map/actions';
import { setFilters, setPonderation } from 'modules/map-view-tab/actions';
import { setGeostore, getGeostore } from 'modules/analyze-locations-tab/actions';

// constants
import { INDICATOR_SCHEME_ORDER } from 'constants/indicators';

export const setScope = createAction('APP__SET-SCOPE');
export const setAdvancedMode = createAction('APP__SET-ADVANCED-MODE');

export const updateUrl = createThunkAction('APP__UPDATE-URL', () =>
  (dispatch, getState) => {
    const {
      map,
      mapView,
      app: { scope, advanced },
      analyzeLocations: { geostore: { id } }
    } = getState();
    const { year, scenario, timeScale, projection, month, indicator } = mapView.filters;
    const { ponderation: { scheme, custom } } = mapView;
    const {
      basemap,
      center: { lat, lng },
      zoom,
      layerParametrization: { opacity }
    } = map;

    const locationDescriptor = {
      pathname: '/',
      query: {
        basemap,
        lat: lat.toFixed(2),
        lng: lng.toFixed(2),
        zoom,
        opacity,
        year,
        scenario,
        timeScale,
        month,
        projection,
        indicator,
        ponderation: scheme,
        ...scheme === 'custom' && { ponderation_values: `[${Object.values(custom).toString()}]` },
        scope,
        advanced,
        ...id && { geoStore: id }
      }
    };

    dispatch(replace(locationDescriptor));
  });

export const onEnterMapPage = createThunkAction('APP__MAP-PAGE-HOOK', ({ params, done }) =>
  (dispatch) => {
    const { location } = params;

    if (location.query.zoom) {
      const map = {
        basemap: location.query.basemap,
        zoom: +location.query.zoom,
        ...(location.query.lat && location.query.lng) && {
          center: {
            lat: +location.query.lat,
            lng: +location.query.lng
          }
        }
      };
      dispatch(setMapLocation(map));
      dispatch(setLayerParametrization({
        ...location.query.opacity && { opacity: location.query.opacity }
      }));
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
    if (location.query.ponderation_values) {
      const parsedValues = decodeURIComponent(location.query.ponderation_values).slice(1, location.query.ponderation_values.length - 1).split(',');
      const custom = parsedValues.reduce((acc, value, index) => {
        const indicator = INDICATOR_SCHEME_ORDER[index];
        return ({ ...acc, [indicator]: value });
      }, {});

      dispatch(setPonderation({ custom }));
    }
    if (location.query.advanced) dispatch(setAdvancedMode(location.query.advanced === 'true'));
    if (location.query.scope) dispatch(setScope(location.query.scope));
    if (location.query.geoStore) {
      dispatch(setGeostore(location.query.geoStore));
      dispatch(getGeostore(location.query.geoStore));
    }

    done();
  });

export default {
  setScope,
  setAdvancedMode,
  updateUrl,
  onEnterMapPage
};
