import React, { Fragment } from 'react'
import APP_DEFINITIONS from 'aqueduct-components'

const IndicatorDefinitions = () => {
  const {
    title,
    instructions,
    description,
    source
  } = APP_DEFINITIONS['water-risk']
  return (
    <Fragment>
      <div className="c-info">
        <div className="info-header">
          <div className="info-titles">
            <span className="info-title">{title}</span>
          </div>
        </div>
        <p className="info-description">
          <dl>
            <dt>Instructions:</dt>
            <dd>{instructions}</dd>
            <dt>Description:</dt>
            <dd>{description}</dd>
            <table>
              
              <tr></tr>
            </table>
            <dt>Source:</dt>
            <dd>{source}</dd>
          </dl>
        </p>
        <p className="info-description">
        </p>
      </div>
    </Fragment>
  )
}

export default IndicatorDefinitions;
