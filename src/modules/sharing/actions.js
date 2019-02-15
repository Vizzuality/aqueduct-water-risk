import { createAction, createThunkAction } from 'redux-tools';

// services
import { fetchShortUrl } from 'services/sharing';

export const setUrl = createAction('SHARING__SET-URL');
export const setLoading = createAction('SHARING__SET-LOADING');
export const setError = createAction('SHARING__SET-ERROR');

export const getShareUrl = createThunkAction('SHARING__GET-SHARE-URL',
  longUrl => (dispatch) => {
    dispatch(setError(null));
    dispatch(setLoading(true));

    fetchShortUrl(longUrl)
      .then(({ url }) => {
        dispatch(setUrl(url));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        dispatch(setError(error));
        dispatch(setLoading(false));
      });
  });

export default {
  setUrl,
  setLoading,
  setError,
  getShareUrl
};
