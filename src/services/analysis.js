// utils
import { WRIAPI } from 'utils/axios';

/**
 * fetchs analysis based on certain params.
 *
 * @param {Object} id - params sent to the endpoint.
 * @returns [Object] - array with analysis results.
 */

export const fetchAnalysis = params =>
  WRIAPI.post('/aqueduct/analysis', params)
    .then((response) => {
      const { status, statusText, data } = response;
      if (status >= 300) throw new Error(statusText);
      return data;
    });

export default { fetchAnalysis };
