import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// utils
import { formatValue } from './utils';

class Popup extends PureComponent {
  render() {
    const {
      data,
      popup
    } = this.props;

    if (!data) return null;
    const {
      layers,
      data: _data
    } = data;

    const layer = layers[0];

    if (!layer || !_data || !Object.keys(_data).length) {
      popup.remove();
      return null;
    }

    const { name, interactionConfig } = layer;
    const { output } = interactionConfig || {};

    return (
      <div className="c-map-popup">
        <header className="popup-header">
          <span className="layer-name">{name}</span>
        </header>
        <div className="popup-content">
          {_data &&
            <table className="popup-table">
              <tbody>
                {output && output.map((outputItem) => {
                  const { column } = outputItem;
                  const columnArray = column.split('.');
                  const value = columnArray.reduce((acc, c) => acc[c], _data);
                  return (
                    <tr
                      key={outputItem.property || outputItem.column}
                      className="dc"
                    >
                      <td className="dt">
                        {outputItem.property || outputItem.column}:
                      </td>
                      <td className="dd">{formatValue(outputItem, value)}</td>
                    </tr>
                  );
                }
              )}
              </tbody>
            </table>
          }

          {(!_data) && 'No data available'}
        </div>
      </div>
    );
  }
}

Popup.propTypes = {
  popup: PropTypes.object,
  data: PropTypes.object
};

Popup.defaultProps = {
  popup: {},
  data: {}
};

export default Popup;
