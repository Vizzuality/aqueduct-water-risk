import 'whatwg-fetch';

/* Constants */
const GET_DATASETS_SUCCESS = 'GET_DATASETS_SUCCESS';
const GET_DATASETS_ERROR = 'GET_DATASETS_ERROR';
const GET_DATASETS_LOADING = 'GET_DATASETS_LOADING';

/* Initial state */
const initialState = {
  list: [],
  loading: false,
  error: false
};

/* Reducer */
function datasetsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DATASETS_SUCCESS:
      return Object.assign({}, state, { list: action.payload.data, loading: false, error: false });
    case GET_DATASETS_ERROR:
      return Object.assign({}, state, { error: true, loading: false });
    case GET_DATASETS_LOADING:
      return Object.assign({}, state, { loading: true, error: false });
    default:
      return state;
  }
}

/* Action creators */
function getDatasets() {
  return (dispatch) => {
    // Waiting for fetch from server -> Dispatch loading
    dispatch({ type: GET_DATASETS_LOADING });
    // TODO: remove the date now
    fetch(new Request(`${config.API_URL}/dataset?application=aqueduct-water-risk&status=saved&includes=layer,vocabulary&page[size]=${Date.now()}`))
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response.statusText);
    })
    .then((datasets) => {
      const parsedDatasets = datasets.data.map(d => Object.assign({}, d.attributes, { id: d.id }));
      // Fetch from server ok -> Dispatch datasets
      dispatch({
        type: GET_DATASETS_SUCCESS,
        payload: {
          data: parsedDatasets
        }
      });
    })
    .catch((err) => {
      // Fetch from server ko -> Dispatch error
      dispatch({
        type: GET_DATASETS_ERROR,
        payload: err.message
      });
    });
  };
}

export { datasetsReducer, getDatasets };
