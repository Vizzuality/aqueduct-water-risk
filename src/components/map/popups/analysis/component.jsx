import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Icon } from 'aqueduct-components';

class AnalysisPopup extends PureComponent {

  constructor(props) {
    super(props);


    const { data } = this.props;
    const { data: _data } = data;
    const { location_name: location } = _data;

    this.state = {
      locationName: location,
      readOnly: true
    };
  }

  handleLocationNameChange(e) {
    this.setState({ locationName: e.target.value });
  }

  confirmLocationName(e) {
    const { data: { data: _data }, onUpdateLocation } = this.props;
    const { locationName } = this.state;
    const updatedLocation = {
      location_name: locationName,
      input_address: _data.input_address,
      match_address: _data.match_address
    };

    if (e.key === 'Enter') {
      onUpdateLocation(updatedLocation);

      this.setState({ readOnly: true }, () => {
        if (this.inputRef) this.inputRef.focus();
      });
    }
  }

  toggleEditMode() {
    const { data: { data: _data }, onUpdateLocation } = this.props;
    const { readOnly } = this.state;
    this.setState({ readOnly: !readOnly }, () => {
      const {
        readOnly: nextReadOnly,
        locationName
      } = this.state;
      if (nextReadOnly === false && this.inputRef) this.inputRef.focus();

      if (nextReadOnly) {
        const updatedLocation = {
          location_name: locationName,
          input_address: _data.input_address,
          match_address: _data.match_address
        };

        onUpdateLocation(updatedLocation);
      }
    });
  }

  render() {
    const {
      data,
      onFetchAnalysis,
      onRemovePoint
    } = this.props;
    const { locationName, readOnly } = this.state;

    const { data: _data, columns } = data;
    const { location_name, ...restData } = _data;
    const _columns = columns.reduce((current, next) => ({
      ...current,
      [next.value]: next.label
    }), {});
    const inputClass = classnames('input-location-name', { '-editing': !readOnly });

    return (
      <div className="c-map-popup">
        {!!Object.keys(restData).length && (
          <header className="popup-header">
            <div className="input-container">
              <input
                className={inputClass}
                placeholder="Location name"
                value={locationName}
                readOnly={readOnly}
                ref={(_ref) => { this.inputRef = _ref; }}
                {...!readOnly && {
                  onChange: (e) => { this.handleLocationNameChange(e); },
                  onKeyPress: (e) => { this.confirmLocationName(e); }
                }}
              />
              <button
                type="button"
                className="edit-btn"
                onClick={() => { this.toggleEditMode(); }}
              >
                {readOnly && (
                  <Icon
                    name="icon-pencil"
                    className="pencil-icon"
                  />
                )}
                {!readOnly && (
                  <Icon
                    name="icon-check"
                    className="pencil-icon"
                  />
                )}
              </button>
            </div>
          </header>
        )}
        <div className="popup-content">
          {!Object.keys(restData).length && (
            <div className="warning">
              {`Data not available yet, `}
              <button
                type="submit"
                className="run-analysis-btn"
                onClick={onFetchAnalysis}
              >
                run the analysis
              </button>
              {` first`}
            </div>
          ) }
          {!!Object.keys(restData).length &&
            <table className="popup-table">
              <tbody>
                {Object.keys(restData).map(key => (
                _columns[key] && (
                  <tr
                    key={key}
                    className="dc"
                  >
                    <td className="dt">
                      {_columns[key]}:
                    </td>
                    <td className="dd">{_data[key]}</td>
                  </tr>
                )))}
              </tbody>
            </table>
          }
          <footer className="popup-footer">
            <div className="btn-container">
              <button
                type="button"
                className="remove-point-btn"
                onClick={onRemovePoint}
              >
                Delete point
              </button>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

AnalysisPopup.propTypes = {
  data: PropTypes.object,
  onRemovePoint: PropTypes.func.isRequired,
  onFetchAnalysis: PropTypes.func.isRequired,
  onUpdateLocation: PropTypes.func.isRequired
};

AnalysisPopup.defaultProps = {
  popup: {},
  data: {}
};

export default AnalysisPopup;
