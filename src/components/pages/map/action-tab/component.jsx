import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
// import ActionFilters from 'components/future-tab/filters';
// import ActionIndicators from 'components/future-tab/indicator-list';

// constants

class ActionTab extends PureComponent {

  componentWillMount() {
    const {
      setFilters,
      filters: {}
    } = this.props;
    setFilters({ });
  }

  toggleModal(children) {
    const { toggleModal } = this.props;

    toggleModal(true, {
      children,
      size: '-auto'
    });
  }

  render() {
    return (
      <div className="l-action">
      </div>
    );
  }
}

ActionTab.propTypes = {
  filters: PropTypes.object.isRequired,
  geoStore: PropTypes.string,
  setFilters: PropTypes.func.isRequired,
  onFetchAnalysis: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};

ActionTab.defaultProps = { geoStore: null };

export default ActionTab;
