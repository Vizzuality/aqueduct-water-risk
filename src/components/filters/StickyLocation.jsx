import React from 'react';
import { dispatch } from 'main';
import { SegmentedUi, toggleModal } from 'aqueduct-components';
import { SCOPE_OPTIONS } from 'constants/mapView';

import BtnMenu from 'components/ui/BtnMenu';
import ImportFileModal from 'components/modal/ImportFileModal';

class StickyLocation extends React.Component {

  render() {
    return (
      <div className="c-sticky-filters">
        {this.props.withScope &&
          <div className="filters-lead">
            <div className="row expanded collapse">
              <div className="small-12 column">
                <SegmentedUi
                  className="-tabs"
                  items={SCOPE_OPTIONS}
                  selected={this.props.scope}
                  onChange={selected => this.props.setScope(selected.value, 'scope')}
                />
              </div>
            </div>
          </div>
        }
        <div className="l-container analyze-locations-header">
          <span className="label">Add location</span>
          {/* TODO: functionallity */}
          <BtnMenu
            className="-theme-white"
            items={[{ label: 'Click map' }, { label: 'Coordinates' }, { label: 'Import file', cb: () => dispatch(toggleModal(true, { children: ImportFileModal })) }]}
          />
        </div>
      </div>
    );
  }
}

StickyLocation.propTypes = {
  scope: React.PropTypes.string,
  withScope: React.PropTypes.bool,
  /* actions */
  setScope: React.PropTypes.func
};

export default StickyLocation;
