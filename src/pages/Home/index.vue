<template>
    <div class="bgImage">
        <div class="welcome_page">
            <div class="word_action">
                <div class="my_title">小丑的博客</div>
                <div class="move_bg">
                    <div class="move_text">
                        欲卖桂花同载酒,终不似,少年游
                        <span class="cursor">|</span>
                    </div>
                </div>
            </div>
            <div class="down_icon">
                <svg t="1683350478461" class="icon down_action" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="20511" width="32" height="32">
                    <path
                        d="M84.48 375.104A67.098 67.098 0 0 1 64 327.168c1.696-40.8 36-72.576 76.8-71.136a79.217 79.217 0 0 1 56.32 23.168L512 591.904 826.88 279.2a79.217 79.217 0 0 1 56.32-23.168c40.8-1.44 75.104 30.336 76.8 71.136a67.098 67.098 0 0 1-20.48 47.936L568.32 744.96c-31.264 30.72-81.376 30.72-112.64 0L84.48 375.104z"
                        fill="#eee" p-id="20512"></path>
                </svg>
            </div>
            <div class="wave_show">
                <div class="wave_img"></div>
                <div class="wave_img wave_other"></div>
            </div>
        </div>
        <HomeContent></HomeContent>
    </div>
</template>
<script setup lang="ts">
import HomeContent from '@/components/HomeContent.vue';
import { onMounted } from 'vue'
// import { useUser } from '@/store/user'
// const store = useUser()
onMounted(() => {
    // store.getUserInfo()
})
</script>

<style lang="less" scoped>
.bgImage {
    min-height: 100vh;
    background: url('@/assets/image/index.png') no-repeat fixed;
    background-size: 100% 100%;
    padding-bottom: 80px;

    &::after {
        display: block;
        content: " ";
        width: 100%;
        height: 100vh;
        background-color: rgba(104, 108, 97, 0.2);
        position: absolute;
        top: 0;
        z-index: 5;
    }

    .welcome_page {
        position: relative;
        height: 100vh;

        .word_action {
            width: 100%;
            height: 90vh;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: flex-end;
            font-weight: 700;
            font-family: serif;

            .my_title {
                font-size: 54px;
                color: blanchedalmond;
            }

            .move_bg {
                width: 17em;
                height: 1.5em;
                overflow: hidden;
                border-radius: 10px;
                background-color: rgba(175, 172, 172, 0.5);
                margin-top: 10px;
                font-size: 40px;
                color: blanchedalmond;
                animation: word_show 10s steps(15) infinite alternate;

                .move_text {
                    .cursor {
                        animation: cursor_show 0.5s linear infinite;
                    }
                }
            }
        }

        .down_icon {
            .down_action {
                animation: down_move 1s linear infinite alternate;
            }
        }

        .wave_show {
            height: 40px;
            overflow: hidden;

            .wave_img {
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 40px;
                background: url('@/assets/image/wave.png') no-repeat;
                animation: wave_move 15s linear infinite;
                animation-direction: alternate;
            }

            .wave_other {
                animation-direction: alternate-reverse;
            }
        }

    }
}

@keyframes wave_move {
    0% {
        background-position: 0% 0%;
    }

    100% {
        background-position: 100% 0%;
    }
}

@keyframes word_show {
    0% {
        width: 0%;
    }

}

@keyframes down_move {
    0% {
        opacity: 0.5;
        transform: translateY(0px);
    }

    100% {
        opacity: 1;
        transform: translateY(-20px)
    }
}

@keyframes cursor_show {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
</style>
