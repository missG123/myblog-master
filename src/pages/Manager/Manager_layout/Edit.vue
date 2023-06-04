<template>
    <div class="edit_main">
        <v-md-editor v-model="blogInfo.blogText" height="90vh" @upload-image="handleUploadImage"
            :disabled-menus="[]"></v-md-editor>
        <div class="edit_option">
            <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-change="handleAvatarSuccess"
                :auto-upload="false">
                <el-avatar shape="square" :size="100" fit="cover" :src="blogInfo.blogImg" v-if="blogInfo.blogImg"
                    class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                    <Plus />
                </el-icon>
            </el-upload>
            <div class="write_info">
                <div class="input_edit">
                    <label for="">标题:</label>
                    <el-input v-model="blogInfo.title" class="w-50 m-2" placeholder="请输入标题" />
                    <label>标签:</label>
                    <el-input v-model="blogInfo.blogSign" class="w-50 m-2" placeholder="请输入标签" />
                </div>
                <div class="edit_select">
                    <label>文件夹:</label><br />
                    <el-select v-model="blogInfo.blogDir" class="m-2" placeholder="选择文章类别">
                        <el-option v-for="item in fileOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </div>
            </div>
            <div class="describ_write">
                <label for="">文章描述:</label><br>
                <el-input v-model="blogInfo.describ" type="textarea" placeholder="写点什么吧！" resize="none" />
                <div class="public" @click="subClick" v-if="!route.query.blogId">
                    发布
                </div>
                <div class="public" @click="subUpdate" v-else>
                    修改
                </div>
            </div>

        </div>
    </div>
</template>
<script lang="ts" setup>
import * as _ from 'lodash';
import { useUploadImg } from '@/hook/uploadImg'
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { reqAddBlog, reqGetBlogInfo, reqUpdateBlog } from '@/api/blog'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
const router = useRouter()
const route = useRoute()
const fileOptions = [{
    value: '学习人生',
    label: '学习人生'
}, {
    value: '视听盛宴',
    label: '视听盛宴'
}, {
    value: '生活倒影',
    label: '生活倒影'
}, {
    value: '分享空间',
    label: '分享空间'
}]
let blogInfo = ref<BlogContent>({
    title: '',
    blogText: '',
    writeTime: '',
    blogImg: '',
    describ: '',
    blogDir: '',
    blogSign: ''
})

onMounted(async () => {
    if (sessionStorage.getItem('blogInfo')) {
        const temp = JSON.parse(sessionStorage.getItem('blogInfo')!)
        blogInfo.value = temp
    } else {
        if (route.query.blogId) {
            let res = await reqGetBlogInfo({ blogId: route.query.blogId })
            if ((res as any).code == 200) {
                console.log('=====', res.data)
                blogInfo.value = res.data
            }
        }
    }
    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('blogInfo', JSON.stringify(blogInfo.value))
    })
})
onBeforeUnmount(() => {
    console.log('执行destory');
    sessionStorage.removeItem('blogInfo')
})

const addblog = async function () {
    blogInfo.value.writeTime = getTime();
    let res = await reqAddBlog(blogInfo.value!);
    console.log(res);
    if ((res as any).code == 200) {
        ElMessage({
            message: '博客发布成功',
            type: 'success'
        })
        blogInfo.value = {
            title: '',
            blogText: '',
            writeTime: '',
            blogImg: '',
            describ: '',
            blogDir: '',
            blogSign: ''
        }
        router.push('/managerPage/editBlog')
    }

}
const subClick = _.debounce(addblog, 500);


const updateblog = async () => {
    let res = await reqUpdateBlog(blogInfo.value)
    if ((res as any).code == 200) {
        ElMessage({
            type: 'success',
            message: '修改成功'
        })
        router.push('/managerPage/editBlog')
    }
}

const subUpdate = _.debounce(updateblog, 500)

const getTime = (): String => {
    const time = new Date();
    const year = time.getFullYear();
    let month: String | Number = time.getMonth() + 1;
    let day: String | Number = time.getDate();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    let hours: String | Number = time.getHours();
    let min: String | Number = time.getMinutes();
    let sec: String | Number = time.getSeconds();
    hours = hours < 10 ? '0' + hours : hours;
    min = min < 10 ? '0' + min : min;
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
    const dateTime = year + '-' + month + '-' + day + " " + hours + ":" + min + ":" + sec;
    return dateTime;
}
const handleUploadImage = async (event: Event, insertImage: Function, files: Array<File>) => {
    event.preventDefault()
    useUploadImg(files[0], 'editor_img').then((value: any) => {
        insertImage({
            url: value
        })
    }).catch(error => {
        console.log(error)
    })

}

const handleAvatarSuccess: UploadProps['onChange'] = async (
    uploadFile
) => {
    useUploadImg(uploadFile.raw!, 'editImg').then((value: any) => {
        blogInfo.value.blogImg = value;
    }).catch(error => {
        console.log(error)
    })

    // const reader = new FileReader();
    // reader.readAsDataURL(uploadFile.raw!);
    // reader.onload = (e) => {
    //     blogInfo.value.blogImg = e.target!.result as String;
    // }
}
</script>
<style lang="less">
.edit_main {
    .edit_option {
        background-color: rgb(217, 242, 251);
        display: flex;
        text-align: left;
        justify-content: space-around;
        padding-bottom: 10px;

        .avatar-uploader .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }

        .write_info {
            margin: 0px 40px;

            .input_edit {

                .w-50 {
                    margin-bottom: 5px;
                }
            }
        }

        .describ_write {
            position: relative;

            .el-textarea {
                .el-textarea__inner {
                    width: 400px;
                    height: 120px;
                    resize: none;
                    outline: none;
                    padding: 10px;
                }
            }

            .public {

                cursor: pointer;
                position: absolute;
                background-color: skyblue;
                border-radius: 5px;
                width: 60px;
                height: 30px;
                margin-top: 10px;
                text-align: center;
                line-height: 30px;
                right: 0;

                &:hover {
                    background-color: rgb(135, 180, 235);
                    ;
                }


            }
        }


    }
}
</style>
<style>
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
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
