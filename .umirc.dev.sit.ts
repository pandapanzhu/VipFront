import { defineConfig } from '@umijs/max';

export default defineConfig({
  define: {
    "process.env": {
      UMI_ENV: 'sit',
      BASE_URL: '/viptest/'
    },
  },
  proxy: {
    "/vip-test-backend": {
      "target": "https://www.cd3yu.com/vip-test-backend",
      "changeOrigin": true,
      "pathRewrite": { "/vip-test-backend": '' }
    }
  },
  publicPath: '/viptest/',
  base: '/viptest/',
  history:{type:'hash'},
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
    {
      path: '/login',
      component: './Login',
      menuRender: false,
    },
    {
      name: '会员管理',
      path: '/customer',
      component: './Customer',
    },
    {
      name: '动账记录',
      path: '/charge',
      component: './Charge',
    },

  ],
});

