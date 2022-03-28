/**
 * 文章评论列表请求模块
 */
import request from '@/utils/request'

/**
 * 获取文章列表
 */
export const getComments = params => {
    return request({
        method: 'GET',
        url: '/v1_0/comments',
        params
    })
}

/**
 * 发布评论
 */
export const postComments = data => {
    return request({
        method: 'POST',
        url: '/v1_0/comments',
        data
    })
}

/**
 * 点赞评论
 */
export const addCommentLike = commentId => {
    return request({
        method: 'POST',
        url: '/v1_0/comment/likings',
        data: {
            target: commentId
        }
    })
}

/**
 * 取消点赞评论
 */
export const deleteCommentLike = commentId => {
    return request({
        method: 'DELETE',
        url: `/v1_0/comment/likings/${commentId}`,
    })
}