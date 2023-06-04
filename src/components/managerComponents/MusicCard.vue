<template>
    <div class="m_music_topic">
        <p class="m_music_title">{{ title }}</p>
        <ul class="m_music_list">
            <li class="m_music_item" v-for="(item, index) in musiclist" :key="index">
                <div class="music_item_img">
                    <el-image style="width: 100px; height: 100px" :src="item.musicImg" fit="cover" />
                    <el-icon class="delete_icon" @click="goDelete(item.musicId!, item.musicSign)">
                        <Delete />
                    </el-icon>
                </div>

                <p class="m_music_name" @click="goSend(item.musicPath)">{{ item.musicName }}</p>
            </li>

        </ul>
    </div>
</template>
<script setup lang="ts">
// import { ref } from 'vue'
import { Delete } from '@element-plus/icons-vue'
const props = defineProps({
    musiclist: {
        type: Array<MusicContent>,
        default: () => []
    },
    title: {
        type: String,
        default: () => ''
    },
    src: {
        type: String,
        default: () => ''
    }
})
let isPlay = false
const emits = defineEmits(['goPlay', 'deletMusic'])
const goSend = (mpath: String) => {
    isPlay = !isPlay;
    if (props.src != mpath) {
        isPlay = true;
        // console.log(props.src)
    }
    emits('goPlay', mpath, isPlay)
}
const goDelete = (musicid: String, musicSign: String) => {
    emits('deletMusic', musicid, musicSign)
}
</script>
<style lang="less" scoped>
.m_music_topic {
    .m_music_title {
        text-align: left;
        font-size: 18px;
        font-weight: 700;
        border-bottom: 2px solid rgb(175, 222, 234);
        padding-bottom: 5px;
    }

    .m_music_list {
        margin-top: 10px;
        display: flex;
        background-color: rgb(226, 246, 253);
        flex-flow: row wrap;
        padding-top: 5px;

        .m_music_item {
            margin-bottom: 10px;
            margin-right: 10px;
            height: 130px;
            padding: 0px 10px;

            .music_item_img {
                display: flex;
                overflow: hidden;
                position: relative;

                &::before {
                    content: '';
                    position: absolute;
                    display: none;
                    top: 0;
                    z-index: 5;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(62, 62, 62, 0.5);
                }

                &:hover::before {
                    display: block;
                }

                &:hover .delete_icon {
                    display: block;
                }


                .delete_icon {
                    display: none;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 6;
                    color: rgb(166, 165, 165);

                    &:hover {
                        color: #fff;
                    }
                }
            }

            .m_music_name {
                width: 100px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-align: center;
                cursor: pointer;

                &:hover {
                    color: rgb(246, 181, 96);
                }
            }

        }
    }
}
</style>
