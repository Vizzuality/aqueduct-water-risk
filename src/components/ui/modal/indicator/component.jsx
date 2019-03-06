import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

class IndicatorModal extends PureComponent {

  renderSource(source = {}, index) {
    const { info: { sources } } = this.props;

    if (source.link) {
      return (
        <a
          key={index}
          href={source.link}
          rel="noopener noreferrer"
          target="_blank"
        >
          {source.name}
          {(index + 1) < sources.length && '; ' }
        </a>
      );
    }

    return (
      <span key={index}>
        {source.name}
        {(index + 1) < sources.length && '; ' }
      </span>);
  }
  render() {
    const {
      info: {
        name,
        description,
        sources
      }
    } = this.props;

    return (
      <div className="c-info">
        <div className="info-header">
          <div className="info-titles">
            <span className="info-title">{name}</span>
          </div>
        </div>
        <div className="info-description">
          <dl>
            <dt>Description:</dt><br />
            <dd>{description || 'Not available'}</dd>

            {!!sources.length && (
              <Fragment>
                <dt>{sources.length > 1 ? 'Sources' : 'Source'}:</dt>
                <dd>{sources.map((_source, index) => this.renderSource(_source, index))}
                </dd>
              </Fragment>
          )}
          </dl>
        </div>
      </div>
    );
  }
}

IndicatorModal.propTypes = { info: PropTypes.object.isRequired };

export default IndicatorModal;
