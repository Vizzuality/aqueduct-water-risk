import { createAction } from 'redux-tools';

export const setList = createAction('LAYERS__SET-LIST');
export const setLoading = createAction('LAYERS__SET-LOADING');
export const setError = createAction('LAYERS__SET-ERROR');

export default {
  setList,
  setLoading,
  setError
};
