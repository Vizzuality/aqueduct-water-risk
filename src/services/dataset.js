import WRISerializer from 'wri-json-api-serializer';

// utils
import { WRIAPI } from 'utils/axios';

/**
 * fetchs layers for a specific dataset.
 *
 * @param {String} id - dataset id.
 * @returns {Object} serialized layers.
 */

export const fetchLayersfromDataset = (id, params = {}) =>
  WRIAPI.get(`/dataset/${id}/layer`, { params })
    .then((response) => {
      const { status, statusText, data } = response;
      if (status >= 400) throw new Error(statusText);
      return WRISerializer(data);
    });

export default { fetchLayersfromDataset };
