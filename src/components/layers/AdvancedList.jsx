import React from 'react';
import { Checkbox, Timeline, Radio, Icon } from 'aqueduct-components';
import { points } from 'constants/points';

export default class AdvancedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      custom: false
    };
  }

  getLayers(layers, deep) {
    const cNames = ['-rate'];
    if (!this.state.custom) cNames.push('-bloqued');
    return (
      <ul className="layerlist-list -advanced">
        {layers.map((l, index) => {
          return (
            <li className="layerlist-item" key={index}>
              {Array.isArray(l.ponderation) ?
                <span>
                  <span className="timeline-title">{l.name}</span>
                  <Timeline className={cNames.join(' ')} items={points} selected={{ value: '3' }} onChange={() => {}} />
                </span> :
                <span className={deep < 2 ? 'title -upper' : 'title'}>
                  <Radio
                    label={l.name}
                    onChange={i => this.props.onSelectLayer([i])}
                    name="layer"
                    value={l.id}
                    selected={this.props.activeLayers[0]}
                  />
                  {l.overall ?
                    <span className="custom">
                      <Checkbox
                        className="-reverse -inline"
                        label="Customize weights"
                        name="custom"
                        value="custom"
                        onChange={val => this.setState({ custom: val.checked })}
                      />
                    </span> :
                    <Icon className="item-icon" name="icon-info" />
                    }
                </span>
                }
              {l.children && l.children.length &&
                this.getLayers(l.children, deep + 1)
              }
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    return this.getLayers(this.props.layers, 0);
  }
}

AdvancedList.propTypes = {
  layers: React.PropTypes.array,
  activeLayers: React.PropTypes.array,
  onSelectLayer: React.PropTypes.func
};

AdvancedList.defaultProps = {
  layers: [],
  activeLayers: []
};
