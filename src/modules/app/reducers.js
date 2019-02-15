import * as actions from './actions';

export default {
  [actions.setScope]: (state, { payload }) => ({
    ...state,
    scope: payload
  })
};
