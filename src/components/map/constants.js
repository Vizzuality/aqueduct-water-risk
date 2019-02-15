export const MAP_OPTIONS = {
  detectRetina: true,
  minZoom: 2,
  maxZoom: 15
};

export const BASEMAP_CONFIG = {
  url: process.env.BASEMAP_TILE_URL,
  options: { attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>' }
};

export const LABEL_LAYER_CONFIG = {
  url: process.env.BASEMAP_LABEL_URL,
  options: { attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>' }
};

export const MARKER_LAYER = {
  id: 'analysis-points',
  provider: 'leaflet',
  layerConfig: {
    body: [],
    parse: false,
    type: 'featureGroup'
  },
  legendConfig: {}
};

export default {
  MAP_OPTIONS,
  BASEMAP_CONFIG,
  LABEL_LAYER_CONFIG
};
