import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosRequestConfig} from 'axios';
import {BASE_API_URL, Endpoint} from './endpoint';
import store from 'store/configureStore';
import {ActionType as AuthenType} from 'store/authenticate';
import {ActionType as ContextType} from 'store/context';

let axiosClient = axios.create();
let count = -1;

export const setToken = async (
  accessToken: string,
  email?: string,
  password?: string,
) => {
  axiosClient.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${accessToken}`;
  console.log(accessToken, 'accessToken');
  try {
    await AsyncStorage.setItem('accessToken', `${accessToken}`);
    email && (await AsyncStorage.setItem('email', `${email}`));
    password && (await AsyncStorage.setItem('password', `${password}`));
  } catch (error) {}
};

export const saveRefreshToken = async (refreshToken: string) => {
  await AsyncStorage.setItem('refreshToken', `${refreshToken}`);
};

export const clearToken = async () => {
  axiosClient.defaults.headers.common['Authorization'] = '';

  await AsyncStorage.removeItem('accessToken');
  console.warn('xoasssssssssssss');
};

const requestAbordCode = 'ECONNABORTED';

axiosClient.defaults.baseURL = BASE_API_URL + 'v1/api';
axiosClient.defaults.headers.post['Content-Type'] = 'application/json';
axiosClient.defaults.timeout = 15000;

const RequestClient = class {
  constructor() {
    // this.init();
  }

  async init() {
    axiosClient.defaults.headers.common['Authorization'] =
      await AsyncStorage.getItem('accessToken');
  }
  async headers(params: any) {
    let keys = Object.keys(params);
    keys.map(key => {
      axiosClient.defaults.headers.common[key] = params[key];
    });
  }
  async get(endpoint: string, params = {}) {
    try {
      const response = await axiosClient.get(endpoint, {params: params});

      return response;
    } catch (error) {
      this.handleError(error, endpoint);
    }
  }
  async upload(endpoint: string, bodyParam: any) {
    try {
      let axiosConfig: AxiosRequestConfig = {
        headers: new Headers({
          Origin: `${BASE_API_URL}`,
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'PUT, GET, POST',
          'Access-Control-Allow-Headers':
            'Origin, X-Requested-With, Content-Type, Accept',
        }),
      };
      const response = await axiosClient.post(endpoint, bodyParam, axiosConfig);
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  async post(endpoint: string, body?: {}, params = {}) {
    try {
      console.log(axiosClient.defaults.headers);

      const response = await axiosClient.post(endpoint, body, params);

      return response;
    } catch (error) {
      this.handleError(error, endpoint);
    }
  }

  async put(endpoint: string, body: {}, params = {}) {
    try {
      const response = await axiosClient.put(endpoint, body, params);
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(endpoint: string, body: any) {
    try {
      const response = await axiosClient.delete(endpoint, {data: body});
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error: any, endpoint?: string) {
    console.warn(endpoint);
    console.warn(error.response.data);
    if (error.response && error.response.status === 401) {
      console.log('---LOGOUT---');
      // store.dispatch(logout());
      // if (endpoint?.indexOf('login') == -1 && endpoint?.indexOf('refreshtoken') == -1) this.refresh();
      return error.response;
    }
    if (
      error.code === requestAbordCode ||
      ('response' in error && error.response === undefined)
    ) {
      // delay(1000);
      error.recall = true;
    }

    throw error;
  }
};

const client = new RequestClient();

export {client};
