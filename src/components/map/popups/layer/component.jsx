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

    if (!layers || !_data || !Object.keys(_data).length) {
      popup.remove();
      return null;
    }

    let output = [];

    layers.forEach((_layer) => {
      if (_layer.interactionConfig) output = [...output, ..._layer.interactionConfig.output];
    });

    const { name } = layers[0];

    const category = (_data || {}).label || '-';
    const _output = output.filter(o => o.property !== 'Category');

    return (
      <div className="c-map-popup">
        <header className="popup-header">
          <span className="layer-name">{name}: {category}</span>
        </header>
        <div className="popup-content">
          {_data &&
            <table className="popup-table">
              <tbody>
                {_output && _output.map((outputItem) => {
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
