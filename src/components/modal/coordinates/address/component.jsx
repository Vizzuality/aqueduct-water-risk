import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// components
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Spinner } from 'aqueduct-components';

// utils
import { getErrorDetails } from './utils';

// constants
import { CSS_ADDRESS_CLASSES } from './constants';

class AddressForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { address: '' };
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
      toggleModal
    } = this.props;

    this.setState({ loading: true });

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then((point) => {
        this.setState({ loading: false });

        onAddPoint(point);
        onSaveGeostore();
        toggleModal(false, {});
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
      <form
        className="c-coordinates-form"
        onSubmit={(e) => { this.onSubmit(e); }}
        noValidate
      >
        <Spinner isLoading={loading} />
        <div className="row">
          <div className="column small-12">
            <div className="c-field">
              <div className="label">
                Search <abbr title="required">*</abbr>
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
        <div className="row align-right">
          <div className="column shrink">
            <div className="navigation">
              <button className="c-btn -primary -light" >
                Add to map
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

AddressForm.propTypes = {
  onAddPoint: PropTypes.func.isRequired,
  onSaveGeostore: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default AddressForm;
