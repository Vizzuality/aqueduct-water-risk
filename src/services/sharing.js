import axios from 'axios';

/**
 * fetchs a short version of the current URL
 *
 * @param {String} url - current URL of the site
 * @returns {Object} object containing the short URL and other metadata attributes
 */

export const fetchShortUrl = url =>
  axios.get('https://api-ssl.bitly.com/v3/shorten', {
    params: {
      longUrl: window.encodeURIComponent(url),
      login: config.BITLY_LOGIN,
      apiKey: config.BITLY_KEY
    }
  })
    .then((response) => {
      const { status_code: status, status_txt, data: { data } } = response;
      if (status >= 400) throw new Error(status_txt);
      return data;
    });

export default { fetchShortUrl };
