import { defineConfig } from '@umijs/max';

export default defineConfig({
  define:{
    "process.env":{
      UMI_ENV:process.env.UMI_ENV,
      CAPTCHA_PREX:"RDPDEV-"
    },
    
  },
  proxy:{
    "/vip-test-backend":{
      "target":"http://localhost:8090",
      "changeOrigin":true,
      "pathRewrite":{"/vip-test-backend":''}
    },
  }
});

