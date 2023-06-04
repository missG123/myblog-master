import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user';

export const useUser = defineStore('user', {
    state: () => {
        return {
            token: localStorage.getItem('token'),
            userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : {}
        }
    },
    actions: {
        async login(number: String, pwd: String) {
            let res = await reqLogin({ number, pwd });
            console.log(res.data)
            if ((res as any).code == 200) {
                this.token = res.data.token;
                localStorage.setItem('token', res.data.token)
                this.getUserInfo()
            }
        },
        async getUserInfo() {
            let res = await reqUserInfo()
            if ((res as any).code == 200) {
                this.userInfo = res.data
                localStorage.setItem('userInfo', JSON.stringify(res.data))
            } else {
                localStorage.removeItem('token')
            }
        },
        logout() {
            this.userInfo = {}
            this.token = ''
            localStorage.removeItem('userInfo')
            localStorage.removeItem('token')
        }
    },
    getters: {}
})