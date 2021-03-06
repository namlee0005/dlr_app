import { extend } from 'umi-request';

export const URL = 'http://dlr.namdev.tech';
export const URL_IMAGE = 'http://dlr.namdev.tech/image/';

export const BE = extend({
  prefix: 'http://dlr.namdev.tech',
});

BE.interceptors.response.use(
  async (response) => {
    // const data = await response.clone().json();
    if (!response.ok) {
      // console.error(data);
      return response;
    }
    return response;
  },
  { global: false },
);

export const injectBearer = (token, configs) => {
  if (!configs) {
    return {
      headers: {
        Authorization: 'TOKEN_DLR',
      },
    };
  }

  if (configs.headers) {
    return {
      ...configs,
      headers: {
        ...configs.headers,
        Authorization: `${token}`,
      },
    };
  }
  return {
    ...configs,
    headers: {
      Authorization: `${token}`,
    },
  };
};

export const privateRequest = async (request, url, configs, token) => {
  return request(url, injectBearer(token ? token : 'TOKEN_DLR', configs));
};

export const PATHS = {
  //getAllA1
  A1: '/api/v1.0/a1',
  GET_IMAGE: (url) => `/image/${url}`,
  UPDATE_IMAGE: '/api/v1.0/image/upload',
  TRAFFIC_SIGNS: (type, page, perPage) =>
    `/api/v1.0/traffic-signs?type=${type}&page=${page}&perPage=${perPage}`,
};

export const AUTH_PATHS = {};
