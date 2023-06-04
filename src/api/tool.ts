import request from './request'

export const reqToolsList = (params: Object) => request({
    url: '/tools/getToolList',
    method: 'GET',
    params
})
export const reqAddTool = (data: Object) => request({
    url: '/tools/addTool',
    method: 'POST',
    data
})
export const reqDeleteTool = (params: Object) => request({
    url: '/tools/deleteTool',
    method: 'DELETE',
    params
})