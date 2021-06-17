import Axios from 'axios';

import { API_BASE_URL } from '../constants/api';
import { loadStorage } from '../utils/localStorage';
import myLog from '../utils/myLog';

const axios = Axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/vnd.api+json',
  },
});

axios.interceptors.request.use(
  (config) => {
    let request = config;
    const state = loadStorage(`${window.origin}/state`);
    if (
      state &&
      state.loginState &&
      state.loginState.user &&
      state.loginState.user.authorization
    ) {
      request.headers['Authorization'] = state.loginState.user.authorization;
    }
    return request;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axios.interceptors.request.use((request) => {
  myLog(
    `------------------ \nRequest to ${request.method.toUpperCase()} ${
      request.url
    } with params`,
    request.params,
    `and data`,
    request.data
  );
  return request;
});

axios.interceptors.response.use((response) => {
  myLog(
    `------------------ \nResponse from ${response.config.method.toUpperCase()} ${
      response.config.url
    } with params`,
    response.config.params,
    `and data`,
    response.config.data,
    `and got response data ->`,
    response.data
  );
  return response;
});

export default axios;
