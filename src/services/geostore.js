import WRISerializer from 'wri-json-api-serializer';

// utils
import { WRIAPI } from 'utils/axios';
import { toGeoJsonCollection } from 'utils/geojson';

/**
 * fetchs a geostore
 *
 * @param {String} id - id of the geostore to fetch
 * @returns {Object} serialized geostore.
 */

export const fetchGeostore = id =>
  WRIAPI.get(`/geostore/${id}`)
    .then((response) => {
      const { status, statusText, data } = response;
      if (status >= 400) throw new Error(statusText);
      return WRISerializer(data);
    });

/**
 * saves a geostore
 *
 * @param {String} points - array of points that determines the geostore
 * @returns {Object} serialized geostore.
 */

export const saveGeostore = (points, properties) =>
  WRIAPI.post('/geostore', toGeoJsonCollection(points, properties))
    .then((response) => {
      const { status, statusText, data } = response;
      if (status >= 400) throw new Error(statusText);
      return WRISerializer(data);
    });

export default {
  fetchGeostore,
  saveGeostore
};
