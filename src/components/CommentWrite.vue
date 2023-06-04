<template>
    <div class="write_main">
        <textarea class="write_body" placeholder="写下点什么~" maxlength="300" v-model="commentText"></textarea>
        <div class="send_tools">
            <div class="tools_icon">
                <span class="emoji" @click="showEmoji"><svg t="1684049910149" class="icon" viewBox="0 0 1024 1024"
                        version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15002" width="32" height="32">
                        <path
                            d="M128 512c0 211.968 172.032 384 384 384s384-172.032 384-384-172.032-384-384-384-384 172.032-384 384z"
                            fill="#FFDF6B" p-id="15003"></path>
                        <path
                            d="M289.664 593.024c0 89.088 99.072 182.016 222.336 182.016 123.264 0 222.336-92.928 222.336-182.016H289.664z"
                            fill="#B67600" p-id="15004"></path>
                        <path
                            d="M310.016 430.976c0 33.408 22.656 60.672 50.688 60.672 28.032 0 50.688-27.264 50.688-60.672 0-33.408-22.656-60.672-50.688-60.672-28.032 0-50.688 27.264-50.688 60.672z m302.976 0c0 33.408 22.656 60.672 50.304 60.672s50.688-27.264 50.688-60.672c0-33.408-22.656-60.672-50.304-60.672-28.032 0-50.688 27.264-50.688 60.672z"
                            fill="#805400" p-id="15005"></path>
                    </svg></span>
                <span class="image">
                    <svg t="1684050033545" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="18503" width="32" height="32">
                        <path
                            d="M512.649 512.632m-447.382 0a447.382 447.382 0 1 0 894.764 0 447.382 447.382 0 1 0-894.764 0Z"
                            fill="#E0995E" p-id="18504"></path>
                        <path d="M736.34 428.748V316.902H288.958v447.382H736.34z" fill="#231F20" p-id="18505">
                        </path>
                        <path
                            d="M736.34 260.979H288.958c-30.886 0-55.923 25.037-55.923 55.923V764.284c0 30.885 25.037 55.923 55.923 55.923H736.34c30.886 0 55.923-25.038 55.923-55.923V316.902c0-30.886-25.037-55.923-55.923-55.923z"
                            fill="#231F20" p-id="18506"></path>
                        <path
                            d="M288.958 764.284c-15.421 0-27.961-12.547-27.961-27.961V288.941c0-15.414 12.54-27.961 27.961-27.961H736.34c15.421 0 27.961 12.547 27.961 27.961v447.382c0 15.414-12.54 27.961-27.961 27.961H288.958z"
                            fill="#77B3D4" p-id="18507"></path>
                        <path
                            d="M736.34 288.941v447.383H288.958V288.941H736.34m0-55.923H288.958c-30.886 0-55.923 25.037-55.923 55.923v447.383c0 30.885 25.037 55.923 55.923 55.923H736.34c30.886 0 55.923-25.038 55.923-55.923V288.941c0-30.886-25.037-55.923-55.923-55.923z"
                            fill="#FFFFFF" p-id="18508"></path>
                        <path d="M288.958 680.4H736.34v55.923H288.958z" fill="#FFFFFF" p-id="18509"></path>
                        <path
                            d="M260.851 680.4h487.868v-40.837s-23.845-41.624-45.947-67.706c-16.44-19.4-40.989-24.891-62.407-1.059l-38.481 36.957-83.869-106.652c-31.234-39.718-82.344-39.718-113.578 0L260.851 680.4z"
                            fill="#4F5D73" p-id="18510"></path>
                        <path d="M624.495 400.786m-41.942 0a41.942 41.942 0 1 0 83.884 0 41.942 41.942 0 1 0-83.884 0Z"
                            fill="#F5CF87" p-id="18511"></path>
                        <path
                            d="M736.34 288.941v447.383H288.958V288.941H736.34m0-55.923H288.958c-30.886 0-55.923 25.037-55.923 55.923v447.383c0 30.885 25.037 55.923 55.923 55.923H736.34c30.886 0 55.923-25.038 55.923-55.923V288.941c0-30.886-25.037-55.923-55.923-55.923z"
                            fill="#FFFFFF" p-id="18512"></path>
                    </svg></span>
            </div>


            <!-- <Emoji></Emoji> -->
            <div class="submit" @click="goSubmit">提交</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { getTime } from '@/utils/index'
import { ElMessage } from 'element-plus';
import { useUser } from '@/store/user'
import { reqCheckToken } from '@/api/user'
import { storeToRefs } from 'pinia';
// import Emoji from './Emoji.vue';
const store = useUser()

const { token } = storeToRefs(store)
const isEffect = ref(false)
const emit = defineEmits(['addComment'])
const commentText = ref('');
const goSubmit = async () => {
    checkToken()
    //还需要检测token是否有效
    if (token && isEffect) {
        emit('addComment', commentText.value, getTime().toString())
        commentText.value = ''
    } else {
        ElMessage({
            type: 'info',
            message: '请登录后再评论'
        })
    }

}
const checkToken = async () => {
    let res = await reqCheckToken()
    if ((res as any).code == 200) {
        isEffect.value = true;
    } else {
        isEffect.value = false;
    }
}

const showEmoji = () => {

}

</script>
<style lang="less" scoped>
.write_main {
    margin-top: 10px;

    .write_body {
        width: 100%;
        min-height: 180px;
        padding: 10px;
        box-sizing: border-box;
        border: 1px solid rgb(201, 199, 199);
        outline: none;
        resize: none;
        background: url(@/assets/image/letter.png) no-repeat;
        background-position: 100% 100%;
        background-size: contain;

        &:focus {
            border: 1px solid rgb(248, 157, 46);

        }
    }

    .send_tools {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;

        .tools_icon {
            span {
                margin-right: 5px;
            }

        }

        .submit {
            width: 66px;
            height: 33px;
            line-height: 33px;
            border-radius: 5px;
            background-color: rgb(139, 218, 255);
            text-align: center;

            &:hover {
                background-color: rgb(235, 185, 124);

            }
        }
    }
}
</style>
