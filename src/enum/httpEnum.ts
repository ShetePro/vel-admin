/**
 * @description: 响应状态
 */
export enum ResultEnum {
  SUCCESS = 200,
  ERROR = 401,
  TIMEOUT = 500,
  TYPE = 'success',
  TOKEN_ERROR = 102
}

/**
 * @description: 请求方法
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

/**
 * @description:  连接类型
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
  OCTET_STREAM = 'application/octet-stream'
}
