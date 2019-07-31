import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class AnalysisPopup extends PureComponent {
  render() {
    const {
      data,
      onFetchAnalysis,
      onRemovePoint
    } = this.props;

    const { data: _data, columns } = data;
    const { location_name: location, ...restData } = _data;
    const _columns = columns.reduce((current, next) => ({
      ...current,
      [next.value]: next.label
    }), {});

    return (
      <div className="c-map-popup">
        <header className="popup-header">
          <span className="layer-name">Location: {location}</span>
        </header>
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
  onFetchAnalysis: PropTypes.func.isRequired
};

AnalysisPopup.defaultProps = {
  popup: {},
  data: {}
};

export default AnalysisPopup;
