import request from './request'

export const reqGetPhoto = () => request({
    url: '/photo/getPhoto',
    method: 'GET'
})
export const reqDeletePhoto = (params: Object) => request({
    url: '/photo/deletePhoto',
    method: 'DELETE',
    params
})
export const reqGetPhotoPage = (params: Object) => request({
    url: '/photo/getPhotoPage',
    method: 'GET',
    params
})