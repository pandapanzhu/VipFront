import services from '@/services/login';
const { getUserInfo } = services.LoginController;
import  { RequestConfig, RunTimeLayoutConfig,Link,history  } from '@umijs/max';
import { message,Button } from 'antd';
import dayjs from 'dayjs';
import RightContent from './components/RightContent';
import NotFound from './components/NotFound';


// https://procomponents.ant.design/components/layout#prolayout
export const layout: RunTimeLayoutConfig = () => {
  return {
    logo: 'https://p7.itc.cn/images01/20211123/ca47074f55954f32a596141cc77aeb17.jpeg',
    layout: 'mix',
    headerTheme: 'light',
    navTheme: 'light',
    contentStyle: { background: '#fff' },
    rightContentRender: () => <RightContent />,
    // 自定义 403 页面
    unAccessible: (
      <NotFound
        status="403"
        title="403"
        subTitle="对不起！暂无该页面访问权限！请联系管理员或更换账号登录"
        extra={
          <>
             <Button type="primary">
               <Link to="/login">重新登录</Link>
             </Button>
           </>
         }
      />
    ),
    menu: {
      locale: false,
    }
  };
};


// 运行时配置
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export type InitialStateType = {
  currentUser?: API.userInfo;
  authArr?: string[];
  loading?: boolean;
};

export async function getInitialState(): Promise<InitialStateType> {
  const token = localStorage.getItem('api-token');
  const responseDate = { username: '会员管理系统',avatar:'https://p7.itc.cn/images01/20211123/ca47074f55954f32a596141cc77aeb17.jpeg'};
  if (!!token) {
    //在这里请求用户名
    const userInfo = await getUserInfo();
    responseDate.username = userInfo.data;
    const currentUser = responseDate;
    // return { currentUser, loading: false };
  }
  return { currentUser: responseDate };
}


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
      const token = localStorage.getItem("api-token");
      const url = config.url;
      if(url.indexOf('doLogin')>0 || url.indexOf('getCapture')>0){
        return { ...config };
      }
      if (!token) {
        message.warning("登录超时，请重新登录");
        history.push("/login") ;
      }else {
        if (config && config.headers) {
          // 拦截请求配置，进行个性化处理。
          config.headers['api-token']=token;
        }
        
        return { ...config };
        // const urlToken = url.concat('?token=' + token);
        // return { ...config, urlToken };
      }
      return { ...config };
    }
  ],
  responseInterceptors: [
    // 直接写一个 function，作为拦截器
    (response) => {
      const code = response.status;
      // 如果返回的401则跳转到登录页面，返回的402则提示已过期，需要续费
      if (401 == code) {
        message.warning("登录超时，请重新登录");
        history.push("/login") ;
      } else if (402 == code) {
        message.error("你的账户余额不足，请及时充值");
      }
      return response;
    }
  ]
};




