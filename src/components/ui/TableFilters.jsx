import React from 'react';

export default class TableFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      closed: true,
      value: '',
      sort: 1
    };

    // Bindings
    this.toggle = this.toggle.bind(this);
    this.onFilter = this.onFilter.bind(this);
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
    }
  }

  onFilter() {
    this.setState({
      value: this.input.value
    });
    this.props.onFilter && this.props.onFilter({
      field: this.props.field,
      value: this.input.value
    });
  }

  toggle() {
    const { closed } = this.state;
    window[closed ? 'addEventListener' : 'removeEventListener']('click', this.onScreenClick);
    this.setState({ closed: !closed }, () => closed && this.input.focus());
  }

  render() {
    return (
      <div ref={node => this.el = node} className="c-table-filters">
        <button onClick={this.toggle} className="filters-btn" />
        {this.state.closed ||
          <div className="filters-content">
            <input ref={node => this.input = node} type="search" onChange={this.onFilter} value={this.state.value} />
            <ul className="sort">
              <li><button onClick={() => this.props.onSort && this.props.onSort({ field: this.props.field, value: -1 })}>DESC</button></li>
              <li><button onClick={() => this.props.onSort && this.props.onSort({ field: this.props.field, value: 1 })}>ASC</button></li>
            </ul>
          </div>
        }
      </div>
    );
  }
}

TableFilters.propTypes = {
  onFilter: React.PropTypes.func,
  onSort: React.PropTypes.func,
  field: React.PropTypes.string.isRequired
};
TableFilters.defaultProps = {
  onChange: null
};
