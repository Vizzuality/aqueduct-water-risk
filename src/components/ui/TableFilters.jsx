import React from 'react';

export default class TableFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      closed: true,
      value: ''
    };

    // Bindings
    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onScreenClick = this.onScreenClick.bind(this);
  }

  /* Component lifecycle */
  componentWillUnmount() {
    window.removeEventListener('click', this.onScreenClick);
  }

  onScreenClick(evt) {
    const clickOutside = this.el.contains && !this.el.contains(evt.target);
    if (clickOutside) {
      this.toggle();
      window.removeEventListener('click', this.onScreenClick);
    }
  }

  onChange() {
    this.setState({
      value: this.input.value
    });
    this.props.onChange && this.props.onChange({
      field: this.props.field,
      value: this.input.value
    });
  }

  toggle() {
    const { closed } = this.state;
    if (closed) {
      window.addEventListener('click', this.onScreenClick);
    }
    this.setState({ closed: !closed });
  }

  render() {
    return (
      <div ref={node => this.el = node} className="c-table-filters">
        <button onClick={this.toggle} className="filters-btn" />
        {this.state.closed ||
          <div className="filters-content">
            <input ref={node => this.input = node} type="search" onChange={this.onChange} value={this.state.value} />
          </div>
        }
      </div>
    );
  }
}

TableFilters.propTypes = {
  onChange: React.PropTypes.func,
  field: React.PropTypes.string.isRequired
};
TableFilters.defaultProps = {
  onChange: null
};
