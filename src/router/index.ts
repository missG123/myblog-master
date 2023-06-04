import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: "/home",
        meta: { isShow: true },
    },
    {
        path: "/home",
        name: 'Home',
        meta: { isShow: true },
        component: () => import('@/pages/Home/index.vue')
    }, {
        path: "/login",
        name: 'Login',
        meta: { isShow: false },
        component: () => import('@/pages/Login.vue')
    },
    {
        path: "/article",
        name: 'Article',
        meta: { isShow: true },
        component: () => import('@/pages/Article.vue')
    },
    {
        path: "/blogshow",
        name: 'BlogShow',
        meta: { isShow: true },
        component: () => import('@/pages/BlogShow.vue')
    },
    {
        path: "/mybox",
        name: 'MyBox',
        meta: { isShow: true },
        component: () => import('@/pages/MyBox.vue')
    }, {
        path: "/music",
        name: 'Music',
        meta: { isShow: true },
        component: () => import('@/pages/Music.vue')
    }, {
        path: "/photo",
        name: 'Photo',
        meta: { isShow: true },
        component: () => import('@/pages/Photo.vue')
    }, {
        path: "/message",
        name: 'Message',
        meta: { isShow: true },
        component: () => import('@/pages/Message.vue')
    }, {
        path: "/about",
        name: 'About',
        meta: { isShow: true },
        component: () => import('@/pages/About.vue')
    }, {
        path: "/managerPage",
        name: 'ManagerHome',
        component: () => import('@/pages/Manager/ManagerHome.vue'),
        meta: { isShow: false },
        children: [
            // {
            //     path: '/managerPage',
            //     // 重定向
            //     redirect: '/managerPage/editBlog',
            // },
            {
                path: "editBlog",
                component: () => import('@/pages/Manager/Manager_layout/EditBlog.vue')
            },
            {
                path: "boxmanager",
                component: () => import('@/pages/Manager/Manager_layout/BoxManager.vue')
            }, {
                path: "musicmanager",
                component: () => import('@/pages/Manager/Manager_layout/MusicManager.vue')
            }, {
                path: "photomanager",
                component: () => import('@/pages/Manager/Manager_layout/PhotoManager.vue')
            }, {
                path: "edit",
                component: () => import('@/pages/Manager/Manager_layout/Edit.vue')
            }, {
                path: "blogShow",
                component: () => import('@/pages/Manager/Manager_layout/BlogShow.vue')
            },]
    }
];





const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// router.beforeEach((to, from, next) => {
//     console.log(to, '-------')
//     let reg: RegExp = new RegExp(/^\/managerPage/)
//     if (reg.test(to.path)) {
//         next()
//     } else {
//         next()
//     }
// })
export default router;