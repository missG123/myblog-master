import request from './request';
// 登录
export const reqLogin = (data: Object) => request({
    url: '/user/login',
    method: 'POST',
    data
})
// 获取用户信息
export const reqUserInfo = () => request({
    url: '/user/getUser',
    method: 'GET',
})
export const reqRegister = (data: Object) => request({
    url: '/user/register',
    method: 'POST',
    data
})
export const reqHasUser = (params: Object) => request({
    url: '/user/getHasUser',
    method: 'GET',
    params
})
export const reqCheckToken = () => request({
    url: '/user/checkToken',
    method: 'GET'
})