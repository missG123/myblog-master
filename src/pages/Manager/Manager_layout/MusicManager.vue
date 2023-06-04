<template>
    <div class="m_music_main">
        <div class="m_music_add">
            <div class="add_music_img">
                <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-change="handleAvatarSuccess"
                    :auto-upload="false">
                    <el-avatar shape="square" :size="100" fit="cover" :src="musicInfo.musicImg" v-if="musicInfo.musicImg"
                        class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                        <span style="font-size: 14px;">选择图片</span>
                    </el-icon>
                </el-upload>
            </div>
            <div class="add_music_audio">
                <el-upload ref="upload" class="upload-demo" action="" :limit="1" :on-exceed="handleExceed"
                    :on-change="handleChange" :auto-upload="false">
                    <template #trigger>
                        <el-button type="primary">选择音频文件</el-button>
                    </template>
                </el-upload>
                <el-select v-model="musicInfo.musicSign" class="m-2" id="set_pos" placeholder="类别">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <div class="add_btn" @click="addMusic">添加</div>
            </div>

        </div>
        <div class="m_music_body">
            <MusicCard :musiclist="chineseList" title="华语歌曲" @goPlay="goPlay" :src="murl" @deletMusic="deletMusic">
            </MusicCard>
            <MusicCard :musiclist="japkorList" title="日韩歌曲" @goPlay="goPlay" :src="murl"></MusicCard>
            <MusicCard :musiclist="euramerList" title="欧美歌曲" @goPlay="goPlay" :src="murl"></MusicCard>
        </div>
        <audio ref="audio" class="aud">
            <!-- <source :src="item.musicPath.toString()" /> -->
        </audio>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import MusicCard from '@/components/managerComponents/MusicCard.vue'
import { useUploadImg } from '@/hook/uploadImg'
import { reqAddMusic, reqDeleteMusic } from '@/api/music'

import { useMusic } from '@/hook/music'
const { chineseList, japkorList, euramerList, goPlay, murl, deletemusic } = useMusic()

const upload = ref<UploadInstance>()

const options = [{
    label: '华语歌曲',
    value: 'chinese'
}, {
    label: '日韩歌曲',
    value: 'japkor'
}, {
    label: '欧美歌曲',
    value: 'euramer'
}]
let fileInfo = ref<UploadRawFile>();

const musicInfo = ref<MusicContent>({
    musicImg: '',
    musicPath: '',
    musicName: '',
    musicSign: ''
})



const addMusic = async () => {
    console.log(fileInfo.value)
    musicInfo.value.musicName = fileInfo.value!.name.split('.')[0];
    const formData = new FormData();
    formData.append('audio', fileInfo.value!)
    formData.append('musicinfo', JSON.stringify(musicInfo.value))
    let res = await reqAddMusic(formData)
    if ((res as any).code == 200) {
        if (musicInfo.value.musicSign == 'chinese') {
            chineseList.value.push(musicInfo.value);
        } else if (musicInfo.value.musicSign == 'japkor') {
            japkorList.value.push(musicInfo.value);
        } else if (musicInfo.value.musicSign == 'euramer') {
            euramerList.value.push(musicInfo.value);
        }
        musicInfo.value = {
            musicImg: '',
            musicPath: '',
            musicName: '',
            musicSign: ''
        }
        upload.value!.clearFiles()
    }
}

const deletMusic = async (id: String, sign: String) => {
    let res = await reqDeleteMusic({ musicId: id })
    if ((res as any).code == 200) {
        if (sign == 'chinese') {
            deletemusic(chineseList.value, id);
        } else if (sign == 'japkor') {
            deletemusic(japkorList.value, id)
        } else if (sign == 'euramer') {
            deletemusic(euramerList.value, id)
        }
    }
}



const handleAvatarSuccess: UploadProps['onChange'] = (
    uploadFile
) => {
    useUploadImg(uploadFile.raw!, 'musicImg').then((value: any) => {
        musicInfo.value.musicImg = value
    }).catch(error => {
        console.log(error)
    })
}

const handleChange: UploadProps['onChange'] = (uploadFile) => {
    fileInfo.value = uploadFile.raw!;
}


const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
}
</script>
<style lang="less" scoped>
.m_music_main {
    background-color: #fff;
    width: 80%;
    min-height: 600px;
    margin: 20px auto;
    border-radius: 15px;
    padding: 10px;

    .m_music_add {
        display: flex;

        .add_music_img {
            .avatar-uploader .avatar {
                width: 178px;
                height: 178px;
                display: block;
            }
        }

        .add_music_audio {
            position: relative;
            width: 80%;
            margin-left: 10px;
            background-color: rgb(233, 249, 252);
            text-align: left;

            .upload-demo {
                width: 23%;
            }

            .el-button--primary {
                color: #000;
                --el-button-bg-color: rgb(174, 221, 245);
                --el-button-border-color: transparent;

            }

            .add_btn {
                position: absolute;
                background-color: rgb(174, 221, 245);
                width: 80px;
                height: 30px;
                border-radius: 5px;
                bottom: 5px;
                left: 135px;
                line-height: 30px;
                text-align: center;

                &:hover {
                    background-color: rgb(120, 167, 250);
                }
            }
        }
    }

    .m_music_body {
        margin-top: 20px;

    }
}
</style>
<style>
.avatar-uploader {
    display: flex;
    justify-content: left;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    text-align: center;
}
</style>
