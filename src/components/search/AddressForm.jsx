import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { Spinner, toggleModal } from 'aqueduct-components';
import { store, dispatch } from 'main';
import { setPoints, saveOnGeostore } from 'modules/analyzeLocations';

export default class AddressForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      address: ''
    };

    // BINDINGS
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeAdress = this.onChangeAdress.bind(this);
    this.onSelectAddress = this.onSelectAddress.bind(this);
    this.onErrorAddress = this.onErrorAddress.bind(this);
  }

  onChangeAdress(address) {
    this.setState({ address });
  }

  onSelectAddress() {
    this.getAddresLatLng();
  }

  onErrorAddress(status) {
    switch (status) {
      case 'ERROR': {
        this.setState({ error: 'There was a problem contacting the Google servers.' });
        break;
      }
      case 'INVALID_REQUEST': {
        this.setState({ error: 'This request was invalid.' });
        break;
      }
      case 'OVER_QUERY_LIMIT': {
        this.setState({ error: 'The webpage has gone over its request quota.' });
        break;
      }
      case 'NOT_FOUND': {
        this.setState({ error: 'The referenced location was not found in the Places database.' });
        break;
      }
      case 'REQUEST_DENIED': {
        this.setState({ error: 'The webpage is not allowed to use the PlacesService.' });
        break;
      }
      case 'UNKNOWN_ERROR': {
        this.setState({ error: 'The PlacesService request could not be processed due to a server error. The request may succeed if you try again.' });
        break;
      }
      case 'ZERO_RESULTS': {
        this.setState({ error: 'No result was found for this request.' });
        break;
      }
      default: {
        this.setState({ error: 'Unespected error.' });
        break;
      }
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.getAddresLatLng();
  }

  getAddresLatLng() {
    this.setState({ loading: true });

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then((point) => {
        this.setState({ loading: false });

        const points = store.getState().analyzeLocations.points.list.slice();
        points.push(point);

        dispatch(setPoints(points));
        dispatch(saveOnGeostore(points));
        dispatch(toggleModal(false, {}));
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false });
      });
  }

  render() {
    const { loading, address, error } = this.state;
    return (
      <form className="c-coordinates-form" onSubmit={this.onSubmit} noValidate>
        <Spinner isLoading={loading} />
        <div className="row">
          <div className="column small-12">
            <div className="c-field">
              <div className="label">Search <abbr title="required">*</abbr></div>
              <PlacesAutocomplete
                inputProps={{
                  value: address,
                  onChange: this.onChangeAdress
                }}
                onSelect={this.onSelectAddress}
                onError={this.onErrorAddress}
                clearItemsOnError
              />
              {error &&
                <p className="error">
                  {error}
                </p>
              }
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
