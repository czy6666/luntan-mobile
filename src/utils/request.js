//封装请求模块
import axios from "axios";
// 非组件模块中获取store，必须通过这种方式
import store from '@/store/'
import { Toast } from "vant";
import router from '@/router/'

const request = axios.create({
    baseURL: 'http://www.liulongbin.top:8000'
})
const refreshTokenRequest = axios.create({
    baseURL: 'http://www.liulongbin.top:8000'
})

//请求拦截器  发请求之前，拦截器可以监测到
request.interceptors.request.use((config) => {
    //config 配置对象 
    const {
        user
    } = store.state
    if (user) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config;
})


// 响应失败
request.interceptors.response.use((response) => {
    return response;
}, async function(error) {
    console.log(error.responsestatus);
    const status = error.response.status;
    if (status == 400) {
        // 参数错误
        Toast.fail('请求参数错误~')
    } else if (status == 401) {
        // token无效
        // 如果没有user 则跳转登录页重新登录
        // 有user  拿着刷新token去重新登录
        const {
            user
        } = store.state;
        if (!user || !user.token) {
            // 未登录 重新登录
            Toast.fail('身份认证过期，请重新登录~')
            redirectLogin()
        } else {
            try {
                const {
                    data
                } = await refreshTokenRequest({
                    url: '/app/v1_0/authorizations',
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${user.refresh_token}`
                    }
                })
                console.log(112);
                user.token = data.data.token;
                store.commit('SETUSER', user);
                // 处理完usertoken 重新发起请求
                return request(error.config);
            } catch (error) {
                // 刷新失败 直接跳转登录页
                Toast.fail('登录验证失败，请重新登录~');
                store.state.user = null;
                store.commit('REMOVECACHEPAGE', 'layout');
                redirectLogin()
            }
        }
    } else if (status == 403) {
        // 无权限
        Toast.fail('您没有权限~')
    } else if (status >= 500) {
        // 服务端异常
        Toast.fail('服务端出现异常，操作失败~')
    }

    return Promise.reject(error)
})

function redirectLogin() {
    router.replace({
        name: 'login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    })
}


export default request