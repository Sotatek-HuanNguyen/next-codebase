export enum ResponseCode {
  SUCCESS = 200,
  UNAUTHORIZED = 401,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  PERMISSION = 403,
  SERVER_ERROR = 500,
}

export interface ResponseBase<T> {
  code: ResponseCode;
  success: boolean;
  message?: string;

  data: T;
  response_time: string;
  total?: number;
  last_page?: number;
  current_page?: number;
  meta?: MetaResponse;
}

export interface MetaResponse {
  total?: number;
  last_page?: number;
  current_page?: number;
}

export interface DataResponseError {
  message: string;
  code: ResponseCode;
  success: string;

  error: string;
  status: number;
  path: string;
}

export interface SuccessResponse<T> {
  success: boolean;
  dataVersion: string;
  data: T;
}

export interface FetchListOption {
  search_key?: string;
  limit: number;
  page: number;
  sortBy?: 'DESC' | 'ASC';
  time?: 'all' | 'daily' | 'weekly' | 'monthly';
  category?: number | null;
}
