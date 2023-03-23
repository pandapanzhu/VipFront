import { defineConfig } from '@umijs/max';

export default defineConfig({
  define:{
    "process.env":{
      UMI_ENV:process.env.UMI_ENV,
    },
    
  },
  proxy:{
    // "/host/api":{
    //   "target":"http://localhost:8090",
    //   "changeOrigin":true,
    //   "pathRewrite":{"/host/api":''}
    // }
  }
});

