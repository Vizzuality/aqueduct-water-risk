import axios from 'axios';

export const fetchQuery = (url, params) => {
  console.log(url, params)
  return axios.post(url, params, { headers: { 'Content-Type': 'application/json' } })
    .then((response) => {
      console.log(response)
      const { status, statusText, data } = response;
      if (status >= 300) throw new Error(statusText);
      return data;
    });
};


export default { fetchQuery };
