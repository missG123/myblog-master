<template>
    <div class="m_head_main">
        <h2 class="m_head_left" @click="goHome">小丑的博客</h2>
        <ul class="m_head_right">
            <li class="m_head_item" v-for="(item, index) in managerHead" :key="index" @click="manageGo(index)">{{ item }}
            </li>
        </ul>

    </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const managerHead = ['文章管理', '百宝箱管理', '音乐管理', '相册管理', '留言管理'];
const manageGo = function (index: number) {
    switch (index) {
        case 0:
            router.push('/managerPage/editBlog')
            break;
        case 1:
            router.push('/managerPage/boxmanager')
            break;
        case 2:
            router.push('/managerPage/musicmanager')
            break;
        case 3:
            router.push('/managerPage/photomanager')
            break;
        case 4:
            router.push('/managerPage/editBlog')
            break;
        default:
            router.push('/managerPage/editBlog')
    }
}

const goHome = () => {
    router.push('/home')
}

</script>
<style lang="less" scoped>
.m_head_main {
    font-family: serif;
    height: 70px;
    background-color: rgba(37, 36, 36, 0.7);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    padding: 0px 15px;

    .m_head_right {
        display: flex;

        .m_head_item {
            position: relative;
            font-size: 18px;
            padding: 0px 15px;

            &:hover {
                color: aquamarine;
            }

            &::after {
                position: absolute;
                bottom: -5px;
                left: 12px;
                content: "";
                width: 0px;
                border: 2px solid transparent;
                transition: all .5s;
            }

            &:hover::after {
                width: 80%;
                border: 2px solid rgb(87, 222, 213);
            }
        }
    }
}
</style>
