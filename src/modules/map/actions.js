import { createAction } from 'redux-tools';

export const setMapLocation = createAction('MAP__SET-LOCATION-PARAMS');
export const setLoading = createAction('MAP__SET-LOADING');
export const setBasemap = createAction('MAP__SET-BASEMAP');
export const setLayerParametrization = createAction('MAP__SET-LAYER-PARAMETRIZATION');
export const setPopup = createAction('MAP__SET-POPUP');

export default {
  setLoading,
  setMapLocation,
  setBasemap,
  setLayerParametrization,
  setPopup
};
