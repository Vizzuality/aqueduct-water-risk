import React from 'react';
import { Field, Input } from 'aqueduct-components';
import { store, dispatch } from 'main';
import { setPoints, saveOnGeostore } from 'modules/analyzeLocations';


export const FORM_ELEMENTS = {
  elements: {},
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

  constructor(props) {
    super(props);

    this.state = {
      form: {
        lat: '',
        lng: ''
      }
    };

    // BINDINGS
    this.onSetForm = this.onSetForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
            <Field
              ref={(c) => { if (c) FORM_ELEMENTS.elements.lat = c; }}
              onChange={value => this.onSetForm({ lat: value })}
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
                default: this.state.form.lat
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
                default: this.state.form.lng
              }}
            >
              {Input}
            </Field>
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
