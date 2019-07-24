import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router';

// components
import { Spinner, post } from 'aqueduct-components';

class ImportTabCoordinates extends PureComponent {
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
      onFetchAnalysis,
      setMapMode,
      setAnalyzerOpen,
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
        setMapMode('analysis');
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
            onSaveGeostore()
              .then(() => {
                onFetchAnalysis()
                  .then(() => { setAnalyzerOpen(true); });
              });
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
            <h2>Import multiple coordinates</h2>
            <p>List of supported file formats <i>(click on any format to download the template)</i>:</p>
            <ul>
              <li>Unzipped:
                <a download="example_coordinates.csv" href="/files/points/coordinates/example_coordinates.csv">.csv</a>,
                <a download="example_coordinates.cpg" href="/files/points/coordinates/example_coordinates.cpg">.cpg</a>,
                <a download="example_coordinates.dbf" href="/files/points/coordinates/example_coordinates.dbf">.dbf</a>,
                <a download="example_coordinates.prj" href="/files/points/coordinates/example_coordinates.prj">.prj</a>,
                <a download="example_coordinates.xlsx" href="/files/points/coordinates/example_coordinates.xlsx">.xlsx</a>,
                <a download="example_coordinates.shp" href="/files/points/coordinates/example_coordinates.shp">.shp</a>,
                <a download="example_coordinates.shx" href="/files/points/coordinates/example_coordinates.shx">.shx</a>
                <i>(.csv files must contain a geom column that contains geographic information)</i></li>
              <li>Zipped:
                <a download="example_coordinates.zip" href="/files/points/coordinates/example_coordinates.zip">.zip</a>
                <i>(zipped shapefiles must include .shp, .shx, .dbf, and .prj files)</i>
              </li>
            </ul>

            <p>You can find more info <button className="go-to-docs-btn" onClick={() => { this.goToDocs(); }}>here</button>.</p>
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

ImportTabCoordinates.propTypes = {
  onAddPoint: PropTypes.func.isRequired,
  onSaveGeostore: PropTypes.func.isRequired,
  onFetchAnalysis: PropTypes.func.isRequired,
  setMapMode: PropTypes.func.isRequired,
  setAnalyzerOpen: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default ImportTabCoordinates;
