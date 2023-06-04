import axios from 'axios';
const service = axios.create({
    baseURL: '/mock',
    withCredentials: false,
    timeout: 6000
})
export default service;