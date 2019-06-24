// utils
import { WRIAPI } from 'utils/axios';

/**
 * fetchs geocoding to transform local addresses in lat/lng values.
 *
 * @param {Object} file - file containing addresses.
 * @returns [Object] - array with addresses containgin lat/lng.
 */

export const fetchGeocoding = file =>
  WRIAPI.post('/aqueduct/analysis/geocoding',
    file,
    {
      transformResponse: [].concat(
        WRIAPI.defaults.transformResponse,
        ({ rows }) => rows
      )
    }

  )
    .then((response) => {
      const { status, statusText, data } = response;
      if (status >= 300) throw new Error(statusText);
      return data;
    });

export default { fetchGeocoding };
