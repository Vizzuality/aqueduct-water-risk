import React from 'react';
import { connect } from 'react-redux';
import { IndexRoute, Router, Route } from 'react-router';

// Components
import MapPage from 'containers/pages/MapPage';
import App from 'containers/app/App';

const Routes = ({ history }) => (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={MapPage} />
    </Route>
  </Router>
);

Routes.propTypes = {
  history: React.PropTypes.object
};

export default connect()(Routes);
