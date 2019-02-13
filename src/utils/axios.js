import axios from 'axios';

export const WRIAPI = axios.create({
  baseURL: config.API_URL,
  headers: { 'Content-Type': 'application/json' }
});

export default { WRIAPI };
