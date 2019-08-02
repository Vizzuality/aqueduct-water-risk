import React, { PureComponent } from 'react';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Spinner, Icon } from 'aqueduct-components';

// components
import DataTable from 'components/analyze-locations-tab/data-table';
import AnalysisModal from 'components/modal/analysis';

// utils
import { logEvent } from 'utils/analytics';

// helpers
import { getFileName } from './helpers';


class Analyzer extends PureComponent {
  static handleDownload(format) {
    logEvent('Download', 'User Downloads from Analysis Location', format);
  }

  componentWillReceiveProps(nextProps) {
    const { filters, onFetchAnalysis } = this.props;
    const {
      filters: nextFilters,
      geoStore
    } = nextProps;
    const filtersChanged = !isEqual(filters, nextFilters);

    if (filtersChanged && geoStore) onFetchAnalysis();
  }

  onApplyAnalysis() {
    const { onApplyAnalysis } = this.props;

    logEvent('Analysis', 'Analyze Locations', 'Start Analysis');
    onApplyAnalysis();
  }
  triggerExpandedTableModal() {
    const { toggleModal } = this.props;

    toggleModal(true, {
      children: AnalysisModal,
      size: '-medium'
    });
  }

  render() {
    const {
      points,
      analysis: { data, loading, downloadUrl }
    } = this.props;
    const btnClass = classnames(
      'c-btn -light apply-analysis-btn',
      { '-disabled': !points.length }
    );
    const fileName = getFileName();

    return (
      <div className="c-analyzer">
        {(!!data.length && !loading) && (
          <div className="analyzer-header">
            <button
              type="button"
              onClick={() => { this.triggerExpandedTableModal(); }}
            >
              <Icon
                name="icon-expand-window"
                className="expand-table-icon"
              />
            </button>
          </div>
        )}
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
               <li><a onClick={() => { Analyzer.handleDownload('CSV'); }} href={`${downloadUrl}&format=csv&filename=${fileName}`}>CSV</a>,</li>
               <li><a onClick={() => { Analyzer.handleDownload('SHP'); }} href={`${downloadUrl}&format=shp&filename=${fileName}`}>SHP</a>,</li>
               <li><a onClick={() => { Analyzer.handleDownload('GPKG'); }} href={`${downloadUrl}&format=gpkg&filename=${fileName}`}>GPKG</a></li>
             </ul>
              <p className="download-instructions">
                <a
                  href="https://github.com/wri/aqueduct30_data_download/blob/master/metadata.md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instructions
                </a>
              </p>
            </div>
          )}
        </div>
        <div className="analyzer-footer">
          <button
            type="button"
            className={btnClass}
            onClick={() => { this.onApplyAnalysis(); }}
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
  onFetchAnalysis: PropTypes.func.isRequired,
  onApplyAnalysis: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};

Analyzer.defaultProps = { geoStore: null };

export default Analyzer;
