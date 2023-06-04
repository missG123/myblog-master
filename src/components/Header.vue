<template>
    <div class="myHeader">
        <h2 class="blog_name" @click="goHome">小丑的博客</h2>
        <ul class="nav">
            <li class="nav_item set_after" v-for="(item, index) in menuList" :key="index" @click="goPage(index)">
                <span class="nav_icon">
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href='item.icon'></use>
                    </svg>
                </span>
                <span>{{ item.title }}</span>
            </li>

            <li class="nav_item login_icon">
                <span class="nav_icon">
                    <svg class="icon login_action" aria-hidden="true">
                        <use xlink:href="#icon-astronaut-moon"></use>
                    </svg>
                </span>

                <el-dropdown v-if="token">
                    <span class="el-dropdown-link">
                        {{ userInfo.name }}
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>


                <span v-else @click="goLogin">登录</span>

            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUser } from '@/store/user'
import { storeToRefs } from 'pinia';
// import { ref } from 'vue'
const store = useUser();
const { userInfo, token } = storeToRefs(store)
const router = useRouter();





const menuList = [{
    title: '首页',
    icon: '#icon-shouye'
}, {
    title: '文章',
    icon: '#icon-book'
}, {
    title: '百宝箱',
    icon: '#icon-baibaoxiang'
}, {
    title: '音乐',
    icon: '#icon-yinle3'
}, {
    title: '相册',
    icon: '#icon-xiangce'
}, {
    title: '留言',
    icon: '#icon-liuyanzhi'
}, {
    title: '关于',
    icon: '#icon-guanyudita'
}];
const goPage = function (index: number) {
    switch (index) {
        case 0:
            router.push('/home')
            break;
        case 1:
            router.push('/article')
            break;
        case 2:
            router.push('/mybox')
            break;
        case 3:
            router.push('/music')
            break;
        case 4:
            router.push('/photo')
            break;
        case 5:
            router.push('/message')
            break;
        case 6:
            router.push('/about')
            break;
        default:
            router.push('/home')
    }
}
const goLogin = () => {
    router.push('/login')
}
const logOut = () => {
    store.logout()
    // router.push('/home')
}

const goHome = () => {
    router.push('/home')
}

</script>
<style lang="less" scoped>
.icon {
    width: 24px;
    height: 24px;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}

.myHeader {
    display: flex;
    width: 100%;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    font-family: serif;
    position: absolute;
    top: 0;
    z-index: 10;

    .blog_name {
        padding-left: 20px;
    }

    .nav {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding-right: 20px;
        font-weight: 700;
        font-size: 18px;

        .nav_item {
            padding: 5px 20px;
            display: flex;
            position: relative;

            .nav_icon {
                padding-right: 5px;
            }
        }

        .set_after::after {
            display: block;
            content: '';
            height: 4px;
            width: 0%;
            background-color: rgb(87, 222, 213);
            position: absolute;
            bottom: 0;
            transition: width 0.3s linear;
        }

        .set_after:hover:after {
            width: 65%;
        }



        .login_icon {
            cursor: pointer;

            .el-dropdown {
                --el-dropdown-menuItem-hover-color: transparent;
                --el-dropdown-menuItem-hover-fill: transparent;
                --el-dropdown-menu-box-shadow: transparent;
                border: 1px solie transparent;
                text-decoration: none;
                outline: none;
                line-height: 30px;
                font-size: 18px;
                color: #fff;
            }

            .login_action {
                width: 34px;
                height: 34px;

            }
        }

        .login_icon:hover .login_action {
            // background-color: #fff;
            transform: rotate(180deg);
        }

    }

    .example-showcase .el-dropdown-link {
        cursor: pointer;
        color: var(--el-color-primary);
        display: flex;
        align-items: center;
    }
}
</style>
