import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { hashHistory } from 'react-router';
import thunk from 'redux-thunk';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import Toastr from 'react-redux-toastr';

// es6 shim for .finally() in promises
import finallyShim from 'promise.prototype.finally';

// reducers
import reducers from 'modules';

// components
import Routes from './routes';

finallyShim.shim();


/**
 * Reducers
 * @info(http://redux.js.org/docs/basics/Reducers.html)
 * @type {Object}
 */
const reducer = combineReducers({ ...reducers });

/**
 * Global state
 * @info(http://redux.js.org/docs/basics/Store.html)
 * @type {Object}
 */
const middlewareRouter = routerMiddleware(hashHistory);
const store = createStore(
  reducer,
  compose(
    /* The router middleware MUST be before thunk otherwise the URL changes
    * inside a thunk function won't work properly */
    applyMiddleware(middlewareRouter, thunk),
    /* Redux dev tool, install chrome extension in
     * https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en */
    typeof window === 'object' &&
      typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);


/**
 * HTML5 History API managed by React Router module
 * @info(https://github.com/reactjs/react-router/tree/master/docs)
 * @type {Object}
 */
const history = syncHistoryWithStore(hashHistory, store);

// TO-DO: remove this once there are no components import it.
function dispatch(action) {
  store.dispatch(action);
}

// TO-DO: remove this once there are no components import it.
export { store, dispatch };

render(
  <Provider store={store}>
    <Fragment>
      <Routes history={history} />
      <Toastr
        timeOut={2000}
        preventDuplicates
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick
      />
    </Fragment>
  </Provider>,
  document.getElementById('app')
);
