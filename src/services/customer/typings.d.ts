/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace API {

  type CustomerGenderEnum = '男' | '女';

  interface CustomerInfo {
    id?: string;
    name?: string;
    /** nick */
    nickName?: string;
    /** email */
    email?: string;
    gender?: UserGenderEnum;
  }

  interface CustomerInfoVO {
    name?: string;
    /** nick */
    nickName?: string;
    /** email */
    email?: string;
  }
}
