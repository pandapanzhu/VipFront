/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace API {
  interface LoginInfo {
    username?: string;
    password?: string;
    captcha?: string;
    remenberMe?:boolean;
  }

  interface TokenInfo {
    token?: string;
    //过期的时间，超过小于一个月就提醒
    expireTime?: string;
  }
}
