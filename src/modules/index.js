import { handleModule } from 'redux-tools';
import { routerReducer } from 'react-router-redux';

import { modalReducer } from 'aqueduct-components';
import * as appModule from 'modules/app';
import * as layersModule from 'modules/layers';
import * as mapViewModule from 'modules/map-view-tab';
import * as analyzeLocationsModule from 'modules/analyze-locations-tab';
import * as mapModule from 'modules/map';
import * as sharingModule from 'modules/sharing';

export default {
  // third-party reducers
  routing: routerReducer,
  modal: modalReducer,
  // local reducers
  app: handleModule(appModule),
  layers: handleModule(layersModule),
  mapView: handleModule(mapViewModule),
  map: handleModule(mapModule),
  share: handleModule(sharingModule),
  analyzeLocations: handleModule(analyzeLocationsModule)
};
