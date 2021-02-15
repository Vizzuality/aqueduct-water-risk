import axios from 'axios';

export const fetchCARTOQuery = ({ q, format }) => {
  const data = { q, format };

  return axios({
    method: 'POST',
    url: 'https://wri-rw.carto.com/api/v2/sql',
    data,
    responseType: 'blob'
  })
    .then((response) => {
      const { status, statusText, data } = response;
      if (status >= 300) throw new Error(statusText);
      return data;
    });
};

export const fetchQuery = (url, params) =>
  axios({
    url: 'https://wri-rw.carto.com/api/v2/sql',
    method: 'POST',
    data: params,
    headers: { 'content-type': 'application/json' }
  })
    .then((response) => {
      const { status, statusText, data } = response;
      if (status >= 300) throw new Error(statusText);
      return data;
    });

export default { fetchQuery, fetchCARTOQuery };
