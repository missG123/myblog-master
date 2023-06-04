<template>
    <div class="message_page">
        <div class="message_head">
            <div class="tree_content">
                <div class="tree_put">
                    <h3 class="tree_title">树洞</h3>
                    <div class="input_send">
                        <input class="tree_send" type="text" placeholder="留下点什么吧~" @keyup.enter="goSub"
                            v-model="treeText" />
                    </div>
                </div>




                <div class="tree_show">
                    <div class="tree_item" v-for="(item, index) in testList " :key="index"
                        :style="{ left: item.left + '%', top: item.top + 'px', animationName: 'tree_move', animationDuration: item.rate + 's', animationTimingFunction: 'linear', animationIterationCount: 'infinite' }">
                        <el-avatar :size="32" :src="getImgUrl(item.treeImg)" class="tree_avatar" />
                        <span>{{ item.treeText }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="message_content">
            <Comment blogId="01"></Comment>
        </div>

    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Comment from '@/components/Comment.vue'
import { reqAddTree, reqGetTree } from '@/api/tree'
const treeText = ref('');

const testList = ref<Array<TreeContent>>([])

onMounted(async () => {
    let res = await reqGetTree();
    if ((res as any).code == 200) {
        console.log(res.data)
        testList.value = res.data
    }
})
const getImgUrl = (imgUrl: string) => {
    return new URL(`../assets/image/${imgUrl}`, import.meta.url).href;
}
const goSub = async () => {
    let imgnum = Math.floor(Math.random() * 10)
    let top = Math.floor(Math.random() * 390)
    let rate = Math.random() * (13 - 7) + 7
    let treeinfo: TreeContent = {
        treeImg: `bg${imgnum}.jpg`,
        left: 100,
        top: top,
        treeText: treeText.value,
        rate: rate
    }
    let res = await reqAddTree(treeinfo)
    if ((res as any).code == 200) {
        testList.value.push(treeinfo);
        treeText.value = ''
    }
}

</script>
<style lang="less" scoped>
.message_page {
    width: 100%;
    min-height: 100vh;
    padding-bottom: 80px;

    .message_head {
        height: 100vh;
        background: url(@/assets/image/bg2.webp) no-repeat;
        background-size: 100% 100%;

        .tree_content {
            height: 100%;
            overflow: hidden;
            position: relative;

            .tree_put {
                position: absolute;
                top: 35%;
                left: 50%;
                transform: translate(-50%, 0);
                z-index: 8;

                .tree_title {
                    font-size: 32px;
                    font-weight: 700;
                    margin-bottom: 10px;
                    color: #fff;
                }

                .input_send {
                    width: 360px;
                    border: 1px solid #fff;
                    border-radius: 25px;
                    padding: 10px 0px;
                    box-sizing: border-box;

                    .tree_send {
                        width: 90%;
                        outline: none;
                        border: 0px solid transparent;
                        font-size: 18px;
                        // line-height: 20px;
                        // color: #fff;
                        background-color: transparent;

                        // &::placeholder {
                        //     // color: #fff;
                        // }
                    }
                }
            }

            .tree_show {
                width: 120%;
                height: 75%;
                margin-top: 70px;
                position: relative;
                transform: translateX(-10%); // overflow: hidden;

                .tree_item {
                    position: absolute;
                    height: 35px;
                    top: 50px;
                    left: 100%;
                    border-radius: 20px;
                    padding-top: 0.5px;

                    background-color: rgba(0, 0, 0, .5);
                    // animation: tree_move 10s linear;

                    .tree_avatar {
                        margin-top: 1px;
                        margin-left: 5px;
                    }

                    span {
                        padding: 2px 5px 0px;
                        vertical-align: middle;
                        color: #fff;
                    }
                }
            }
        }
    }

    // .message_content {}

}
</style>
<style>
@keyframes tree_move {
    from {
        left: 100%;
    }

    to {
        left: 0;
    }
}
</style>
