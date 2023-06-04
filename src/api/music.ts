import request from './request'
export const reqAddMusic = (data: FormData) => request({
    url: '/music/addMusic',
    method: 'POST',
    data
})

export const reqGetMusicList = (params: Object) => request({
    url: '/music/getMusic',
    method: 'GET',
    params
})
export const reqDeleteMusic = (params: Object) => request({
    url: '/music/deleteMusic',
    method: 'DELETE',
    params
})