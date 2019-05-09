import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class CustomAccordion extends PureComponent {
  render() {
    const {
      open,
      className,
      header,
      children
    } = this.props;
    const cNames = classnames('c-accordion', {
      '-closed': !open,
      [className]: className
    });

    return (
      <div className={cNames}>
        <div className="accordion-header">
          {header}
        </div>

        <div className="accordion-content">
          {children}
        </div>
      </div>
    );
  }
}

CustomAccordion.propTypes = {
  open: PropTypes.bool,
  header: PropTypes.element.isRequired,
  className: PropTypes.string,
  children: PropTypes.element.isRequired
};

CustomAccordion.defaultProps = {
  open: false,
  className: null
};

export default CustomAccordion;
