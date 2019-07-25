import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Dropzone from 'react-dropzone';
import { toastr } from 'react-redux-toastr';

// services
import { fetchGeocoding } from 'services/geocoding';

// components
import { Spinner } from 'aqueduct-components';

class ImportTabAddresses extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      accepted: [],
      rejected: [],
      dropzoneActive: false,
      loading: false,
      errors: null
    };

    this.triggerOpenDialog = this.triggerOpenDialog.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  onDragEnter() {
    this.setState({ dropzoneActive: true });
  }

  onDragLeave() {
    this.setState({ dropzoneActive: false });
  }

  onDrop(accepted, rejected) {
    this.setState({
      accepted,
      rejected,
      dropzoneActive: false
    }, () => {
      if (this.state.accepted.length) this.performGeocoding(this.state.accepted[0]);
    });
  }

  getFileName() {
    const { accepted } = this.state;

    if (accepted.length) {
      const current = accepted[0];
      return current.name;
    }

    return 'Select file to import data';
  }

  performGeocoding(addressFile) {
    const {
      setMapMode,
      onAddPoint,
      onSaveGeostore,
      onFetchAnalysis,
      setAnalyzerOpen,
      toggleModal
    } = this.props;

    const formData = new FormData();
    formData.append('file', addressFile);

    this.setState({
      loading: true,
      errors: null
    },
      () => {
        toastr.info('Searching for addresses, this might take a few minutes', { title: 'Analysis' });
        fetchGeocoding(formData)
          .then((locatedAddresses) => {
            // checks if there are no errors in the importation
            const errors = locatedAddresses.filter(address => !address.match);

            // error flow
            if (errors.length) {
              this.setState({
                errors,
                loading: false
              });
            } else {
              setMapMode('analysis');
              const points = locatedAddresses.map(({ lat, lon }) => ({ lat, lng: lon }));
              onAddPoint(points);

              onSaveGeostore()
                .then(() => {
                  onFetchAnalysis()
                    .then(() => {
                      this.setState({ loading: false }, () => {
                        toggleModal(false, {});
                        setAnalyzerOpen(true);
                      });
                    });
                });
            }
          })
          .catch((error) => {
            console.error(error);
            this.setState({
              loading: false,
              errors: error.message
            });
          });
      }
    );
  }

  triggerOpenDialog() { this.dropzone.open(); }

  goToDocs() {
    const { toggleModal } = this.props;

    toggleModal(false);

    window.location.href = '/#/documentation';
  }

  render() {
    const {
      dropzoneActive,
      loading,
      errors
    } = this.state;

    const fileInputClass = classnames('dropzone-file-input', { '-error': !!errors });

    return (
      <div className="c-import-modal">
        <Spinner isLoading={loading} />
        <Dropzone
          ref={(node) => { this.dropzone = node; }}
          className="c-dropzone"
          activeClassName="-active"
          rejectClassName="-reject"
          multiple={false}
          disableClick
          disablePreview
          onDrop={this.onDrop}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
        >
          {dropzoneActive &&
            <div className="dropzone-active">
              <h2>Drop files...</h2>
            </div>
          }

          <header className="dropzone-header">
            <h2>Import multiple addresses</h2>

            <p>Please use this <a href="https://github.com/wri/aqueduct_analyze_locations/raw/master/input_templates/example_address.xlsx">template</a> to structure your data.</p>
            <p>Replace with your own location names and addresses. The address columns should contain the <b>full</b> address including city name and country. </p>
            <p>More <button className="go-to-docs-btn" onClick={() => { this.goToDocs(); }}>info</button>.</p>

            <p>List of supported file formats <i>(click on any format to download the template)</i>:</p>
            <ul>
              <li>Unzipped:
                <a download="example_address.csv" href="/files/points/addresses/example_address.csv">.csv</a>,&nbsp;
                <a download="example_address.xlsx" href="/files/points/addresses/example_address.xlsx">.xlsx</a>
              </li>
            </ul>
          </header>

          <div className="dropzone-file">
            <div className={fileInputClass}>
              <div
                className="dropzone-file-name"
                onClick={this.triggerOpenDialog}
              >
                {this.getFileName()}
              </div>
              <button
                className="c-btn -primary -light"
                onClick={this.triggerOpenDialog}
              >
                Select file
              </button>
            </div>

            {errors && typeof errors === 'string' &&
              <div className="dropzone-file-errors">
                <span>{errors}</span>
              </div>
            }

            {errors && !!errors.length && typeof errors === 'object' &&
              <div className="dropzone-file-errors">
                <p>The next errors appeared during the importation:</p>
                <ul>
                  {errors.map(err => (
                    <li key={err.row}>
                      Error in line {err.row} - {err.address}
                    </li>
                  ))}
                </ul>
              </div>}
          </div>
        </Dropzone>
      </div>
    );
  }
}

ImportTabAddresses.propTypes = {
  onAddPoint: PropTypes.func.isRequired,
  onSaveGeostore: PropTypes.func.isRequired,
  onFetchAnalysis: PropTypes.func.isRequired,
  setMapMode: PropTypes.func.isRequired,
  setAnalyzerOpen: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default ImportTabAddresses;
