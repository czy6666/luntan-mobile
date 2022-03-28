/**
 * 封装频道相关模块
 */
import request from '@/utils/request'

/**
 * 获取所有频道列表
 */
export const getAllChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/channels',
    })
}

/**
 * 添加频道列表
 */
// export const addChannel = channels => {
//     return request.put('/v1_0/user/channels', {
//         channels
//     })
// }
export const addChannel = channels => {
    return request({
        method: 'PUT',
        url: '/v1_0/user/channels',
        data: {
            channels
        }
    })
}

/**
 * 删除频道
 */
export const deleteChannel = channels => {
    return request({
        method: 'PUT',
        url: '/v1_0/user/channels',
        data: {
            channels
        }
    })
}