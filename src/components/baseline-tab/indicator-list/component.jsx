import { PureComponent } from 'react';

// helpers
import { renderList } from './helpers';

class IndicatorList extends PureComponent {
  render() {
    return renderList({ ...this.props });
  }
}

export default IndicatorList;
