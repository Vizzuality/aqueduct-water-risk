import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field, Input } from 'aqueduct-components';

// constants
import { FORM_ELEMENTS } from './constants';

class DecimalDegreesForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        lat: '',
        lng: ''
      }
    };
  }

  onSetForm(obj) {
    this.setState({
      form: {
        ...this.state.form,
        ...obj
      }
    });
  }

  onSubmit(e) {
    const {
      onAddPoint,
      onSaveGeostore,
      toggleModal,
      onFetchAnalysis,
      setMapMode,
      setAnalyzerOpen
    } = this.props;
    e.preventDefault();

    // Validate the form
    FORM_ELEMENTS.validate();

    // Set a timeout due to the setState function of react
    setTimeout(() => {
      const valid = FORM_ELEMENTS.isValid();
      if (valid) {
        const point = {
          lat: +this.state.form.lat,
          lng: +this.state.form.lng
        };
        setMapMode('analysis');
        onAddPoint(point);
        onSaveGeostore()
          .then(() => {
            onFetchAnalysis()
              .then(() => {
                toggleModal(false, {});
                setAnalyzerOpen(true);
              });
          });
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
            <Field
              ref={(c) => { if (c) FORM_ELEMENTS.elements.lat = c; }}
              onChange={(value) => { this.onSetForm({ lat: value }); }}
              validations={[
                'required',
                {
                  type: 'between',
                  condition: [-90, 90]
                }
              ]}
              properties={{
                name: 'lat',
                label: 'Latitude',
                type: 'number',
                max: 90,
                min: -90,
                required: true,
                default: lat
              }}
            >
              {Input}
            </Field>
          </div>
          <div className="column small-12 medium-6">
            <Field
              ref={(c) => { if (c) FORM_ELEMENTS.elements.lng = c; }}
              onChange={value => this.onSetForm({ lng: value })}
              validations={[
                'required',
                {
                  type: 'between',
                  condition: [-180, 180]
                }
              ]}
              properties={{
                name: 'lng',
                label: 'Longitude',
                type: 'number',
                max: 180,
                min: -180,
                required: true,
                default: lng
              }}
            >
              {Input}
            </Field>
          </div>
        </div>
        <div className="row align-right">
          <div className="column shrink">
            <div className="navigation">
              <button className="c-btn -primary -light">
                Add to map
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

DecimalDegreesForm.propTypes = {
  onAddPoint: PropTypes.func.isRequired,
  onSaveGeostore: PropTypes.func.isRequired,
  onFetchAnalysis: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  setMapMode: PropTypes.func.isRequired,
  setAnalyzerOpen: PropTypes.func.isRequired
};

export default DecimalDegreesForm;
