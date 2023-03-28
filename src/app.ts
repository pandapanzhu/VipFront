// 运行时配置
import { useNavigate } from 'react-router-dom';
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '用户' };
}


//在路由初始化或者变动时监听
export function onRouteChange() {
  const isLogin = localStorage.getItem('name');
//   history.pushState({
//     url: '/login',
//     title:'title'
    
// });
  // const route = matchRoutes(clientRoutes, location.pathname)?.pop()?.route;
  // if (route) {
  //   document.title = route.title || '';
  // }
}

export const layout = () => {
  return {
    logo: 'https://p7.itc.cn/images01/20211123/ca47074f55954f32a596141cc77aeb17.jpeg',
    // logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};
