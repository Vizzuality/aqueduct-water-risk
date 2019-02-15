import { handleModule } from 'redux-tools';
import { routerReducer } from 'react-router-redux';

import { modalReducer } from 'aqueduct-components';
import * as appModule from 'modules/app';
import * as layersModule from 'modules/layers';
import * as mapViewModule from 'modules/map-view-tab';
import * as mapModule from 'modules/map';
import * as sharingModule from 'modules/sharing';

import { analyzeLocationsReducer } from './analyzeLocations';


export default {
  routing: routerReducer,
  app: handleModule(appModule),
  modal: modalReducer,
  layers: handleModule(layersModule),
  mapView: handleModule(mapViewModule),
  map: handleModule(mapModule),
  share: handleModule(sharingModule),
  analyzeLocations: analyzeLocationsReducer
};
