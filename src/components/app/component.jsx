import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'aqueduct-components';
import Icons from 'vizzuality-components/dist/icons';

// components
import Modal from 'components/modal';

// app styles
import 'styles/index.scss';

class App extends PureComponent {
  render() {
    return (
      <div className="l-app">
        <Icons />
        <Header
          title="Water Risk Atlas"
          currentApp="water-risk-atlas"
        />
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
