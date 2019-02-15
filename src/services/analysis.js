// utils
import { WRIAPI } from 'utils/axios';

/**
 * fetchs layers for a specific dataset.
 *
 * @param {String} id - dataset id.
 * @returns {Object} serialized layers.
 */

export const fetchAnalysis = params =>
  WRIAPI.get('/aqueduct/analysis', { params })
    .then((response) => {
      const { status, statusText, data } = response;
      if (status >= 400) throw new Error(statusText);
      return data;
    });

export default { fetchAnalysis };
