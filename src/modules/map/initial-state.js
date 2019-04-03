import { BASEMAPS } from 'components/map/constants';

export default {
  loading: true,
  zoom: 3,
  center: {
    lat: 30,
    lng: -80
  },
  basemap: BASEMAPS.hydro.id,
  layerParametrization: { opacity: 0.5 },
  popup: {
    latlng: null,
    data: {}
  }
};
