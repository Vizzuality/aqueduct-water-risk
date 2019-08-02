import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import DataTable from 'components/analyze-locations-tab/data-table';

// helpers
import { getFileName } from 'components/analyzer//helpers';

// utils
import { logEvent } from 'utils/analytics';

class AnalysisModal extends PureComponent {
  static handleDownload(format) {
    logEvent('Download', 'User Downloads from Analysis Location', format);
  }

  render() {
    const { downloadUrl } = this.props;
    const fileName = getFileName();

    return (
      <div className="c-analysis-modal">
        <div className="c-info">
          <div className="table-container">
            <DataTable />
          </div>
          {downloadUrl &&
            (<div className="download-container">
             Download as
             <ul>
               <li><a onClick={() => { AnalysisModal.handleDownload('CSV'); }} href={`${downloadUrl}&format=csv&filename=${fileName}`}>CSV</a>,</li>
               <li><a onClick={() => { AnalysisModal.handleDownload('SHP'); }} href={`${downloadUrl}&format=shp&filename=${fileName}`}>SHP</a>,</li>
               <li><a onClick={() => { AnalysisModal.handleDownload('GPKG'); }} href={`${downloadUrl}&format=gpkg&filename=${fileName}`}>GPKG</a></li>
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
      </div>
    );
  }
}

AnalysisModal.propTypes = { downloadUrl: PropTypes.string };

AnalysisModal.defaultProps = { downloadUrl: null };

export default AnalysisModal;
