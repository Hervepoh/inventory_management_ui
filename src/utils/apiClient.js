import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8000/api/admin',
  headers: {
    Accept: 'application/json',
  },
  withXSRFToken: true,
  withCredentials: true,
});
