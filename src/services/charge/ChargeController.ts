/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';
/** 此处后端没有提供注释 GET /api/v1/queryUserList */
export async function queryList(
  params: {
    // query
    /** keyword */
    keyword?: string;
    /** current */
    current?: number;
    /** pageSize */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__>('/host/api/charge/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


/** 此处后端没有提供注释 GET /api/v1/user/${param0} */
export async function getDetail(
  params: {
    // path
    chargeId?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>(`/host/api/charge/info/`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
