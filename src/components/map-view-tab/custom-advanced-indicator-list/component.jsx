import { PureComponent } from 'react';
import PropTypes from 'prop-types';

// constants
import { INDICATORS } from 'constants/indicators';

// helpers
import { renderList } from './helpers';

class CustomAdvancedIndicatorList extends PureComponent {
  onCheckIndicator(checked, indicator) {
    const { setPonderation } = this.props;

    setPonderation({ custom: { [indicator]: checked ? '1.0' : 'null' } });
  }

  render() {
    return renderList({
      ...this.props,
      indicators: INDICATORS,
      onCheckIndicator: this.onCheckIndicator.bind(this)
    });
  }
}

CustomAdvancedIndicatorList.propTypes = { setPonderation: PropTypes.func.isRequired };

export default CustomAdvancedIndicatorList;
