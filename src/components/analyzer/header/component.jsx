import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'aqueduct-components';

// components
import BtnMenu from 'components/ui/BtnMenu';
import CoordinatesModal from 'components/modal/coordinates';
import ImportFileModal from 'components/modal/import';

class AnalyzerHeader extends PureComponent {
  handleMapMode() {
    const {
      mapMode,
      analyzerOpen,
      setMapMode,
      setAnalyzerOpen
    } = this.props;
    const nextMapMode = mapMode === 'analysis' ? 'view' : 'analysis';

    if (!analyzerOpen) setAnalyzerOpen(true);
    setMapMode(nextMapMode);
  }

  toggleModal(children) {
    const { toggleModal } = this.props;

    toggleModal(true, {
      children,
      size: '-auto'
    });
  }

  render() {
    const {
      points,
      mapMode,
      analyzerOpen,
      setAnalyzerOpen,
      clearAnalysis
    } = this.props;

    return (
      <div className="c-analyzer-header">
        <div className="actions-container">
          <div className="toggle-container">
            <button
              className="accordion-analyzer-btn"
              onClick={() => { setAnalyzerOpen(!analyzerOpen); }}
            >
              <Icon
                name="icon-arrow-up-2"
                className="arrow-icon"
              />
              <span className="title">Analyze</span>
            </button>
          </div>
          <BtnMenu
            className="-theme-white"
            items={[
              ...(points.length > 0) && [{ label: 'Clear', cb: () => { clearAnalysis(); } }],
              {
                label: 'Click map',
                ...mapMode === 'analysis' && { active: true },
                cb: () => { this.handleMapMode(); }
              },
              { label: 'Enter Address', cb: () => { this.toggleModal(CoordinatesModal); } },
              { label: 'Import file', cb: () => { this.toggleModal(ImportFileModal); } }
            ]}
          />
        </div>
      </div>
    );
  }
}

AnalyzerHeader.propTypes = {
  points: PropTypes.array.isRequired,
  mapMode: PropTypes.string.isRequired,
  analyzerOpen: PropTypes.bool.isRequired,
  setMapMode: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  setAnalyzerOpen: PropTypes.func.isRequired,
  clearAnalysis: PropTypes.func.isRequired
};

export default AnalyzerHeader;
