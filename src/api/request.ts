import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = import.meta.env.VITE_BASE_API;
import { useUser } from '@/store/user'


const request = axios.create({
    baseURL: import.meta.env.VITE_BASE_API,
    timeout: 8000,
    // withCredentials: true//异步请求携带cookie
});
request.interceptors.request.use(config => {
    // console.log(config)
    let store = useUser();
    config.headers.token = store.token;
    return config
}, error => {
    console.log('请求异常：' + JSON.stringify(error));
    return Promise.reject(error)
})



request.interceptors.response.use(response => {
    return response.data
}, error => {
    console.log('响应出错：' + error)
    return Promise.reject(error)
})

export default request;