export default{
    dev:{
        "/host/api":{
            "target":"http://localhost:8090",
            "changeOrigin":true,
            "pathRewrite":{"/host/api":''}
        }
    },
    test:{
        "/host/api":{
            "target":"http://47.109.18.206:8090",
            "changeOrigin":true,
            "pathRewrite":{"/host/api":''}
        }
    }
}