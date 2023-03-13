import { defineConfig } from '@umijs/max';

export default defineConfig({
  proxy:{
    "/host/api":{
      "target":"http://localhost:8080",
      "changeOrigin":true,
      "pathRewrite":{"/host":''}
    }
  }
});

