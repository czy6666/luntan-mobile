//封装请求模块
import axios from "axios";
// 非组件模块中获取store，必须通过这种方式
// import store from '@/store/'


const requestVideo = axios.create({
    baseURL: 'http://localhost:5000'
})

//请求拦截
// request.interceptors.request.use(config => {
//     // Do something before request is sent
//     const { user } = store.state

//     //设置同一请求头
//     if (user) {
//         config.headers.Authorization = `Bearer ${user.token}`
//     }

//     return config
// }, err => {
//     // Do something with request error
//     return Promise.reject(err)
// })


//响应拦截

export default requestVideo