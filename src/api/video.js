import requestVideo from '@/utils/requestVideo'
// 非组件模块中获取store，必须通过这种方式
// import store from '@/store/'

//登录功能
export const getVideos = () => {
    return requestVideo({
        method: 'GET',
        url: '/api/videos/getVideo',
    })
}