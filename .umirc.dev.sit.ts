import { defineConfig } from '@umijs/max';

export default defineConfig({
  define:{
    "process.env":{
      UMI_ENV:'sit',
    },
  },
  proxy:{
    "/host/api":{
      "target":"http://47.109.18.206:8090",
      "changeOrigin":true,
      "pathRewrite":{"/host/api":''}
    }
  }
});

