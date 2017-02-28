import React from 'react';
import { Radio, Checkbox } from 'aqueduct-components';

export default class LayerList extends React.Component {

  getLayerList(layers) {
    return (
      <ul className="layerlist-list">
        {layers.map((l, index) => {
          return (
            <li className="layerlist-item" key={index}>
              <span><Radio name="layer" value={l.id} />{l.name}</span>
              {l.children && l.children.length &&
                this.getLayerList(l.children)
              }
            </li>
          );
        })}
      </ul>);
  }

  render() {
    return (
      <div className="c-layerlist">
        <span className="advanced">
          Advanced settings
          <Checkbox />
        </span>
        <span className="layerlist-title">Indicators</span>
        {this.getLayerList(this.props.layers)}
      </div>
    );
  }
}

LayerList.propTypes = {
  layers: React.PropTypes.array
};
