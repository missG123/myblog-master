<template>
    <div class="m_box_main">
        <div class="m_box_add">
            <div class="add_image">
                <el-upload class="avatar-uploader" action="" :show-file-list="false" :on-change="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload" :auto-upload="false">
                    <el-avatar shape="square" :size="100" fit="cover" :src="toolInfo.toolImg" v-if="toolInfo.toolImg"
                        class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </div>
            <div class="add_box_info">
                <div class="m_box_detail">
                    <el-input v-model="toolInfo.toolUrl" type="text" placeholder="工具地址" />
                    <div style="margin: 10px 0"></div>
                    <el-input v-model="toolInfo.toolName" type="text" placeholder="工具名称" />
                    <div style="margin: 10px 0"></div>
                    <el-input v-model="toolInfo.toolDescrib" resize="none" type="textarea" maxlength="50"
                        placeholder="工具描述" />
                </div>
                <el-select v-model="toolInfo.toolSign" class="m-2" id="set_pos" placeholder="类别">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <div class="add_btn" @click="addTool">添加</div>
            </div>

        </div>
        <div class="m_box_body">
            <BoxCard :boxList="toolList" title="好风凭借力" @deleteBox="deleteBox"></BoxCard>
            <BoxCard :boxList="learnList" title="学海无涯" @deleteBox="deleteBox"></BoxCard>
            <BoxCard :boxList="editList" title="下笔如有神" @deleteBox="deleteBox"></BoxCard>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
// import { ArrowDown } from '@element-plus/icons-vue'
import { reqAddTool, reqDeleteTool } from '@/api/tool'
import { useUploadImg } from '@/hook/uploadImg'
import BoxCard from '@/components/managerComponents/BoxCard.vue'

import { getToolListTest } from '@/hook/box'
const { toolList, learnList, editList, deleteTool } = getToolListTest()

const options = [{
    label: '好风凭借力',
    value: 'tool'
}, {
    label: '学海无涯',
    value: 'learn'
}, {
    label: '下笔如有神',
    value: 'edit'
}]

const toolInfo = ref<ToolContent>({
    toolImg: '',
    toolUrl: '',
    toolName: '',
    toolDescrib: '',
    toolSign: ''
})


const addTool = async () => {
    const res = await reqAddTool(toolInfo.value)
    if ((res as any).code == 200) {
        if (toolInfo.value.toolSign == 'tool') {
            toolList.value.push(toolInfo.value);
        } else if (toolInfo.value.toolSign == 'learn') {
            learnList.value.push(toolInfo.value);
        } else if (toolInfo.value.toolSign == 'edit') {
            editList.value.push(toolInfo.value);
        }
        toolInfo.value = {
            toolImg: '',
            toolUrl: '',
            toolName: '',
            toolDescrib: '',
            toolSign: ''
        }

    }
}
const deleteBox = async (toolid: String, toolSign: String) => {
    const res = await reqDeleteTool({ toolId: toolid })
    if ((res as any).code == 200) {
        if (toolSign == 'tool') {
            deleteTool(toolList.value, toolid);
        } else if (toolSign == 'learn') {
            deleteTool(learnList.value, toolid)
        } else if (toolSign == 'edit') {
            deleteTool(editList.value, toolid)
        }
    }
}






const handleAvatarSuccess: UploadProps['onChange'] = (
    uploadFile
) => {
    useUploadImg(uploadFile.raw!, 'boxImg').then((value: any) => {
        toolInfo.value.toolImg = value
    }).catch(error => {
        console.log(error)
    })
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('图片不能超过 2MB!')
        return false
    }
    return true
}

</script>
<style lang="less" >
.m_box_main {
    background-color: #fff;
    width: 80%;
    min-height: 600px;
    margin: 20px auto;
    border-radius: 15px;
    padding: 20px 20px;

    .m_box_add {
        display: flex;

        background-color: rgb(229, 246, 253);

        .add_image {
            .avatar-uploader .avatar {
                width: 150px;
                height: 150px;
                display: block;
            }
        }

        .add_box_info {
            width: 60%;
            margin-left: 20px;
            padding: 10px 0px;
            position: relative;
            text-align: left;

            .m-2 {
                margin-top: 10px;
            }

            .add_btn {
                position: absolute;
                text-align: center;
                right: 0px;
                bottom: 5px;
                width: 80px;
                height: 30px;
                border-radius: 10px;
                background-color: rgb(156, 229, 244);
                transform: translateX(-50%);
                line-height: 30px;
                cursor: pointer;

                &:hover {
                    background-color: rgb(141, 210, 248);
                }
            }
        }


    }

    .m_box_body {
        height: 600px;
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