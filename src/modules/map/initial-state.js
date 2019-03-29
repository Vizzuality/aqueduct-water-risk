import { BASEMAPS } from 'components/map/constants';

export default {
  loading: true,
  zoom: 3,
  center: {
    lat: 30,
    lng: -80
  },
  basemap: BASEMAPS.osm.id,
  layerParametrization: { opacity: 1 },
  popup: {
    latlng: null,
    data: {}
  }
};
