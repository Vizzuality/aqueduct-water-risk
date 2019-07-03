import React, { PureComponent } from 'react';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Spinner } from 'aqueduct-components';

// components
import DataTable from 'components/analyze-locations-tab/data-table';

class Analyzer extends PureComponent {
  componentDidMount() {
    const {
      geoStore,
      onFetchAnalysis
    } = this.props;

    if (geoStore) onFetchAnalysis();
  }

  componentWillReceiveProps(nextProps) {
    const { filters, onFetchAnalysis } = this.props;
    const {
      filters: nextFilters,
      geoStore
    } = nextProps;
    const filtersChanged = !isEqual(filters, nextFilters);

    if (filtersChanged && geoStore) onFetchAnalysis();
  }

  render() {
    const {
      points,
      analysis: { data, loading, downloadUrl },
      onApplyAnalysis
    } = this.props;
    const btnClass = classnames(
      'c-btn -light apply-analysis-btn',
      { '-disabled': !points.length }
    );

    return (
      <div className="c-analyzer">
        <div className="analyzer-content">
          <Spinner
            isLoading={loading}
            className="-transparent"
          />
          {(!data.length && !loading) && (
            <div className="no-data-container">
              <span className="no-data">
                Click on the map to select locations <br /> and then click &lsquo;Apply analysis&rsquo; button
              </span>
            </div>
          )}

          {(data.length > 0 && !loading) && (
            <div className="table-container">
              <DataTable />
            </div>
          )}

          {(downloadUrl && !loading) &&
            (<div className="download-container">
             Download as
             <ul>
               <li><a href={`${downloadUrl}&format=csv`}>CSV</a>,</li>
               <li><a href={`${downloadUrl}&format=shp`}>SHP</a>,</li>
               <li><a href={`${downloadUrl}&format=gpkg`}>GPKG</a></li>
             </ul>
            </div>)}
        </div>
        <div className="analyzer-footer">
          <button
            type="button"
            className={btnClass}
            onClick={onApplyAnalysis}
            disabled={!points.length}
          >
            Apply analysis
          </button>
        </div>
      </div>
    );
  }
}

Analyzer.propTypes = {
  filters: PropTypes.object.isRequired,
  geoStore: PropTypes.string,
  points: PropTypes.array.isRequired,
  analysis: PropTypes.object.isRequired,
  onFetchAnalysis: PropTypes.func.isRequired,
  onApplyAnalysis: PropTypes.func.isRequired
};

Analyzer.defaultProps = { geoStore: null };

export default Analyzer;
