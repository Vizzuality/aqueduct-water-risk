import React from 'react';
import { func, object } from 'prop-types';
import { Icon, Sidebar } from 'aqueduct-components';

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
    console.log('Rendered', this.props)
    return (
      <Sidebar
        className={`-context -right ${opened ? '-opened' : ''}`}
        setSidebarWidth={() => null}
        opened={false}
      >
        <button
          type="button"
          className="l-sidebar-toggle btn-toggle -opened"
          onClick={() => this.props.toggleAside(false)}
        >
          <Icon name="icon-cross" className="-big" />
        </button>
        { this.getContent() }
      </Sidebar>
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
