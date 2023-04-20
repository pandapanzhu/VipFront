/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';
export async function doLogin(
  body?: API.LoginInfo,
  options?: { [key: string]: any },
) {
  return request<API.Result>('/host/api/login/doLogin', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}


export async function doLogout(
  options?: { [key: string]: any },
) {
  return request<API.Result>(`/host/api/login/logout`, {
    method: 'POST',
    ...(options || {}),
  });
}

/**
 * 
 * @param options 拿验证码的接口
 * @returns 
 */
export async function getCaptcha(
  options?: { [key: string]: any },
) {
  return request<API.Result>(`/host/api/login/getCaptcha`, {
    method: 'GET',
    ...(options || {}),
  });
}


/**
 * 
 * @param options 拿用户的用户名
 * @returns 
 */
 export async function getUserInfo(
  options?: { [key: string]: any },
) {
  return request<API.Result>(`/host/api/login/getUserInfo`, {
    method: 'GET',
    ...(options || {}),
  });
}