//对于axios进行二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress';
import store from '@/store'
//引入进度条样式
import "nprogress/nprogress.css"
//start进度条开始，done进度条结束

//利用axios对象的方法create，去创建一个axios实例
//request就是axios
const requests = axios.create({
    //配置对象
    //基础路径，发请求的时候，路径中会出现api
    baseURL: '/api',
    //代表请求超过的时间5S
    timeout: 5000
})
//请求拦截器：在发请求之前，请求拦截器可以检测到
requests.interceptors.request.use((config) => {
    //config:配置对象，对象里面有一个属性很重要，headers请求头
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token
    }
    if (store.state.user.token) {
        //请求头的token，固定名字
        config.headers.token = store.state.user.token;
    }
    nprogress.start();
    return config;
})

//响应拦截器
requests.interceptors.response.use((res) => {
    //成功的回调函数：服务器响应数据回来以后，响应拦截器可以检测到
    nprogress.done();
    return res.data
}, (error) => {
    //响应失败的回调函数
    return Promise.reject(error)
})

//对外暴露
export default requests