/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';
export async function queryPersonStatistics(
  params: {
    startDate?: string;
    endDate?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result>('/vip-test-backend/statistics/person', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


export async function queryChargeStatistics(
  
  params: {
    startDate?: string;
    endDate?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result>(`/vip-test-backend/statistics/charge`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

