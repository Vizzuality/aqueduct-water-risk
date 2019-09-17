import React, { PureComponent } from 'react';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { toastr } from 'react-redux-toastr';
import { Spinner, Icon } from 'aqueduct-components';
import { saveAs } from 'file-saver';
import { toastr } from 'react-redux-toastr';

// components
import DataTable from 'components/analyze-locations-tab/data-table';
import AnalysisModal from 'components/modal/analysis';

// services
import { fetchCARTOQuery } from 'services/query';

// utils
import { logEvent } from 'utils/analytics';

// helpers
import { getFileName } from './helpers';


class Analyzer extends PureComponent {
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

  handleDownload(e, format) {
    const { analysis: { downloadUrl } } = this.props;
    const fileName = getFileName();

    e.preventDefault();
    e.stopPropagation();

    fetchCARTOQuery({ q: downloadUrl, format })
    .then((data) => saveAs(data, format === 'shp' ? fileName : `fileName.${format}`))
    .catch((err) => {
      console.error(err.message);
      toastr.error('Ops, something went wrong');
    })
      .finally(() => {
        logEvent('Download', 'User Downloads from Analysis Location', format);
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
               <li><a onClick={(e) => { this.handleDownload(e, 'csv'); }}>CSV</a>,</li>
               <li><a onClick={(e) => { this.handleDownload(e, 'shp'); }}>SHP</a>,</li>
               <li><a onClick={(e) => { this.handleDownload(e, 'gpkg'); }}>GPKG</a></li>
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
  downloadUrl: PropTypes.string,
  points: PropTypes.array.isRequired,
  analysis: PropTypes.object.isRequired,
  onFetchAnalysis: PropTypes.func.isRequired,
  onApplyAnalysis: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};

Analyzer.defaultProps = {
  geoStore: null,
  downloadUrl: null
};

export default Analyzer;
