/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace API {

  type CustomerGenderEnum = '男' | '女';

  interface CustomerInfo {
    customerId?: string;
    nickName?: string;
    mobile?: string;
    charge?: string;
    //用户状态
    status?: string;
    //会员类型
    type?: string;
    remark?: string;
    createTime?:Date;
    createBy?:string;
  }

  interface CustomerInfoVO {
    customerId?: string;
    avatar?: string;
    nickName?: string;
    mobile?: string;
    gender?: CustomerGenderEnum;
    realName?:string;
    idType?:string;
    idNum?:string;
    charge?: string;
    status?: string;
    remark?: string;
    createTime?:Date;
    createBy?:string;
    updateTime?:Date;
    updateBy?:string;
    //会员类型
    type?: string;
    expiredDate:Date
  }
}
