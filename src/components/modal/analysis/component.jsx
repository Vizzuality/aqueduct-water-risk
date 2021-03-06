import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { saveAs } from 'file-saver';
import { toastr } from 'react-redux-toastr';
import { Spinner } from 'aqueduct-components';

// components
import DataTable from 'components/analyze-locations-tab/data-table';

// helpers
import { getFileName } from 'components/analyzer//helpers';

// services
import { fetchCARTOQuery } from 'services/query';

// utils
import { logEvent } from 'utils/analytics';

class AnalysisModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { fileLoading: false };
  }

  handleDownload(e, format) {
    const { analysis: { downloadUrl } } = this.props;
    const fileName = getFileName();

    e.preventDefault();
    e.stopPropagation();

    this.setState({ fileLoading: true }, () => {
      fetchCARTOQuery({ q: downloadUrl, format })
      .then((data) => { saveAs(data, `${fileName}.${format}`); })
      .catch((err) => {
        console.error(err.message);
        toastr.error('Ops, something went wrong');
      })
        .finally(() => {
          logEvent('Download', 'User Downloads from Analysis Location', format);
          this.setState({ fileLoading: false });
        });
    });
  }

  render() {
    const {
      analysis: { loading },
      downloadUrl
    } = this.props;
    const { fileLoading } = this.state;

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
                <li><button type="button" onClick={(e) => { this.handleDownload(e, 'csv'); }}>CSV</button>,</li>
                <li><button type="button" onClick={(e) => { this.handleDownload(e, 'gpkg'); }}>GPKG</button></li>
                <li className="download-spinner">
                  <Spinner
                    isLoading={fileLoading}
                    className="-transparent -tiny"
                  />
                </li>
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
