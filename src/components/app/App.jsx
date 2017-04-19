import React from 'react';
import { Header } from 'aqueduct-components';

import Modal from 'containers/ui/Modal';
import { toggleModal, setModalOptions } from 'modules/modal';

export default class App extends React.Component {

  componentWillMount() {
    this.props.getDatasets();
  }

  render() {
    return (
      <div className="l-app">
        <Header />
        <main role="main" className="l-main l-content">
          {this.props.children}
        </main>
        <Modal
          toggleModal={toggleModal}
          setModalOptions={setModalOptions}
        />
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object,
  getDatasets: React.PropTypes.func
};
