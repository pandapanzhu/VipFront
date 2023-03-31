// 运行时配置
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  const token = localStorage.getItem('token');
  if (!!token) {
    //在这里请求用户名
    const userInfo = await getUserInfo();
    return { name: userInfo.data };
  } else {
    return { name: '' };
  }
}
import services from '@/services/login';
const { getUserInfo } = services.LoginController;
import type { RequestConfig } from '@umijs/max';
import { message } from 'antd';
import dayjs from 'dayjs';

export const request: RequestConfig = {
  timeout: 30000,
  errorConfig: {
    errorHandler() {
    },
    errorThrower() {
    }
  },
  requestInterceptors: [
    (config: Request) => {
      const token = localStorage.getItem("token");
      const url = config.url;
      if (!token) {
        message.warning("登录超时，请重新登录");
        // window.location.href = "/login";
      } else if (url.indexOf('doLogin') > 0) {
        //登录接口直接放过
        return { ...config };
      }
      else {
        // 拦截请求配置，进行个性化处理。
        const urlToken = url.concat('?token=' + token);
        return { ...config, urlToken };
      }
      return { ...config };
    }
  ],
  responseInterceptors: [
    // 直接写一个 function，作为拦截器
    (response) => {
      const code = response.status;
      console.log(response);
      if (response?.config?.url?.indexOf('doLogin') && 200 == code) {
        //如果是登录接口并且登录成功，那这里就需要把token放进去
        const data: API.TokenInfo = response.data;
        //这里返回的是个对象，包含了token，以及还有多久过期
        localStorage.setItem('token', data.token ?? '');
        const expireTime = data.expireTime;
        if (!!expireTime) {
          const diffDay = dayjs(expireTime).diff(dayjs(), 'day')
          if (diffDay <= 30) {
            message.error("你的账户有效期不足【" + diffDay + "】天，请及时充值");
          }
        }

      }
      // 如果返回的401则跳转到登录页面，返回的402则提示已过期，需要续费

      if (401 == code) {
        message.warning("登录超时，请重新登录");
        window.location.href = "/login";
      } else if (402 == code) {
        message.error("你的账户余额不足，请及时充值");
      }
      return response;
    }
  ]
};

export const layout = () => {
  return {
    logo: 'https://p7.itc.cn/images01/20211123/ca47074f55954f32a596141cc77aeb17.jpeg',
    // logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    // menuHeaderRender:true,
    // layout:'top',
    // loading:true,
    // iconfontUrl:'https://p7.itc.cn/images01/20211123/ca47074f55954f32a596141cc77aeb17.jpeg',
    // avatarProps:{src:'https://p7.itc.cn/images01/20211123/ca47074f55954f32a596141cc77aeb17.jpeg'},
    links:['退出登录'],
  };
};
