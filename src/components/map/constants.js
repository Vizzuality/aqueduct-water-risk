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
    options: {
      attribution: '<a href="https://www.mapbox.com/about/maps/" target="_blank" rel="noopener noreferrer">© Mapbox</a>'
    }
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


export const INDICATORS = {
  bws_cat: 'Baseline Water Stress',
  bwd_cat: 'Baseline Water Depletion',
  gtd_cat: 'Groundwater Table Decline',
  cep_cat: 'Coastal Eutrophication Potential',
  udw_cat: 'Unimproved/No Drinking Water',
  usa_cat: 'Unimproved/No Sanitation'
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
        name: 'Medium-high',
        value: '(2-3)'
      },
      {
        color: '#FF1900',
        name: 'High',
        value: '(3-4)'
      },
      {
        color: '#990000',
        name: 'Extremely high',
        value: '(4-5)'
      }
    ],
    disclaimer: [NO_DATA_LEGEND_ITEM],
    type: 'choropleth'
  },
  // Groundwater Table Decline
  gtd_cat: {
    name: 'Groundwater Table Decline',
    rangeValues: [-12, -6, 0, 0.5, 1, 2.5, 4, 5, 6, 26, 46],
    items: [
      {
        name: 'Low',
        value: '(<0 cm/y)',
        color: '#FFFF99'
      },
      {
        name: 'Low-medium',
        value: '(0-2 cm/y)',
        color: '#FFE600'
      },
      {
        name: 'Medium-high',
        value: '(2-4 cm/y)',
        color: '#FF9900'
      },
      {
        name: 'High',
        value: '(4-8 cm/y)',
        color: '#FF1900'
      },
      {
        name: 'Extremely high',
        value: '(>8 cm/y)',
        color: '#990000'
      }
    ],
    disclaimer: [
      {
        color: '#808080',
        name: 'Insignificant Trend'
      },
      NO_DATA_LEGEND_ITEM
    ],
    type: 'choropleth'
  },
  // Riverine flood risk
  rfr_cat: {
    name: 'Riverine flood risk',
    items: [
      {
        name: 'Low',
        value: '(0 to 1 in 1,000)',
        color: '#FFFF99'
      },
      {
        name: 'Low-medium',
        value: '(1 in 1,000 to 2 in 1,000)',
        color: '#FFE600'
      },
      {
        name: 'Medium-high',
        value: '(2 in 1,000 to 6 in 1,000)',
        color: '#FF9900'
      },
      {
        name: 'High',
        value: '(6 in 1,000 to 1 in 100)',
        color: '#FF1900'
      },
      {
        name: 'Extremely high',
        value: '(more than 1 in 100)',
        color: '#990000'
      }
    ],
    disclaimer: [NO_DATA_LEGEND_ITEM],
    type: 'choropleth'
  },
  // Coastal flood risk
  cfr_cat: {
    name: 'Coastal flood risk',
    items: [
      {
        name: 'Low',
        value: '(0 to 9 in 1,000,000)',
        color: '#FFFF99'
      },
      {
        name: 'Low-medium',
        value: '(9 in 1,000,000 to 7 in 100,000)',
        color: '#FFE600'
      },
      {
        name: 'Medium-high',
        value: '(7 in 100,000 to 3 in 10,000)',
        color: '#FF9900'
      },
      {
        name: 'High',
        value: '(3 in 10,000 to 2 in 1,000)',
        color: '#FF1900'
      },
      {
        name: 'Extremely high',
        value: '(more than 2 in 1,000)',
        color: '#990000'
      }
    ],
    disclaimer: [NO_DATA_LEGEND_ITEM],
    type: 'choropleth'
  },
  // Baseline Water Stress
  bws_cat: {
    name: 'Baseline Water Stress',
    rangeValues: [0, 5, 10, 15, 20, 30, 40, 60, 80, 90, 100],
    items: [
      {
        name: 'Low',
        value: '(<10%)',
        color: '#FFFF99'
      },
      {
        name: 'Low-medium',
        value: '(10-20%)',
        color: '#FFE600'
      },
      {
        name: 'Medium-high',
        value: '(20-40%)',
        color: '#FF9900'
      },
      {
        name: 'High',
        value: '(40-80%)',
        color: '#FF1900'
      },
      {
        name: 'Extremely high',
        value: '(>80%)',
        color: '#990000'
      }
    ],
    disclaimer: [
      {
        color: '#808080',
        name: 'Arid and low water use'
      },
      {
        color: '#4E4E4E',
        name: 'No data'
      }
    ],
    type: 'choropleth'
  },
  // Baseline Water Depletion
  bwd_cat: {
    name: 'Baseline Water Depletion',
    rangeValues: [0, 2.5, 5, 15, 25, 37.5, 50, 62.5, 75, 87.5, 100],
    items: [
      {
        name: 'Low',
        value: '(<5%)',
        color: '#FFFF99'
      },
      {
        name: 'Low-medium',
        value: '(5-25%)',
        color: '#FFE600'
      },
      {
        name: 'Medium-high',
        value: '(25-50%)',
        color: '#FF9900'
      },
      {
        name: 'High',
        value: '(50-75%)',
        color: '#FF1900'
      },
      {
        name: 'Extremely high',
        value: '(>75%)',
        color: '#990000'
      }
    ],
    disclaimer: [
      {
        color: '#808080',
        name: 'Arid and low water use'
      },
      {
        color: '#4E4E4E',
        name: 'No data'
      }
    ],
    type: 'choropleth'
  },
  // Interannual Variability
  iav_cat: {
    name: 'Interannual Variability',
    items: [
      {
        name: 'Low',
        value: '(<0.25)',
        color: '#FFFF99'
      },
      {
        name: 'Low-medium',
        value: '(0.25-0.50)',
        color: '#FFE600'
      },
      {
        name: 'Medium-high',
        value: '(0.50-0.75)',
        color: '#FF9900'
      },
      {
        name: 'High',
        value: '(0.75-1.00)',
        color: '#FF1900'
      },
      {
        name: 'Extremely high',
        value: '(>1.00)',
        color: '#990000'
      }
    ],
    disclaimer: [NO_DATA_LEGEND_ITEM],
    type: 'choropleth'
  },
  // Seasonal Variability
  sev_cat: {
    name: 'Seasonal Variability',
    items: [
      {
        name: 'Low',
        value: '(<0.33)',
        color: '#FFFF99'
      },
      {
        name: 'Low-medium',
        value: '(0.33-0.66)',
        color: '#FFE600'
      },
      {
        name: 'Medium-high',
        value: '(0.66-1.00)',
        color: '#FF9900'
      },
      {
        name: 'High',
        value: '(1.00-1.33)',
        color: '#FF1900'
      },
      {
        name: 'Extremely high',
        value: '(>1.33)',
        color: '#990000'
      }
    ],
    disclaimer: [NO_DATA_LEGEND_ITEM],
    type: 'choropleth'
  },
  // Drought Risk
  drr_cat: {
    name: 'Drought Risk',
    items: [
      {
        name: 'Low',
        value: '(0.0-0.2)',
        color: '#FFFF99'
      },
      {
        name: 'Low-medium',
        value: '(0.2-0.4)',
        color: '#FFE600'
      },
      {
        name: 'Medium',
        value: '(0.4-0.6)',
        color: '#FF9900'
      },
      {
        name: 'Medium-high',
        value: '(0.6-0.8)',
        color: '#FF1900'
      },
      {
        name: 'High',
        value: '(0.8-1.0)',
        color: '#990000'
      }
    ],
    disclaimer: [NO_DATA_LEGEND_ITEM],
    type: 'choropleth'
  },
  // Untreated Collected Wastewater
  ucw_cat: {
    name: 'Untreated Collected Wastewater',
    items: [
      {
        name: 'Low',
        value: '(<30%)',
        color: '#FFFF99'
      },
      {
        name: 'Low-medium',
        value: '(30-60%)',
        color: '#FFE600'
      },
      {
        name: 'Medium-high',
        value: '(60-90%)',
        color: '#FF9900'
      },
      {
        name: 'High',
        value: '(90-100%)',
        color: '#FF1900'
      },
      {
        name: 'Extremely high',
        value: '(100%)',
        color: '#990000'
      }
    ],
    disclaimer: [
      {
        color: '#808080',
        name: 'No to Low Wastewater Collected'
      },
      NO_DATA_LEGEND_ITEM
    ],
    type: 'choropleth'
  },
  // Coastal Eutrophication Potential
  cep_cat: {
    name: 'Coastal Eutrophication Potential',
    rangeValues: [-245, -125, -5, -2.5, 0, 0.5, 1, 3, 5, 45, 85],
    items: [
      {
        name: 'Low',
        value: '(<-5)',
        color: '#FFFF99'
      },
      {
        name: 'Low-medium',
        value: '(-5 to 0)',
        color: '#FFE600'
      },
      {
        name: 'Medium-high',
        value: '(0 to 1)',
        color: '#FF9900'
      },
      {
        name: 'High',
        value: '(1 to 5)',
        color: '#FF1900'
      },
      {
        name: 'Extremely high',
        value: '(>5)',
        color: '#990000'
      }
    ],
    disclaimer: [NO_DATA_LEGEND_ITEM],
    type: 'choropleth'
  },
  // Unimproved/no drinking water
  udw_cat: {
    name: 'Unimproved/No Drinking Water',
    rangeValues: [0, 1.25, 2.5, 3.75, 5, 7.5, 10, 15, 20, 60, 100],
    items: [
      {
        name: 'Low',
        value: '(<2.5%)',
        color: '#FFFF99'
      },
      {
        name: 'Low-medium',
        value: '(2.5-5%)',
        color: '#FFE600'
      },
      {
        name: 'Medium-high',
        value: '(5-10%)',
        color: '#FF9900'
      },
      {
        name: 'High',
        value: '(10-20%)',
        color: '#FF1900'
      },
      {
        name: 'Extremely high',
        value: '(>20%)',
        color: '#990000'
      }
    ],
    disclaimer: [NO_DATA_LEGEND_ITEM],
    type: 'choropleth'
  },
  // Unimproved/no sanitation
  usa_cat: {
    name: 'Unimproved/No Sanitation',
    rangeValues: [0, 1.25, 2.5, 3.75, 5, 7.5, 10, 15, 20, 60, 100],
    items: [
      {
        name: 'Low',
        value: '(<2.5%)',
        color: '#FFFF99'
      },
      {
        name: 'Low-medium',
        value: '(2.5-5%)',
        color: '#FFE600'
      },
      {
        name: 'Medium-high',
        value: '(5-10%)',
        color: '#FF9900'
      },
      {
        name: 'High',
        value: '(10-20%)',
        color: '#FF1900'
      },
      {
        name: 'Extremely high',
        value: '(>20%)',
        color: '#990000'
      }
    ],
    disclaimer: [NO_DATA_LEGEND_ITEM],
    type: 'choropleth'
  },
  // RepRisk Index
  rri_cat: {
    name: 'RepRisk Index',
    items: [
      {
        name: 'Low',
        value: '(<25%)',
        color: '#FFFF99'
      },
      {
        name: 'Low-medium',
        value: '(25-50%)',
        color: '#FFE600'
      },
      {
        name: 'Medium-high',
        value: '(50-60%)',
        color: '#FF9900'
      },
      {
        name: 'High',
        value: '(60-75%)',
        color: '#FF1900'
      },
      {
        name: 'Extremely high',
        value: '(>75%)',
        color: '#990000'
      }
    ],
    disclaimer: [NO_DATA_LEGEND_ITEM],
    type: 'choropleth'
  },
  common: {
    items: COMMON_LEGEND_ITEMS,
    disclaimer: [NO_DATA_LEGEND_ITEM],
    type: 'choropleth'
  }
};

export const HYDRO_LAYER = 'c3844335-db59-4a42-94fa-77ff47adc731';
export const AQUIFER_LAYER = '695a26a0-92d3-4a5f-98e5-1ebc4d55ba27';

export default {
  MAP_OPTIONS,
  BASEMAP_CONFIG,
  LABEL_LAYER_CONFIG,
  LEGENDS,
  HYDRO_LAYER,
  AQUIFER_LAYER
};
