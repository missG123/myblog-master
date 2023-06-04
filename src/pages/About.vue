<template>
    <div class="about_page">
        <div class="about_head">
            <el-image style="width: 100%; height: 100%" :src="url" fit="cover" />
            <div class="head_main">
                <p class="poetry_name">青玉案·元夕</p>
                <p class="poetry">东风夜放花千树，更吹落，星如雨</p>
                <p class="poet">辛弃疾</p>
            </div>

        </div>
        <div class="about_content">
            <div class="about_main">
                <h2 class="about_title">满船清梦压星河</h2>
                <div class="about_dialog">
                    <div class="dialog_title">与 小丑 对话中...</div>
                    <div class="dialog_main">
                        <div v-for="(item, index) in dialogList" :key="index">
                            <transition appear enter-active-class="animate__animated animate__fadeInDown"
                                :duration="{ enter: 1000, leave: 1000 }">
                                <div class="dialog_item left_item" v-if="item.sendobj == 'machine'"><span>{{ item.content
                                }}</span>
                                </div>
                            </transition>
                            <transition appear enter-active-class="animate__animated animate__fadeInDown"
                                leave-active-class="animate__animated animate__fadeOutLeft"
                                :duration="{ enter: 800, leave: 1000 }">
                                <div class="dialog_item left_item" v-if="item.select">
                                    <span class="select_item" v-for="selectItem in item.select" :key="selectItem.selectId"
                                        @click="selectAfter(selectItem.selectId, index)">{{
                                            selectItem.content }}</span>
                                </div>
                            </transition>
                            <transition appear enter-active-class="animate__animated animate__fadeInDown"
                                :duration="{ enter: 800, leave: 1000 }">
                                <div class="dialog_item right_item" v-if="item.sendobj == 'my'"><span>{{ item.content
                                }}</span>
                                </div>
                            </transition>





                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import url from '@/assets/image/bg2.webp';
import { onMounted, ref } from 'vue';
import { reqGetDialog, reqGetDialogThen } from '@/mock/getdata'

let dialogList = ref<Array<any>>([])
onMounted(async () => {
    let res = await reqGetDialog()
    dialogList.value = res.data
})

const selectAfter = async (id: number, index: number) => {
    let res = await reqGetDialogThen(id)
    let tmp = dialogList.value[index];
    tmp.select = [];
    dialogList.value.splice(index, 1);
    dialogList.value.push(tmp);
    for (let item of res.data) {
        dialogList.value.push(item)
    }
    console.log(dialogList.value)
}
</script>
<style lang="less" scoped>
.about_page {
    min-height: 100vh;
    padding-bottom: 80px;

    .about_head {
        height: 60vh;
        position: relative;

        .head_main {
            position: absolute;
            top: 45%;
            right: 40px;
            // left: 50%;
            font-weight: 700;
            color: #000;
            // border: 1px solid blue;
            transform: translate(0%, -50%);

            .poetry_name {
                font-size: 30px;

            }

            .poetry {
                font-size: 18px;
                margin: 20px 0px;
            }
        }
    }

    .about_content {

        .about_main {
            width: 60%;
            margin: 0 auto;
            padding: 30px 10px;

            .about_title {
                font-size: 40px;
                font-weight: 400;
                letter-spacing: 5px;
            }

            .about_dialog {
                width: 100%;
                min-height: 450px;
                background-color: rgb(213, 253, 246);
                margin: 20px auto;
                border-radius: 10px;
                overflow: hidden;

                .dialog_title {
                    font-size: 18px;
                    margin: 20px auto;
                    font-weight: 700;
                }

                .dialog_main {

                    .dialog_item {
                        display: flex;
                        margin: 15px;
                        transition: all 1s;

                        span {
                            background-color: rgb(255, 255, 236);
                            padding: 3px 12px;
                            border-radius: 1rem;
                        }

                        .select_item {
                            margin: 5px 10px 0px 0px;
                            background-color: #000;
                            color: #fff;
                            border-radius: 5px;
                            cursor: pointer;

                            &:hover {
                                box-shadow: 0px 0px 5px 2px rgba(221, 138, 37);
                                color: orange;
                            }
                        }
                    }

                    .left_item {
                        justify-content: left;
                    }

                    .right_item {
                        justify-content: right;
                    }
                }

            }
        }
    }
}
</style>
