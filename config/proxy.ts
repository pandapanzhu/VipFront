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
    "/host/api":{
      "target":"http://localhost:8090",
      "changeOrigin":true,
      "pathRewrite":{"/host/api":''}
    },
  },
  test: {
    "/host/api":{
      "target":"http://47.109.18.206:8090",
      "changeOrigin":true,
      "pathRewrite":{"/host/api":''}
    }
  },
  sit: {
    "/host/api":{
      "target":"https://www.cd3yu.com/vip-test",
      "changeOrigin":true,
      "pathRewrite":{"/host/api":''}
    }
  },
  pre: {
    "/host/api":{
      "target":"http://localhost:8090",
      "changeOrigin":true,
      "pathRewrite":{"/host/api":''}
    }
  },
} as any;
