import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({

  baseURL: 'http://3.7.23.30:3000/',

});

export default instance;
