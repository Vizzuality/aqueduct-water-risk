import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'aqueduct-components';
import Icons from 'vizzuality-components/dist/icons';

// components
import Modal from 'components/modal';

// utils
import { initGA, logPageView } from 'utils/analytics';

// app styles
import 'styles/index.scss';

class App extends PureComponent {

  constructor(props) {
    super(props);

    // Google Analytics
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }
  render() {
    return (
      <div className="l-app">
        <Icons />
        <Header
          title="Water Risk Atlas"
          appRoute="/applications/aqueduct/water-risk-atlas/"
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
