export const getErrorDetails = (status) => {
  let error;
  switch (status) {
    case 'ERROR': {
      error = 'There was a problem contacting the Google servers.';
      break;
    }
    case 'INVALID_REQUEST': {
      error = 'This request was invalid.';
      break;
    }
    case 'OVER_QUERY_LIMIT': {
      error = 'The webpage has gone over its request quota.';
      break;
    }
    case 'NOT_FOUND': {
      error = 'The referenced location was not found in the Places database.';
      break;
    }
    case 'REQUEST_DENIED': {
      error = 'The webpage is not allowed to use the PlacesService.';
      break;
    }
    case 'UNKNOWN_ERROR': {
      error = 'The PlacesService request could not be processed due to a server error. The request may succeed if you try again.';
      break;
    }
    case 'ZERO_RESULTS': {
      error = 'No result was found for this request.';
      break;
    }
    default: {
      error = 'Unexpected error.';
      break;
    }
  }

  return error;
};

export default { getErrorDetails };
