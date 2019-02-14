import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'aqueduct-components';
import Icons from 'wri-api-components/dist/icons';

import Modal from 'containers/ui/Modal';

class App extends PureComponent {
  render() {
    return (
      <div className="l-app">
        <Icons />
        <Header title="Water Risk Atlas" />
        <main role="main" className="l-main l-content">
          {this.props.children}
        </main>
        <Modal />
      </div>
    );
  }
}

App.propTypes = { children: PropTypes.object.isRequired };

export default App;
