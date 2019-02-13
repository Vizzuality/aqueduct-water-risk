import { PureComponent } from 'react';

// constants
import { INDICATORS } from 'constants/indicators';

// helpers
import { renderList } from './helpers';

class CustomAdvancedIndicatorList extends PureComponent {
  render() {
    return renderList({ ...this.props, indicators: INDICATORS });
  }
}

export default CustomAdvancedIndicatorList;
