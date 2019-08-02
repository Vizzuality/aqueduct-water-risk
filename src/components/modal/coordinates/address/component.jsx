import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Spinner } from 'aqueduct-components';

// utils
import { getErrorDetails } from './utils';

// constants
import { CSS_ADDRESS_CLASSES } from './constants';

class AddressForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      error: null
    };
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const { address: prevAddress } = prevState;
  //   const { address } = this.state;

  //   if (address && address.length && prevAddress !== address) this.getAddresLatLng();
  // }

  // onSelectAddress() { this.getAddresLatLng(); }

  onErrorAddress(status) {
    const error = getErrorDetails(status);

    this.setState({ error });
  }

  onSubmit(e) {
    e.preventDefault();
    this.getAddresLatLng();
  }

  getAddresLatLng(_address) {
    const {
      onAddPoint,
      onSaveGeostore,
      onFetchAnalysis,
      toggleModal,
      setMapMode,
      setAnalyzerOpen,
      onAddLocation
    } = this.props;

    this.setState({
      loading: true,
      address: _address
    }, () => {
      geocodeByAddress(this.state.address)
        .then((results) => {
          const location = results[0];

          if (location) {
            onAddLocation({
              location_name: location.formatted_address,
              input_address: location.formatted_address,
              match_address: '-'
            });
            return getLatLng(location);
          }

          return Promise.resolve();
        })
        .then((point) => {
          setMapMode('analysis');
          this.setState({ loading: false });

          onAddPoint(point);

          onSaveGeostore()
            .then(() => {
              onFetchAnalysis()
                .then(() => {
                  toggleModal(false, {});
                  setAnalyzerOpen(true);
                });
            });
        })
        .catch((error) => {
          console.error(error);
          this.setState({ loading: false });
        });
    });
  }

  handleAddress(address) { this.setState({ address }); }

  render() {
    const {
      loading,
      address,
      error
    } = this.state;

    return (
      <div className="c-address-geocoding">
        <form
          className="single-location-form"
          onSubmit={(e) => { this.onSubmit(e); }}
          noValidate
        >
          <Spinner isLoading={loading} />
          <div className="row">
            <div className="column small-12">
              <div className="c-field">
                <div className="label">
                  Search a location
                </div>
                <PlacesAutocomplete
                  inputProps={{
                    value: address,
                    onChange: (_address) => { this.handleAddress(_address); }
                  }}
                  classNames={CSS_ADDRESS_CLASSES}
                  onSelect={(_address) => { this.getAddresLatLng(_address); }}
                  onError={() => { this.onErrorAddress(); }}
                  clearItemsOnError
                />
                {error &&
                  (<p className="error">
                    {error}
                  </p>)
                }
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

AddressForm.propTypes = {
  onAddPoint: PropTypes.func.isRequired,
  onSaveGeostore: PropTypes.func.isRequired,
  onFetchAnalysis: PropTypes.func.isRequired,
  setMapMode: PropTypes.func.isRequired,
  setAnalyzerOpen: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  onAddLocation: PropTypes.func.isRequired
};

export default AddressForm;
