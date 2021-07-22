import React from 'react';
import { func, object } from 'prop-types';
import { Icon } from 'aqueduct-components';

export default class AsideContext extends React.Component {

  getContent() {
    return this.props.aside.options.children ?
      <this.props.aside.options.children {...this.props.aside.options.childrenProps} /> : null;
  }

  render() {
    const {
      aside = {}
    } = this.props;
    const { opened } = aside;
    return (
      <div className={`l-sidebar c-sidebar -context -right ${opened ? '-opened' : ''}`}>
        <button
          type="button"
          className="l-sidebar-toggle btn-toggle -opened"
          onClick={() => this.props.toggleAside(false)}
        >
          <Icon name="icon-cross" className="-big" />
        </button>
        <div className='c-sidebar__content'>
          { this.getContent() }
        </div>
      </div>
    );
  }
}

AsideContext.propTypes = {
  // STORE
  aside: object,
  // ACTIONS
  toggleAside: func,
  setAsideOptions: func
};
