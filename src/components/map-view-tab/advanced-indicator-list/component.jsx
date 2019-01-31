import { PureComponent } from 'react';

// helpers
import { renderList } from './helpers';

class AdvancedIndicatorList extends PureComponent {
  render() {
    return renderList({ ...this.props });
  }
}

export default AdvancedIndicatorList;
