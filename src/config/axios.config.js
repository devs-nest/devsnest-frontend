import axios from 'axios';

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_BASE_PROD_IP
      : process.env.REACT_APP_BASE_DEV_IP,
});

export default instance;
