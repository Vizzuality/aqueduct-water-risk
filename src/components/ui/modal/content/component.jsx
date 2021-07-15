import React from 'react';
import { node, string } from 'prop-types';

const ContentModal = ({ name, description = null, children }) => (
  <div className="c-info">
    { name &&
      <div className="info-header">
        <div className="info-titles">
          <span className="info-title">{name}</span>
        </div>
      </div>
    }
    { description && <p className="info-description">{description}</p> }
    { children }
  </div>
);

ContentModal.propTypes = {
  name: string,
  description: string,
  children: node
};

export default ContentModal;
