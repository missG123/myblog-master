import request from './request';


export const reqAddBlog = (data: BlogContent) => request({
    url: '/blog/addBlog',
    method: 'POST',
    data
})
export const reqGetBlog = () => request('/blog/getBlog');

export const reqDeleteBlog = (params: Object) => request({
    url: '/blog/deleteBlog',
    method: 'DELETE',
    params
})
export const reqGetBlogInfo = (params: Object) => request({
    url: '/blog/getBlogInfo',
    method: 'GET',
    params
})
export const reqUpdateBlog = (data: BlogContent) => request({
    url: '/blog/updateBlog',
    method: 'POST',
    data
})
export const reqBlogSignNum = () => request({
    url: '/blog/getSignNum',
    method: 'GET',
})
export const reqUpdateReadNum = (data: Object) => request({
    url: '/blog/updateReadNum',
    method: 'POST',
    data
})

export const reqGetBlogPage = (params: Object) => request({
    url: '/blog/getBlogPage',
    method: 'GET',
    params
})
export const reqBlogLatest = () => request({
    url: '/blog/getBlogLatest',
    method: "GET"
})
