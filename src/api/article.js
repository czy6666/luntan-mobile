/**
 * 文章相关请求模块
 */
import request from '@/utils/request'

/**
 * 获取文章列表
 */
export const getArticles = params => {
    return request({
        method: 'GET',
        url: '/v1_0/articles',
        params

    })
}

/**
 * 获取文章详情
 */
export const getArticleById = art_id => {
    return request({
        method: 'GET',
        url: `/v1_0/articles/${art_id}`,
    })
}

/**
 * 点赞文章
 */
export const addLike = art_id => {
    return request({
        method: 'POST',
        url: '/v1_0/article/likings',
        data: {
            target: art_id
        }
    })
}

/**
 * 取消点赞文章
 */
export const deleteLike = art_id => {
    return request({
        method: 'DELETE',
        url: `/v1_0/article/likings/${art_id}`,
    })
}