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
    label: 'Light',
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
  },
  hydro: {
    id: 'hydro',
    value: 'https://api.mapbox.com/styles/v1/resourcewatch/cjtr6fhr3060g1fok829tfwm7/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicmVzb3VyY2V3YXRjaCIsImEiOiJjajFlcXZhNzcwMDBqMzNzMTQ0bDN6Y3U4In0.FRcIP_yusVaAy0mwAX1B8w',
    label: 'Hydrography',
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

const COMMON_LEGEND_ITEMS = [
  {
    color: '#FFFF99',
    name: 'Low',
    value: '(<10%)'
  },
  {
    color: '#FFE600',
    name: 'Low - Medium',
    value: '(10-20%)'
  },
  {
    color: '#FF9900',
    name: 'Medium - High',
    value: '(20-40%)'
  },
  {
    color: '#FF1900',
    name: 'High',
    value: '(40-80%)'
  },
  {
    color: '#990000',
    name: 'Extremely High',
    value: '(>80%)'
  }
];

const NO_DATA_LEGEND_ITEM = {
  color: '#4E4E4E',
  name: 'No data'
};


export const LEGENDS = {
  parent: {
    items: [
      {
        color: '#FFFF99',
        name: 'Low',
        value: '(0-1)'
      },
      {
        color: '#FFE600',
        name: 'Low - Medium',
        value: '(1-2)'
      },
      {
        color: '#FF9900',
        name: 'Medium',
        value: '(2-3)'
      },
      {
        color: '#FF1900',
        name: 'Medium - High',
        value: '(3-4)'
      },
      {
        color: '#990000',
        name: 'High',
        value: '(4-5)'
      }
    ],
    disclaimer: [NO_DATA_LEGEND_ITEM],
    type: 'choropleth'
  },
  arid: {
    items: COMMON_LEGEND_ITEMS,
    disclaimer: [
      {
        color: '#808080',
        name: 'Arid & Low Water Use'
      },
      NO_DATA_LEGEND_ITEM
    ],
    type: 'choropleth'
  },
  gtd_cat: {
    items: COMMON_LEGEND_ITEMS,
    disclaimer: [
      {
        color: '#4E4E4E',
        name: 'Insignificant Trend'
      }
    ],
    type: 'choropleth'
  },
  ucw_cat: {
    items: [COMMON_LEGEND_ITEMS],
    disclaimer: [
      {
        color: '#808080',
        name: 'Low - No Wastewater Collected'
      },
      NO_DATA_LEGEND_ITEM
    ],
    type: 'choropleth'
  },
  flood: {
    items: COMMON_LEGEND_ITEMS,
    disclaimer: [NO_DATA_LEGEND_ITEM],
    type: 'choropleth'
  },
  common: {
    items: COMMON_LEGEND_ITEMS,
    disclaimer: [NO_DATA_LEGEND_ITEM],
    type: 'choropleth'
  }
};

export const HYDRO_LAYER = '0f573be8-71a9-46c1-bee4-a3909212cecc';
export const AQUIFER_LAYER = '728cda48-5164-4c1f-a626-12e527db5874';

export default {
  MAP_OPTIONS,
  BASEMAP_CONFIG,
  LABEL_LAYER_CONFIG,
  LEGENDS,
  HYDRO_LAYER,
  AQUIFER_LAYER
};
