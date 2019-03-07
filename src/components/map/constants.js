export const MAP_OPTIONS = {
  detectRetina: true,
  minZoom: 2,
  maxZoom: 15
};

export const BASEMAPS = {
  // Open Street Maps
  osm: {
    id: 'osm',
    value: process.env.BASEMAP_TILE_URL,
    label: 'Default',
    options: { attribution: '&copy; <a href="http://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>' }
  },
  satellite: {
    id: 'satellite',
    value: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    label: 'Satellite',
    options: { attribution: '&copy; <a href="https://www.google.com/maps/@15,-2.970703,3z?hl=es" target="_blank">Google</a>' }
  },
  terrain: {
    id: 'terrain',
    value: 'https://api.mapbox.com/styles/v1/resourcewatch/cjhqi456h02pg2rp6w2mwp61c/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjajFlcXZhNzcwMDBqMzNzMTQ0bDN6Y3U4In0.FRcIP_yusVaAy0mwAX1B8w',
    label: 'Terrain',
    options: { attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank">© Mapbox</a> <a href="http://www.openstreetmap.org/about/" target="_blank">© OpenStreetMap</a>' }
  }
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

export const LEGENDS = {
  parent: {
    items: [
      {
        color: '#FFFF99',
        name: 'Low'
      },
      {
        color: '#FFE600',
        name: 'Low to medium'
      },
      {
        color: '#FF9900',
        name: 'Medium'
      },
      {
        color: '#FF1900',
        name: 'Medium to high'
      },
      {
        color: '#990000',
        name: 'High'
      },
      {
        color: '#808080',
        name: 'Arid & low water use'
      },
      {
        color: '#4E4E4E',
        name: 'No data'
      }
    ],
    type: 'choropleth'
  },
  child: {
    items: [
      {
        color: '#FFFF99',
        name: 'Low'
      },
      {
        color: '#FFE600',
        name: 'Low to medium'
      },
      {
        color: '#FF9900',
        name: 'Medium to high'
      },
      {
        color: '#FF1900',
        name: 'High'
      },
      {
        color: '#990000',
        name: 'Extremely high'
      },
      {
        color: '#808080',
        name: 'Arid & low water use'
      },
      {
        color: '#4E4E4E',
        name: 'No data'
      }
    ],
    type: 'choropleth'
  }
};

export default {
  MAP_OPTIONS,
  BASEMAP_CONFIG,
  LABEL_LAYER_CONFIG,
  LEGENDS
};
