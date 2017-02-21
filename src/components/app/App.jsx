import React from 'react';
import { Header } from 'aqueduct-components';

export default class App extends React.Component {

  render() {
    return (
      <div className="l-app">
        <Header />
        <main role="main" className="l-main l-content">
          {this.props.children}
        </main>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object
};
