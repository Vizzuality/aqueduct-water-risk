import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

// components
import { Spinner, post } from 'aqueduct-components';

class ImportFileModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      accepted: [],
      rejected: [],
      dropzoneActive: false,
      loading: false,
      errors: []
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
      if (this.state.accepted.length) {
        this.convertFile(this.state.accepted[0]);
      }
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

  convertFile(file) {
    const {
      onAddPoint,
      onSaveGeostore,
      toggleModal
    } = this.props;

    const formData = new FormData();
    formData.append('file', file);

    this.setState({ loading: true, errors: [] });

    post({
      type: 'POST',
      url: `${config.API_URL}/ogr/convert`,
      body: formData,
      multipart: true,
      onSuccess: (response) => {
        // Be sure that user upload points
        const features = response.data.attributes.features;

        // Check that features exists and they have some elements inside
        if (features && Array.isArray(features) && features.length) {
          // Check that every geometry exists and it's a point
          const allPoints = features.every(p => p.geometry && p.geometry.type === 'Point');

          if (allPoints) {
            this.setState({ loading: false });

            const points = features.map(p => ({ lat: p.geometry.coordinates[0], lng: p.geometry.coordinates[1] }));

            onAddPoint(points);
            onSaveGeostore();
            toggleModal(false, {});
          } else {
            this.setState({
              errors: [{
                detail: 'Only points are allowed to be analyzed. Please check your file to be sure that you didn\'t add lines, polygons or null geometries.'
              }],
              loading: false
            });
          }
        } else {
          this.setState({
            errors: [{
              detail: 'Only points are allowed to be analyzed. Please check your file to be sure that you didn\'t add lines, polygons or null geometries.'
            }],
            loading: false
          });
        }
      },
      onError: (err) => {
        console.error(err);
        this.setState({
          errors: [{
            detail: 'File corrupt or incorrect file. Please check the list of supported file formats above. You can also download the different templates by clicking on them.'
          }],
          loading: false
        });
      }
    });
  }

  triggerOpenDialog() { this.dropzone.open(); }

  render() {
    const {
      dropzoneActive,
      loading,
      errors
    } = this.state;

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
            <h2>Import files</h2>
            {/* <p>Drop a file in the designated area to analyze or subscribe to it. The recommended maximum file size is 1MB. Anything larger than that may not work properly.</p>
            <p>NOTE: Only point data is supported, not polygon and line data. Please ensure that your file only contains point data.</p> */}

            <p>List of supported file formats <i>(click on any format to download the template)</i>:</p>
            <ul>
              <li>Unzipped: <a download="template.csv" href="/files/points/template.csv">.csv</a>, <a download="template.geojson" href="/files/points/template.geojson">.geojson</a>, <a download="template.kml" href="/files/points/template.kml">.kml</a>, <a download="template.kmz" href="/files/points/template.kmz">.kmz</a>, <a download="template.wkt" href="/files/points/template.wkt">.wkt</a> <i>(.csv files must contain a geom column that contains geographic information)</i></li>
              <li>Zipped: <a download="template.zip" href="/files/points/template.zip">.shp</a> <i>(zipped shapefiles must include .shp, .shx, .dbf, and .prj files)</i></li>
            </ul>
          </header>

          <div className="dropzone-file">
            <div className="dropzone-file-input">
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

            {errors && Array.isArray(errors) && !!errors.length &&
              <div className="dropzone-file-errors">
                <ul>
                  {errors.map(err => (<li key={err.detail}>{err.detail}</li>))}
                </ul>
              </div>
            }
          </div>
        </Dropzone>
      </div>
    );
  }
}

ImportFileModal.propTypes = {
  onAddPoint: PropTypes.func.isRequired,
  onSaveGeostore: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default ImportFileModal;
