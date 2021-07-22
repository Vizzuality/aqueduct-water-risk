import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header } from 'aqueduct-components';
import Icons from 'vizzuality-components/dist/icons';

// components
import Modal from 'components/modal';
import AsideContext from 'components/aside';

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
          appRoute="https://wri.org/aqueduct"
        />
        <main role="main" className="l-main l-content">
          {this.props.children}
          <AsideContext />
        </main>
        <Modal />
      </div>
    );
  }
}

App.propTypes = { children: PropTypes.object.isRequired };

export default App;
