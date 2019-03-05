import { createAction } from 'redux-tools';

export const setMapLocation = createAction('MAP__SET-LOCATION-PARAMS');
export const setBasemap = createAction('MAP__SET-BASEMAP');
export const setLayerParametrization = createAction('MAP__SET-LAYER-PARAMETRIZATION');
export const setPopup = createAction('MAP__SET-POPUP');
export const clearPopup = createAction('MAP__CLEAR-POPUP');

export default {
  setMapLocation,
  setBasemap,
  setLayerParametrization,
  setPopup,
  clearPopup
};
