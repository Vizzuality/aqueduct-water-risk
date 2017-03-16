import React from 'react';
import { Header } from 'aqueduct-components';
import Modal from 'components/ui/ModalContainer';

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
        <Modal />
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object,
  getDatasets: React.PropTypes.func
};
