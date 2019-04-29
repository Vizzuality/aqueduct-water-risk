import { PureComponent } from 'react';
import PropTypes from 'prop-types';

// constants
import { INDICATORS } from 'constants/indicators';

// helpers
import { renderList } from './helpers';

class CustomAdvancedIndicatorList extends PureComponent {
  onCheckIndicator(checked, indicator) {
    const { setPonderation, updateUrl } = this.props;

    setPonderation({ custom: { [indicator]: checked ? '1.0' : 'null' } });

    updateUrl();
  }

  onClickPonderation(indicator, value) {
    const { setPonderation, updateUrl } = this.props;
    setPonderation({ custom: { [indicator.id]: value } });

    updateUrl();
  }

  render() {
    return renderList({
      ...this.props,
      indicators: INDICATORS,
      onCheckIndicator: this.onCheckIndicator.bind(this),
      onClickPonderation: this.onClickPonderation.bind(this)
    });
  }
}

CustomAdvancedIndicatorList.propTypes = {
  setPonderation: PropTypes.func.isRequired,
  updateUrl: PropTypes.func.isRequired
};

export default CustomAdvancedIndicatorList;
