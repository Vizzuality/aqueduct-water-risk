import React from 'react';
import { Radio, Checkbox } from 'aqueduct-components';

export default class LayerList extends React.Component {

  getChildLayers(l) {
    if (!l.children || !l.children.length) {
      return null;
    }
    return (
      <ul>
        {l.children.map((layer, index) => {
          return (
            <li key={index}>
              <span><Radio name="layer" value={layer.id} />{layer.name}</span>
              {this.getChildLayers(layer)}
            </li>
          );
        })}
      </ul>
    );
  }

  getLayerList() {
    return this.props.layers.map((l, index) => {
      return (
        <li className="layerlist-item" key={index}>
          <span><Radio name="layer" value={l.id} />{l.name}</span>
          {this.getChildLayers(l)}
        </li>
      );
    });
  }

  render() {
    return (
      <div className="c-layerlist">
        <span className="advanced">
          Advanced settings
          <Checkbox />
        </span>
        <span className="layerlist-title">Indicators</span>
        <ul className="layerlist-list">
          {this.getLayerList()}
        </ul>
      </div>
    );
  }
}

LayerList.propTypes = {
  layers: React.PropTypes.array
};
