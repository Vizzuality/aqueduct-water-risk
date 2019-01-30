import React from 'react';
import PropTypes from 'prop-types';
import { Header } from 'aqueduct-components';

import Modal from 'containers/ui/Modal';

export default class App extends React.Component {

  componentWillMount() {
    this.props.getDatasets();
  }

  render() {
    return (
      <div className="l-app">
        <Header title="Water Risk Atlas" />
        <main role="main" className="l-main l-content">
          {this.props.children}
        </main>
        <Modal />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object,
  getDatasets: PropTypes.func
};
