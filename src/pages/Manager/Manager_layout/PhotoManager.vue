<template>
    <div class="m_photo_main">
        <div class="m_photo_add">
            <el-upload action="#" list-type="picture-card" :auto-upload="false" :limit="6" :on-exceed="handleExceed"
                :on-change="handleChange" :file-list="photoInfo" :show-file-list="true">
                <el-icon>
                    <Plus />
                </el-icon>

                <template #file="{ file }">
                    <div>
                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                        <span class="el-upload-list__item-actions">
                            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                <el-icon><zoom-in /></el-icon>
                            </span>
                            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                <el-icon>
                                    <Delete />
                                </el-icon>
                            </span>
                        </span>
                    </div>
                </template>
            </el-upload>

            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%;" />
            </el-dialog>
            <div class="add_btn" @click="addPhoto">添加</div>
        </div>
        <div class="m_photo_body">
            <p class="my_photo_title">我的图片 </p>
            <ul class="m_photo_list">
                <li class="m_photo_item" v-for="(item, index) in photoList" :key="index">
                    <el-image style="height: 100%" :src="item.photoImg" :zoom-rate="1.2" :initial-index="4" fit="cover" />
                    <el-icon class="delete_icon" :size="24" @click="deletePhoto(item.photoId)">
                        <Delete />
                    </el-icon>
                </li>

            </ul>
            <div>到底啦~</div>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { ref, toRaw, onMounted } from 'vue'
import { Plus, Delete, ZoomIn } from '@element-plus/icons-vue'

import { ElMessage, UploadFile, UploadProps } from 'element-plus'
import { reqUploadImg } from '@/api/upload'
import { reqGetPhoto, reqDeletePhoto } from '@/api/photo'

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const photoInfo = ref<Array<UploadFile>>([]);
const photoList = ref<Array<PhotoContent>>([]);


onMounted(async () => {
    getPhotoList()
})
const getPhotoList = async () => {
    let res = await reqGetPhoto();
    if ((res as any).code == 200) {
        photoList.value = res.data;
    }
}


const addPhoto = async () => {
    const formData = new FormData();
    for (const item of photoInfo.value) {
        formData.append('photoImg', item.raw!);
    }
    let res = await reqUploadImg(formData, 'photoImg')
    if ((res as any).code == 200) {
        getPhotoList()
        photoInfo.value = []
    }
}
const deletePhoto = async (id: String) => {
    let res = await reqDeletePhoto({ photoId: id })
    if ((res as any).code == 200) {
        ElMessage({
            type: 'success',
            message: '删除图片成功！'
        })
        for (let i = 0; i < photoList.value.length; i++) {
            if (photoList.value[i].photoId == id) {
                photoList.value.splice(i, 1)
            }
        }
    }
}



const handleExceed: UploadProps['onExceed'] = () => {
    ElMessage({
        type: 'warning',
        message: '超过最大上传张数'
    })
}

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
    photoInfo.value = toRaw(uploadFiles)
}

const handleRemove = (file: UploadFile) => {
    const list = photoInfo.value;
    for (let i = 0; i < list.length; i++) {
        if (list[i].uid === file.uid) {
            photoInfo.value.splice(i, 1)
            break;
        }
    }
    console.log('remove after', photoInfo.value)
}

const handlePictureCardPreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url!
    dialogVisible.value = true
}
</script>
<style lang="less" scoped>
.m_photo_main {
    background-color: #fff;
    width: 80%;
    min-height: 600px;
    margin: 20px auto 0px;
    border-radius: 15px;
    padding: 10px;

    .m_photo_add {
        text-align: left;

        .add_btn {
            height: 30px;
            line-height: 30px;
            border-radius: 5px;
            background-color: rgb(154, 221, 231);
            text-align: center;
            cursor: pointer;

            &:hover {
                background-color: rgb(109, 213, 229);
            }
        }
    }

    .m_photo_body {
        margin-top: 20px;
        // height: 300px;

        .my_photo_title {
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 2px solid rgb(200, 235, 254);
            text-align: left;
            font-size: 18px;
            font-weight: 700;
        }

        .m_photo_list {
            display: flex;
            flex-flow: row wrap;

            .m_photo_item {
                margin: 0px 10px 10px 0px;
                height: 250px;
                position: relative;

                &::before {
                    display: none;
                    position: absolute;
                    top: 0;
                    z-index: 10;
                    content: '';
                    width: 100%;
                    height: 100%;
                    background-color: rgba(58, 57, 57, 0.3);
                }

                .delete_icon {
                    display: none;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 11;

                    &:hover {
                        color: #fff;
                    }
                }

                &:hover::before {
                    display: block;
                }

                &:hover .delete_icon {
                    display: block;
                }

                &:nth-child(3n) {
                    flex: 1;
                }
            }
        }
    }
}
</style>
