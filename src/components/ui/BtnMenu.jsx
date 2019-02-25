import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function BtnMenu(props) {
  const cNames = classnames('c-btn-menu', {
    [props.className]: props.className
  });

  return (
    <ul className={cNames}>
      {props.items.map((item, index) => (
        <li className="btn-menu-item" key={index}>
          <button className="btn-menu-btn" type="button" onClick={() => item.cb && item.cb(item)}>{item.label}</button>
        </li>
      ))}
    </ul>
  );
}

BtnMenu.propTypes = {
  items: PropTypes.array.isRequired,
  className: PropTypes.string
};
