import React from 'react';
import { Field, Input, RadioGroup } from 'aqueduct-components';
import { store, dispatch } from 'main';
import { setPoints, saveOnGeostore } from 'modules/analyzeLocations';


export const FORM_ELEMENTS = {
  elements: {
  },
  validate() {
    const elements = this.elements;
    Object.keys(elements).forEach((k) => {
      elements[k].validate();
    });
  },
  isValid() {
    const elements = this.elements;
    const valid = Object.keys(elements)
      .map(k => elements[k].isValid())
      .filter(v => v !== null)
      .every(element => element);

    return valid;
  }
};

export default class CoordinatesForm extends React.Component {

  static convertDMSToDD({ degrees, minutes, seconds, cardinal }) {
    const dd = +degrees + (+minutes / 60) + (+seconds / (60 * 60));
    return (cardinal === 's' || cardinal === 'w') ? dd * -1 : dd;
  }

  constructor(props) {
    super(props);

    this.state = {
      form: {
        lat: {
          degrees: '',
          minutes: '',
          seconds: '',
          cardinal: 'n'
        },
        lng: {
          degrees: '',
          minutes: '',
          seconds: '',
          cardinal: 'w'
        }
      }
    };

    // BINDINGS
    this.onSetForm = this.onSetForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSetForm(obj, field) {
    const newField = {
      ...this.state.form[field],
      ...obj
    };

    this.setState({
      form: {
        ...this.state.form,
        [field]: newField
      }
    });
  }

  onSubmit(e) {
    e.preventDefault();

    // Validate the form
    FORM_ELEMENTS.validate();

    // Set a timeout due to the setState function of react
    setTimeout(() => {
      const valid = FORM_ELEMENTS.isValid();
      if (valid) {
        const point = {
          lat: CoordinatesForm.convertDMSToDD(this.state.form.lat),
          lng: CoordinatesForm.convertDMSToDD(this.state.form.lng)
        };
        const points = store.getState().analyzeLocations.points.list.slice();
        points.push(point);
        dispatch(setPoints(points));
        dispatch(saveOnGeostore(points));
      }
    }, 0);
  }

  render() {
    return (
      <form className="c-coordinates-form" onSubmit={this.onSubmit} noValidate>
        <div className="row">
          <div className="column small-12 medium-6">
            <div className="c-field">
              <div className="label">GPS (North/South) <abbr title="required">*</abbr></div>
            </div>
            <div className="c-field-container -inline">
              {/* Degrees */}
              <Field
                ref={(c) => { if (c) FORM_ELEMENTS.elements.lat_degrees = c; }}
                className="-inline"
                sufix="º"
                onChange={value => this.onSetForm({ degrees: value }, 'lat')}
                validations={[
                  'required',
                  {
                    type: 'between',
                    condition: [0, 90]
                  }
                ]}
                properties={{
                  name: 'lat_degrees',
                  type: 'number',
                  max: 90,
                  min: 0,
                  required: true,
                  default: this.state.form.lat.degrees
                }}
              >
                {Input}
              </Field>

              {/* Minutes */}
              <Field
                ref={(c) => { if (c) FORM_ELEMENTS.elements.lat_minutes = c; }}
                className="-inline"
                sufix="'"
                onChange={value => this.onSetForm({ minutes: value }, 'lat')}
                validations={[
                  'required',
                  {
                    type: 'between',
                    condition: [0, 60]
                  }
                ]}
                properties={{
                  name: 'lat_minutes',
                  type: 'number',
                  max: 60,
                  min: 0,
                  required: true,
                  default: this.state.form.lat.minutes
                }}
              >
                {Input}
              </Field>

              {/* Seconds */}
              <Field
                ref={(c) => { if (c) FORM_ELEMENTS.elements.lat_seconds = c; }}
                className="-inline"
                sufix="''"
                onChange={value => this.onSetForm({ seconds: value }, 'lat')}
                validations={[
                  'required',
                  {
                    type: 'between',
                    condition: [0, 60]
                  }
                ]}
                properties={{
                  name: 'lat_seconds',
                  type: 'number',
                  max: 60,
                  min: 0,
                  required: true,
                  default: this.state.form.lat.seconds
                }}
              >
                {Input}
              </Field>

              <RadioGroup
                name="lat_cardinal"
                items={[
                  { label: 'N', value: 'n' },
                  { label: 'S', value: 's' }
                ]}
                onChange={selected => this.onSetForm({ cardinal: selected.value }, 'lat')}
                defaultValue={this.state.form.lat.cardinal}
                className="-secondary -small"
              />
            </div>
          </div>
          <div className="column small-12 medium-6">
            <div className="c-field">
              <div className="label">GPS (West/East) <abbr title="required">*</abbr></div>
            </div>
            <div className="c-field-container -inline">
              {/* Degrees */}
              <Field
                ref={(c) => { if (c) FORM_ELEMENTS.elements.lng_degrees = c; }}
                className="-inline"
                sufix="º"
                onChange={value => this.onSetForm({ degrees: value }, 'lng')}
                validations={[
                  'required',
                  {
                    type: 'between',
                    condition: [0, 90]
                  }
                ]}
                properties={{
                  name: 'lng_degrees',
                  type: 'number',
                  max: 90,
                  min: 0,
                  required: true,
                  default: this.state.form.lng.degrees
                }}
              >
                {Input}
              </Field>

              {/* Minutes */}
              <Field
                ref={(c) => { if (c) FORM_ELEMENTS.elements.lng_minutes = c; }}
                className="-inline"
                sufix="'"
                onChange={value => this.onSetForm({ minutes: value }, 'lng')}
                validations={[
                  'required',
                  {
                    type: 'between',
                    condition: [0, 60]
                  }
                ]}
                properties={{
                  name: 'lng_minutes',
                  type: 'number',
                  max: 60,
                  min: 0,
                  required: true,
                  default: this.state.form.lng.minutes
                }}
              >
                {Input}
              </Field>

              {/* Seconds */}
              <Field
                ref={(c) => { if (c) FORM_ELEMENTS.elements.lng_seconds = c; }}
                className="-inline"
                onChange={value => this.onSetForm({ seconds: value }, 'lng')}
                sufix="''"
                validations={[
                  'required',
                  {
                    type: 'between',
                    condition: [0, 60]
                  }
                ]}
                properties={{
                  name: 'lng_seconds',
                  type: 'number',
                  max: 60,
                  min: 0,
                  required: true,
                  default: this.state.form.lng.seconds
                }}
              >
                {Input}
              </Field>

              <RadioGroup
                name="lng_cardinal"
                items={[
                  { label: 'W', value: 'w' },
                  { label: 'E', value: 'e' }
                ]}
                onChange={selected => this.onSetForm({ cardinal: selected.value }, 'lng')}
                defaultValue={this.state.form.lng.cardinal}
                className="-secondary -small"
              />
            </div>
          </div>
        </div>
        <div className="row align-right">
          <div className="column shrink">
            <div className="navigation">
              <button
                type="submit"
                className="c-btn -primary -light"
              >
                Add to map
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
