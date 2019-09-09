import axios from 'axios';

export const fetchQuery = (url, params) =>
  axios({
    url: 'https://cors-anywhere.herokuapp.com/http://wri-01.carto.com/api/v2/sql',
    method: 'POST',
    data: params,
    headers: { 'content-type': 'application/json' }
  })
  .then((response) => {
    const { status, statusText, data } = response;
    if (status >= 300) throw new Error(statusText);
    return data;
  });


export default { fetchQuery };
