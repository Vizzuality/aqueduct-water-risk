import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IndexRoute, Router, Route } from 'react-router';
import { onEnterMapPage } from 'modules/url';

// Components
import App from 'components/app';
import MapPage from 'components/pages/map';


const Routes = ({ history }) => (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={MapPage} onEnter={onEnterMapPage} />
    </Route>
  </Router>
);

Routes.propTypes = {
  history: PropTypes.object
};

export default connect()(Routes);
