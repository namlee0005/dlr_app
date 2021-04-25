import { extend } from 'umi-request';

// DEV;
export const BE = extend({
  prefix: 'http://207.148.73.181:8082',
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
        Authorization: `TOKEN_DLR`,
      },
    };
  }

  if (configs.headers) {
    return {
      ...configs,
      headers: {
        ...configs.headers,
        Authorization: `${token}`
      },
    };
  }
  return {
    ...configs,
    headers: {
      Authorization: `${token}`

    },
  };
};

export const privateRequest = async (request, url, configs, token) => {
  return request(url, injectBearer(token ? token : 'TOKEN_DLR', configs));
};

export const PATHS = {

  //getAllA1
  A1: `/api/v1.0/a1`,
  GET_IMAGE: (url) => `/image/${url}`,
  UPDATE_IMAGE: `/api/v1.0/image/upload`
};

export const AUTH_PATHS = {};
