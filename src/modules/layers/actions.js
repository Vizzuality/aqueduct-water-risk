import { createAction, createThunkAction } from 'redux-tools';
import axios from 'axios';

// service
import { fetchLayersfromDataset } from 'services/dataset';

// utils
import { DATASET_DICTIONARY } from 'utils/dataset';

export const setList = createAction('LAYERS__SET-LIST');
export const setDataset = createAction('LAYERS__SET-DATASET');
export const setLoading = createAction('LAYERS__SET-LOADING');
export const setError = createAction('LAYERS__SET-ERROR');

export const getLayers = createThunkAction('LAYERS__GET-LAYERS',
  () => (dispatch) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    // sets all fetchs in an array
    const fetchs = Object.keys(DATASET_DICTIONARY).map(_key => fetchLayersfromDataset([DATASET_DICTIONARY[_key]]));

    // waits for all fetchs to finish
    axios.all(fetchs)
      .then(axios.spread((annual, monthly, projected, weights, custom) => {
        const layers = {
          annual,
          monthly,
          projected,
          weights,
          custom
        };

        dispatch(setList(layers));
        dispatch(setLoading(false));
      }))
      .catch((err) => {
        dispatch(setError(err));
        dispatch(setLoading(false));
      });
  });

export default {
  setList,
  setDataset,
  setLoading,
  setError,
  getLayers
};
