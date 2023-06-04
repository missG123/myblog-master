<template>
    <div class="music_page">
        <div class="music_head">
            <div class="music_title">
                <p class="title_name">音乐盒</p>
                <p class="title_note">初闻不知曲中意，再听已是曲中人。</p>
            </div>
            <div class="music_wave">
                <div class="wave"></div>
                <div class="wave wave_other"></div>
            </div>
        </div>
        <div class="music_content">
            <MymusicCard :musiclist="chineseList" title="华语歌曲" @goPlay="goPlay" :src="murl"></MymusicCard>
            <MymusicCard :musiclist="japkorList" title="日韩歌曲" @goPlay="goPlay" :src="murl"></MymusicCard>
            <MymusicCard :musiclist="euramerList" title="欧美歌曲" @goPlay="goPlay" :src="murl"></MymusicCard>
        </div>

    </div>
</template>
<script setup lang="ts">
import MymusicCard from '@/components/MymusicCard.vue';
import { useMusic } from '@/hook/music';
const { chineseList, japkorList, euramerList, goPlay, murl } = useMusic()
</script>
<style lang="less" scoped>
.music_page {
    width: 100%;
    min-height: 100vh;
    background: url(@/assets/image/bg4.png) no-repeat fixed;
    background-size: 100% 100%;
    padding-bottom: 80px;

    .music_head {
        position: relative;
        width: 100%;
        height: 50vh;
        background-color: rgba(220, 218, 218, 0.3);

        .music_title {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            .title_name {
                font-size: 48px;
                font-weight: 700;
            }

            .title_note {
                font-size: 30px;
            }

        }

        .music_wave {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 50px;

            .wave {
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 100%;
                background: url(@/assets/image/wave1.png);
                animation: wave_move 15s linear infinite;
                animation-direction: alternate;
            }

            .wave_other {
                animation-direction: alternate-reverse;
            }
        }
    }

    .music_content {
        width: 80%;
        // height: 600px;
        background-color: rgb(255, 247, 247);
        margin: 40px auto;
        border-radius: 20px;
        padding: 30px 0px;


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
</style>
