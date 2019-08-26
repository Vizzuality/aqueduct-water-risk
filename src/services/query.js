// utils
import axios from 'axios';

export const fetchCARTOQuery = params => console.log(JSON.stringify(params)) ||
  axios.post('https://wri-01.carto.com/api/v2/sql?q=SELECT%20%2A%20FROM%20get_aqpoints_annual_02%28%27[%27%27Point%28-61.875%20-5.44102230371796%29%27%27,%20%27%27Point%28-60.64453125%20-27.5277582068619%29%27%27]%27,%20%27[%27%27Location%201%27%27,%27%27Location%202%27%27]%27,%20%27[null,%20null]%27,%20%27[null,%20null]%27%29&format=shp')
  // axios.post('https://wri-01.carto.com/api/v2/sql', JSON.stringify(params))
    .then((response) => {
      const { status, statusText, data } = response;
      if (status >= 300) throw new Error(statusText);
      return data;
    });

export default { fetchCARTOQuery };
