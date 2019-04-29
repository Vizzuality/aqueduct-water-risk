import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import { Field, Input, RadioGroup } from 'aqueduct-components';

// utils
import { convertDMSToDD } from './utils';

// constants
import { FORM_ELEMENTS } from './constants';

class CoordinatesForm extends PureComponent {
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
    const {
      onAddPoint,
      onSaveGeostore,
      onFetchAnalysis,
      toggleModal,
      setMapMode
    } = this.props;

    e.preventDefault();

    // Validate the form
    FORM_ELEMENTS.validate();

    // Set a timeout due to the setState function of react
    setTimeout(() => {
      const { form: { lat, lng } } = this.state;
      const valid = FORM_ELEMENTS.isValid();
      if (valid) {
        const point = {
          lat: convertDMSToDD(lat),
          lng: convertDMSToDD(lng)
        };

        setMapMode('analysis');
        onAddPoint(point);
        onSaveGeostore()
          .then(() => { onFetchAnalysis(); });
        toggleModal(false, {});
      }
    }, 0);
  }

  render() {
    const { form: { lat, lng } } = this.state;

    return (
      <form
        className="c-coordinates-form"
        onSubmit={(e) => { this.onSubmit(e); }}
        noValidate
      >
        <div className="row">
          <div className="column small-12 medium-6">
            <div className="c-field">
              <div className="label">
                GPS (North/South) <abbr title="required">*</abbr>
              </div>
            </div>
            <div className="c-field-container -inline">
              {/* Degrees */}
              <Field
                ref={(c) => { if (c) FORM_ELEMENTS.elements.lat_degrees = c; }}
                className="-inline"
                sufix="º"
                onChange={(value) => { this.onSetForm({ degrees: value }, 'lat'); }}
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
                  default: lat.degrees
                }}
              >
                {Input}
              </Field>

              {/* Minutes */}
              <Field
                ref={(c) => { if (c) FORM_ELEMENTS.elements.lat_minutes = c; }}
                className="-inline"
                sufix="'"
                onChange={(value) => { this.onSetForm({ minutes: value }, 'lat'); }}
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
                  default: lat.minutes
                }}
              >
                {Input}
              </Field>

              {/* Seconds */}
              <Field
                ref={(c) => { if (c) FORM_ELEMENTS.elements.lat_seconds = c; }}
                className="-inline"
                sufix="''"
                onChange={(value) => { this.onSetForm({ seconds: value }, 'lat'); }}
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
                  default: lat.seconds
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
                onChange={({ value }) => { this.onSetForm({ cardinal: value }, 'lat'); }}
                selected={lat.cardinal}
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
                onChange={(value) => { this.onSetForm({ degrees: value }, 'lng'); }}
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
                  default: lng.degrees
                }}
              >
                {Input}
              </Field>

              {/* Minutes */}
              <Field
                ref={(c) => { if (c) FORM_ELEMENTS.elements.lng_minutes = c; }}
                className="-inline"
                sufix="'"
                onChange={(value) => { this.onSetForm({ minutes: value }, 'lng'); }}
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
                  default: lng.minutes
                }}
              >
                {Input}
              </Field>

              {/* Seconds */}
              <Field
                ref={(c) => { if (c) FORM_ELEMENTS.elements.lng_seconds = c; }}
                className="-inline"
                onChange={(value) => { this.onSetForm({ seconds: value }, 'lng'); }}
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
                  default: lng.seconds
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
                onChange={({ value }) => { this.onSetForm({ cardinal: value }, 'lng'); }}
                selected={lng.cardinal}
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

CoordinatesForm.propTypes = {
  onAddPoint: PropTypes.func.isRequired,
  onSaveGeostore: PropTypes.func.isRequired,
  onFetchAnalysis: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  setMapMode: PropTypes.func.isRequired
};

export default CoordinatesForm;
