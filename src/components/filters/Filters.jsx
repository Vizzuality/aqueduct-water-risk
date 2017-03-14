import React from 'react';
import { Timeline, Icon, CustomSelect, RadioGroup } from 'aqueduct-components';
import { yearOptions, timeScaleOptions, spaceScaleOptions, projectionOptions } from 'constants/filters';

export default class Filters extends React.Component {
  render() {
    return (
      <div className="c-filters">
        {/* Year */}
        <div className="c-select">
          <div className="select-header">
            <span className="title">Timeframe</span>
            <button type="button" className="icon-container">
              <Icon name="icon-question" className="title-icon" />
            </button>
          </div>
          <Timeline
            items={yearOptions}
            selected={yearOptions.find(i => i.value === this.props.filters.year)}
            onChange={selected => this.props.setFilters({ year: selected.value })}
          />
        </div>
        <div className="row expanded">
          {this.props.filters.year === 'baseline' &&
            <div className="small-6 column">
              {/* Time scale */}
              <div className="c-select">
                <div className="select-header">
                  <span className="title">Time scale</span>
                  <button type="button" className="icon-container">
                    <Icon name="icon-question" className="title-icon" />
                  </button>
                </div>
                <CustomSelect
                  className="-fixed"
                  options={timeScaleOptions}
                  value={this.props.filters.timeScale}
                  onValueChange={selected => this.props.setFilters({ timeScale: selected.value })}
                />
              </div>
            </div>
          }
          <div className="small-6 column">
            {/* Space scale */}
            <div className="c-select">
              <div className="select-header">
                <span className="title">Scale</span>
                <button type="button" className="icon-container">
                  <Icon name="icon-question" className="title-icon" />
                </button>
              </div>
              <CustomSelect
                className="-fixed"
                options={spaceScaleOptions}
                value={this.props.filters.geoScale}
                onValueChange={selected => this.props.setFilters({ geoScale: selected.value })}
              />
            </div>
          </div>
        </div>
        {this.props.filters.year !== 'baseline' &&
          <div className="filters-group">
            <RadioGroup
              className="-inline -secondary"
              items={projectionOptions}
              defaultValue={this.props.filters.projection}
              name="projection"
              onChange={selected => this.props.setFilters({ projection: selected.value })}
            />
          </div>
        }
      </div>
    );
  }
}

Filters.propTypes = {
  filters: React.PropTypes.object,
  setFilters: React.PropTypes.func
};
