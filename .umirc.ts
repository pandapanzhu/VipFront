import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '会员管理系统',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
    },
    // {
    //   name: '权限演示',
    //   path: '/access',
    //   component: './Access',
    // },
    // {
    //     name: ' CRUD 示例',
    //     path: '/table',
    //     component: './Table',
    // },
    {
      name: ' 会员管理',
      path: '/customer',
      component: './Customer',
    },
    {
    name: ' 动账记录',
    path: '/charge',
    component: './Charge',
  },
  ],
  npmClient: 'pnpm',
  proxy:{}
});

