import React, { PureComponent } from 'react';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Spinner } from 'aqueduct-components';

// components
import BtnMenu from 'components/ui/BtnMenu';
import CoordinatesModal from 'components/modal/coordinates';
import ImportFileModal from 'components/modal/import-file';
import DataTable from 'components/analyze-locations-tab/data-table';

class Analyzer extends PureComponent {
  componentDidMount() {
    const {
      geoStore,
      onFetchAnalysis
    } = this.props;

    if (geoStore) onFetchAnalysis();
  }

  componentWillReceiveProps(nextProps) {
    const { filters, onFetchAnalysis } = this.props;
    const { filters: nextFilters } = nextProps;
    const filtersChanged = !isEqual(filters, nextFilters);

    if (filtersChanged) onFetchAnalysis();
  }

  toggleModal(children) {
    const { toggleModal } = this.props;

    toggleModal(true, {
      children,
      size: '-auto'
    });
  }

  handleMapMode() {
    const { mapMode, setMapMode } = this.props;
    const nextMapMode = mapMode === 'analysis' ? 'view' : 'analysis';

    setMapMode(nextMapMode);
  }

  render() {
    const {
      points,
      analysis: { data, loading, downloadUrl },
      mapMode,
      clearAnalysis,
      onApplyAnalysis
    } = this.props;
    const btnClass = classnames(
      'c-btn -light apply-analysis-btn',
      { '-disabled': !points.length }
    );

    return (
      <div className="c-analyzer">
        <div className="analyzer-header">
          <span className="title">Analyze</span>
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
        <div className="analyzer-content">
          <Spinner
            isLoading={loading}
            className="-transparent"
          />
          {(!data.length && !loading) && (
            <div className="no-data-container">
              <span className="no-data">
                Click on the map to select locations <br /> and then click &lsquo;Apply analysis&rsquo; button
              </span>
            </div>
          )}

          {(data.length > 0 && !loading) && (
            <div className="table-container">
              <DataTable />
            </div>
          )}

          {(downloadUrl && !loading) &&
            (<div className="download-container">
             Download as
             <ul>
               <li><a href={`${downloadUrl}&format=csv`}>CSV</a>,</li>
               <li><a href={`${downloadUrl}&format=shp`}>SHP</a>,</li>
               <li><a href={`${downloadUrl}&format=kml`}>KML</a>,</li>
               <li><a href={`${downloadUrl}&format=geojson`}>GeoJSON</a>,</li>
               <li><a href={`${downloadUrl}&format=svg`}>SVG</a>,</li>
               <li><a href={`${downloadUrl}&format=gpkg`}>GPKG</a></li>
             </ul>
            </div>)}
        </div>
        <div className="analyzer-footer">
          <button
            type="button"
            className={btnClass}
            onClick={onApplyAnalysis}
            disabled={!points.length}
          >
            Apply analysis
          </button>
        </div>
      </div>
    );
  }
}

Analyzer.propTypes = {
  filters: PropTypes.object.isRequired,
  geoStore: PropTypes.string,
  points: PropTypes.array.isRequired,
  analysis: PropTypes.object.isRequired,
  mapMode: PropTypes.string.isRequired,
  setMapMode: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  onFetchAnalysis: PropTypes.func.isRequired,
  onApplyAnalysis: PropTypes.func.isRequired,
  clearAnalysis: PropTypes.func.isRequired
};

Analyzer.defaultProps = { geoStore: null };

export default Analyzer;
