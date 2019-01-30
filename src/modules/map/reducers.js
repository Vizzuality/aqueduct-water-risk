import * as actions from './actions';

export default {
  [actions.setMapLocation]: (state, { payload }) => ({ ...state, ...payload })
};
