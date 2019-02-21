import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SegmentedUi } from 'aqueduct-components';

// components
import BtnMenu from 'components/ui/BtnMenu';
import ImportFileModal from 'components/modal/import-file';

// constants
import { SCOPE_OPTIONS } from 'constants/app';

class StickyLocation extends PureComponent {
  handleModal() {
    const { toggleModal } = this.props;
    toggleModal(true, { children: ImportFileModal });
  }

  render() {
    const {
      scope,
      withScope,
      setScope
    } = this.props;

    return (
      <div className="c-sticky-filters">
        {withScope &&
          <div className="filters-lead">
            <div className="row expanded collapse">
              <div className="small-12 column">
                <SegmentedUi
                  className="-tabs"
                  items={SCOPE_OPTIONS}
                  selected={scope}
                  onChange={({ value }) => { setScope(value); }}
                />
              </div>
            </div>
          </div>
        }
        <div className="l-container analyze-locations-header">
          <span className="label">Add location</span>
          <BtnMenu
            className="-theme-white"
            items={[
              { label: 'Click map' },
              { label: 'Coordinates' },
              { label: 'Import file', cb: () => { this.handleModal(); } }
            ]}
          />
        </div>
      </div>
    );
  }
}

StickyLocation.propTypes = {
  withScope: PropTypes.bool,
  scope: PropTypes.string.isRequired,
  setScope: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};

StickyLocation.defaultProps = { withScope: false };

export default StickyLocation;
