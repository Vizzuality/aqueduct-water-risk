import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';
import { toastr } from 'react-redux-toastr';

// components
import DataTable from 'components/analyze-locations-tab/data-table';

// helpers
import { getFileName } from 'components/analyzer//helpers';

// services
import { fetchQuery } from 'services/query';

// utils
import { logEvent } from 'utils/analytics';

class AnalysisModal extends PureComponent {
  handleDownload(format) {
    const { downloadUrl } = this.props;
    const fileName = getFileName();

    const split = downloadUrl.split('?');
    const baseURL = split[0];
    const query = split[1].split('=')[1];
    const params = JSON.stringify({
      q: query,
      format
    });

    fetchQuery(baseURL, params)
      .then((data) => {
        logEvent('Download', 'User Downloads from Analysis Location', format);

        if (format === 'csv') saveAs(`data:text/csv;charset=UTF-8,${encodeURIComponent(data)}`, `${fileName}.csv`);
        if (format === 'gpkg') saveAs(`data:application/geopackage+vnd.sqlite3;charset=UTF-8,${encodeURIComponent(data)}`, `${fileName}.gpkg`);
      })
      .catch(({ message }) => {
        toastr.error('Something went wrong with the download');
        console.error(message);
      });
  }

  render() {
    const {
      analysis: { loading },
      downloadUrl
    } = this.props;

    return (
      <div className="c-analysis-modal">
        <div className="c-info">
          <div className="table-container">
            <DataTable />
          </div>
          {(downloadUrl && !loading) &&
            (<div className="download-container">
             Download as
             <ul>
               <li><button type="button" onClick={() => { this.handleDownload('csv'); }}>CSV</button>,</li>
               <li><button type="button" onClick={() => { this.handleDownload('gpkg'); }}>GPKG</button></li>
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

AnalysisModal.propTypes = {
  analysis: PropTypes.object.isRequired,
  downloadUrl: PropTypes.string
};

AnalysisModal.defaultProps = { downloadUrl: null };

export default AnalysisModal;
