import React from 'react';
import Dropzone from 'react-dropzone';
import { Spinner, post, toggleModal } from 'aqueduct-components';
import { dispatch } from 'main';
import { setPoints } from 'modules/analyzeLocations';

export default class ImportFileModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      accepted: [],
      rejected: [],
      dropzoneActive: false,
      loading: false,
      error: null
    };

    this.triggerOpenDialog = this.triggerOpenDialog.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  /**
   * DROPZONE EVENTS
   * - onDragEnter
   * - onDragLeave
   * - onDrop
  */
  onDragEnter() {
    this.setState({
      dropzoneActive: true
    });
  }

  onDragLeave() {
    this.setState({
      dropzoneActive: false
    });
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

  /**
   * HELPERS
   * - getFileName
   * - convertFile
  */

  getFileName() {
    const { accepted } = this.state;

    if (accepted.length) {
      const current = accepted[0];
      return current.name;
    }

    return 'Select file to import data';
  }

  convertFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    this.setState({ loading: true, error: null });

    post({
      type: 'POST',
      url: `${config.API_URL}/ogr/convert`,
      body: formData,
      multipart: true,
      onSuccess: (response) => {
        this.setState({ loading: false });
        // dispatch(setPoints(response.data.attributes.features, {}));
        dispatch(toggleModal(false, {}));
      },
      onError: (err) => {
        this.setState({ error: err, loading: false });
      }
    });
  }

  /**
   * UI EVENTS
   * - triggerOpenDialog
  */
  triggerOpenDialog() {
    this.dropzone.open();
  }

  render() {
    const { dropzoneActive, loading } = this.state;
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

            <p>List of supported file formats:</p>
            <ul>
              <li>Unzipped: .csv, .json, .geojson, .kml, .kmz (.csv files must contain a geom column that contains geographic information)</li>
              <li>Zipped: .shp (zipped shapefiles must include .shp, .shx, .dbf, and .prj files)</li>
            </ul>
          </header>

          <div className="dropzone-file">
            <div
              className="dropzone-file-name"
              // onClick={this.triggerOpenDialog} TODO: Yes or no?
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
        </Dropzone>
      </div>
    );
  }
}
