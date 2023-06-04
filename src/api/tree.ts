import request from './request'

export const reqAddTree = (data: Object) => request({
    url: '/tree/addTree',
    method: 'POST',
    data
})
export const reqGetTree = () => request({
    url: '/tree/getTree',
    method: 'GET'
})