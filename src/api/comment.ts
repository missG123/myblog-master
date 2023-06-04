import request from './request'

export const reqAddComment = (data: Object) => request({
    url: '/comment/addComment',
    method: 'POST',
    data
})
export const reqGetComment = (params: Object) => request({
    url: '/comment/getComment',
    method: 'GET',
    params
})
export const reqaddReply = (data: Object) => request({
    url: '/comment/addReply',
    method: 'POST',
    data
})