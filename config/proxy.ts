/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
    "/vip-test-backend":{
      "target":"http://localhost:8090",
      "changeOrigin":true,
      "pathRewrite":{"/vip-test-backend":''}
    },
  },
  test: {
    "/vip-test-backend":{
      "target":"http://47.109.18.206:8090",
      "changeOrigin":true,
      "pathRewrite":{"/vip-test-backend":''}
    }
  },
  sit: {
    "/vip-test-backend":{
      "target":"https://www.zeita.com.cn/vip-test",
      "changeOrigin":true,
      "pathRewrite":{"/vip-test-backend":''}
    }
  },
  pre: {
    "/vip-test-backend":{
      "target":"http://localhost:8090",
      "changeOrigin":true,
      "pathRewrite":{"/vip-test-backend":''}
    }
  },
} as any;
