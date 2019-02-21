import { createAction } from 'redux-tools';

export const setMapLocation = createAction('MAP__SET-PARAMS');
export const setLayerParametrization = createAction('MAP__SET-LAYER-PARAMETRIZTION');

export default {
  setMapLocation,
  setLayerParametrization
};
