import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IndexRoute, Router, Route } from 'react-router';

// actions
import { onEnterMapPage } from 'modules/app/actions';


// components
import App from 'components/app';
import MapPage from 'components/pages/map';

const Routes = ({ history, onEnterMapPage: mapPageHook }) => (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={MapPage} onEnter={mapPageHook} />
    </Route>
  </Router>
);

Routes.propTypes = {
  history: PropTypes.object.isRequired,
  onEnterMapPage: PropTypes.func.isRequired
};

export default connect(
  null,
  dispatch => ({ onEnterMapPage: (params, replaceUrl, done) => {
    dispatch(onEnterMapPage({ params, done }));
  }
  })
)(Routes);
