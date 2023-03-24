import { defineConfig } from '@umijs/max';

export default defineConfig({
  define:{
    "process.env":{
      UMI_ENV:'sit',
    },
  },
  proxy:{
    "/host/api":{
      "target":"https://www.cd3yu.com/vip-test",
      "changeOrigin":true,
      "pathRewrite":{"/host/api":''}
    }
  }
});

