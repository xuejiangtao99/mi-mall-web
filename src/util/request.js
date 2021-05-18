import axios from 'axios';
import storage from '../storage/index';
import {Message} from 'element-ui';
import baseURL from '../env';

let USER = 'USER'
// //环境切换
// if(process.env.VUE_APP_MODE === 'development'){
//     axios.defaults.baseURL = "http://127.0.0.1:8088/api/"
// }else{
//     axios.defaults.baseURL = "www.xjt.mi.com:8008/api/"
// }

// //设置请求超时
// axios.defaults.timeout = 10000;

// axios.delete.validateStatus = function(){

//      // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
//     return true;
// }

// //post请求头设置
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// //get请求头设置
// axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
// const USER = "user";
const service = axios.create({

    //环境切换
    baseURL: baseURL,
    //请求头
    headers: {

        get: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        post: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    },

    //请求10s超时
    timeout: 10 * 1000,

    validateStatus: function () {

        // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
        return true;
    },

    //在向服务器发请求之前，序列化请求数据，避免重复代码
    transformRequest: [function (data) {
        data = JSON.stringify(data)
        return data;
    }],

    //在传递then/catch前,修改响应数据
    transformResponse: [function (data) {

        if (typeof data === 'string' && data.startsWith('{')) {
            data = JSON.parse(data)

            return data;
        }
    }]
})

//请求拦截
service.interceptors.request.use(function (config) {

        let token = storage.getItem(USER)

        if (token) {
            //将token放到请求头发送给服务器,将tokenkey放在请求头中
            config.headers.accessToken = token;
            return config;
        }
    },
    error => {
        return Promise.error(error);
    }
)

//响应拦截 //错误拦截
service.interceptors.response.use(function (response) {

    //获取接口返回值
    let res = response.data;
    //状态码成功
    if (res.status == 200) {

        return res.data;
        //未登录
    } else if (res.status == 10001) {
        window.location.href = '/login'
        Message.error('请先登录')
    } else {
        Message.error(res.msg)
    }

    return response;
}, (error) => {

    if (error & error.response) {
        switch (error.response.status) {
            case 400:
                error.msg = "请求错误";
                break;
            case 401:
                error.msg = "未授权，请重新登录";
                break;
            case 403:
                error.msg = "拒绝访问";
                break;
            case 404:
                error.msg = "请求出错，未找到该资源";
                window.location.href = "/NotFound";
                break;
            case 405:
                error.msg = "请求方法未允许";
                break;
            case 408:
                error.msg = "请求超时";
                break;
            case 500:
                error.message = '服务器端出错'
                break;
            case 501:
                error.message = '网络未实现'
                break;
            case 502:
                error.message = '网络错误'
                break;
            case 503:
                error.message = '服务不可用'
                break;
            case 504:
                error.message = '网络超时'
                break;
            case 505:
                error.message = 'http版本不支持该请求'
                break;
            default:
                error.message = `连接错误${error.response.status}`
        }
    } else {
        //超时处理
        if (JSON.stringify(error).includes('timeout')) {
            Message.error('服务器响应超时，请刷新当前页')
        }

        //error.message = '连接服务器失败'

        Message.error("连接服务器失败")

    }
    return Promise.resolve(error)
})


export default service;

