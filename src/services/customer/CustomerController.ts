/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/v1/queryUserList */
export async function queryUserList(
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
  return request<API.Result_PageInfo_UserInfo__>('/vip-test-backend/customer/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function addUser(
  body?: API.CustomerInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>('/vip-test-backend/customer/save', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/user/${param0} */
export async function getUserDetail(
  params: {
    // path
    /** userId */
    customerId?: string;
  },
  options?: { [key: string]: any },
) {
  const { customerId: param0 } = params;
  return request<API.Result_UserInfo_>(`/vip-test-backend/customer/info/${param0}`, {
    method: 'GET',
    // params: { ...params },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/v1/user/${param0} */
export async function modifyUser(
  body?: API.CustomerInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>(`/vip-test-backend/customer/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/v1/user/${param0} */
export async function handleFreeze(
  params: {
    // path
    ids?: (string | undefined)[] | undefined ,
    type?: string
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_string_>(`/vip-test-backend/customer/delete/`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}


export async function imgUpload(
  formData?: any,
  options?: { [key: string]: any },
) {
  return request<API.Result>(`/vip-test-backend/upload/uploadBlobFile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
    ...(options || {}),
  });

}
  export async function handleCustomerCharge(
    formData?: any,
    options?: { [key: string]: any },
  ) {
    return request<API.Result>(`/vip-test-backend/charge/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: formData,
      ...(options || {}),
    });
  }


  export async function getCustomerChargeList(
    params: {
      // path
      /** userId */
      customerId?: string;
    },
    options?: { [key: string]: any },
  ) {
    return request<API.Result>(`/vip-test-backend/customer/chargeList`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        ...params,
      },
      ...(options || {}),
    });
  }