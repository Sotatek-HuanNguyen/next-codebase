import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios';
import { i18n } from 'next-i18next';
import { ITokenInfo } from '~/interfaces';

import { getTokenInfo, setTokenInfo } from '../auth/auth.utils';
import { trimObject } from '../common';
import localStorageHelper, { KeyStorage } from '../localStorage';
import { getTokenStatus } from './../auth/auth.utils';
import { ResponseCode } from './api.types';

const needAuthUrl = ['/profile', '/logout'];

interface CustomHeaders {
  isAuth: boolean;
}

const REQ_TIMEOUT = 25 * 1000;
export const __DEV__ = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: REQ_TIMEOUT,
});

instance.interceptors.request.use((_config) => requestHandler(_config));

instance.interceptors.request.use((req) => {
  const isValidToken = getTokenStatus();
  if (req.url && needAuthUrl.includes(req.url) && !isValidToken) {
    refreshAccessToken();
  }
  return req;
});

const initHeader: CustomHeaders = { isAuth: true };

export const getAccessToken = async () => {
  const tokenInfo = await getTokenInfo();
  if (tokenInfo) {
    return tokenInfo?.access_token;
  }
  return null;
};

export const getRefreshToken = async () => {
  const tokenInfo = await getTokenInfo();
  if (tokenInfo) {
    return tokenInfo?.refresh_token;
  }
  return null;
};

const refreshAccessToken = async () => {
  const refreshToken = await getRefreshToken();
  try {
    const res: ITokenInfo = await post('/refresh-token', {
      refresh_token: refreshToken,
    });
    setTokenInfo(res);
  } catch (error) {
    localStorageHelper.remove(KeyStorage.X_TOKEN);
    window.location.href = `${i18n?.language}/account/login?expired=1`;
  }
};

export const getHeader = async (customHeaders?: CustomHeaders) => {
  const header: any = customHeaders || {};
  const initCustomHeader = customHeaders ? customHeaders : initHeader;
  if (!initCustomHeader?.isAuth) {
    delete header.Authorization;
  } else {
    const authToken = await getAccessToken();
    header.Authorization = `Bearer ${authToken}`;
  }
  return { ...header };
};

const requestHandler = (request: AxiosRequestConfig) => {
  if (__DEV__) {
    console.log(`Request API: ${request.url}`);
    console.log(`  + Params:     `, request.params);
    console.log(`  + Data:       `, request.data);
  }
  return request;
};

instance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

const errorHandler = (resError: AxiosError) => {
  const config: any = resError.config;
  if (resError?.response?.status === ResponseCode.UNAUTHORIZED) {
    // Unauthorized
    config._isRefreshToken = true;
  } else if (
    resError?.response?.status === ResponseCode.BAD_REQUEST ||
    resError?.response?.status === ResponseCode.NOT_FOUND ||
    resError?.response?.status === ResponseCode.PERMISSION
  ) {
    // throw resError?.response?.status;
  }

  if (__DEV__) {
    console.log(`Response API:`, resError);
  }

  throw resError?.response?.data || resError;
};

const successHandler = async (response: AxiosResponse) => {
  if (__DEV__) {
    console.log(`Response API: ${response.config.url}`, response.data);
  }
  const data: any = response.data;
  if (!data || data.status === 'INVALID_TOKEN' || data.code === ResponseCode.UNAUTHORIZED) {
    return;
  }

  // for get header data
  if (response.config.url?.includes('/content/download')) {
    return response;
  }

  return data;
};

async function fetch<ReqType, ResType>(
  url: string,
  params?: ReqType,
  customHeaders?: CustomHeaders,
  responseType?: ResponseType
): Promise<ResType> {
  const headers = await getHeader(customHeaders);
  return instance.get(url, { params, headers, responseType });
}

async function post<ReqType, ResType>(
  url: string,
  data?: ReqType,
  customHeaders?: CustomHeaders
): Promise<ResType> {
  const headers = await getHeader(customHeaders);
  return instance.post(url, { ...trimObject(data) }, { headers });
}

async function postDownloadPdf<ReqType, ResType>(
  url: string,
  data?: ReqType,
  customHeaders?: CustomHeaders
): Promise<ResType> {
  const headers = await getHeader(customHeaders);
  return instance.post(url, { ...trimObject(data) }, { headers, responseType: 'arraybuffer' });
}

async function postForm<ReqType, ResType>(
  url: string,
  data?: ReqType,
  customHeaders?: CustomHeaders
): Promise<ResType> {
  const headers = await getHeader(customHeaders);

  return instance.post(url, trimObject(data), { headers });
}

async function put<ReqType, ResType>(
  url: string,
  data?: ReqType,
  customHeaders?: CustomHeaders
): Promise<ResType> {
  const headers = await getHeader(customHeaders);
  return instance.put(url, { ...trimObject(data) }, { headers });
}

async function remove<ReqType, ResType>(
  url: string,
  data?: ReqType,
  customHeaders?: CustomHeaders
): Promise<ResType> {
  const headers = await getHeader(customHeaders);
  return instance.delete(url, { data: { ...data }, headers: { ...headers } });
}

const ApiUtils = { fetch, post, put, postForm, remove, postDownloadPdf };
export default ApiUtils;
