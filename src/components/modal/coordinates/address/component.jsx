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

  onChangeAdress(address) { this.setState({ address }); }

  onSelectAddress() { this.getAddresLatLng(); }

  onErrorAddress(status) {
    const error = getErrorDetails(status);

    this.setState({ error });
  }

  onSubmit(e) {
    e.preventDefault();
    this.getAddresLatLng();
  }

  getAddresLatLng() {
    const {
      onAddPoint,
      onSaveGeostore,
      onFetchAnalysis,
      toggleModal,
      setMapMode,
      setAnalyzerOpen
    } = this.props;

    this.setState({ loading: true });

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
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
  }

  render() {
    const {
      loading,
      address,
      error
    } = this.state;

    return (
      <div className="c-address-geocoding">
        {/* single search  */}
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
                    onChange: (_address) => { this.onChangeAdress(_address); }
                  }}
                  classNames={CSS_ADDRESS_CLASSES}
                  onSelect={() => { this.onSelectAddress(); }}
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
  toggleModal: PropTypes.func.isRequired
};

export default AddressForm;
