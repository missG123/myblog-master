<template>
    <div class="m_box_show">
        <div class="box_show_title">{{ props.title }}</div>
        <ul class="m_box_list">
            <!-- v-for="(toolItem, index) in item.toollist" :key="index" @click="goAddress(toolItem.toolUrl) 
            
         -->
            <li class="m_box_item" v-for="(toolItem, index) in props.boxList" :key="index"
                @click="goAddress(toolItem.toolUrl)">
                <div class=" normal_box">
                    <div class="box_img">
                        <el-avatar :size="80" :src="toolItem.toolImg" />
                        <el-icon class="delete_icon" @click.stop="goDelete(toolItem.toolId!, toolItem.toolSign)">
                            <Delete />
                        </el-icon>
                    </div>
                    <div class="m_box_info">
                        <p class="box_info_title">{{ toolItem.toolName }}</p>
                        <p class="box_info_describ">{{ toolItem.toolDescrib }}</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
// import { reqDeleteTool } from '@/api/tool'
import { Delete } from '@element-plus/icons-vue'
import { onMounted } from 'vue';

const emit = defineEmits(['deleteBox'])

const props = defineProps({
    boxList: {
        type: Array<ToolContent>,
        default: () => []
    },
    title: {
        type: String,
        default: () => ''
    }
})
onMounted(() => {
    console.log(props.boxList)
})

const goAddress = (url: String) => {
    window.location.href = url.toString();
}

const goDelete = (toolid: String, toolSign: String) => {
    emit('deleteBox', toolid, toolSign)
}
</script>
<style lang="less" scoped>
.m_box_show {
    .box_show_title {
        text-align: left;
        font-size: 18px;
        font-weight: 700;
        padding-bottom: 5px;
        border-bottom: 2px solid rgb(172, 226, 244);
    }

    .m_box_list {
        margin: 10px 0px;
        display: flex;
        // padding: 0px 0px 0px 5px;
        flex-flow: row wrap;

        .m_box_item {
            margin: 0px 5px 10px;
            width: 19%;
            background-color: rgb(175, 229, 250);
            display: flex;
            padding: 5px;
            cursor: pointer;

            .normal_box {
                display: flex;
                height: 80px;
                overflow: hidden;


                .box_img {
                    position: relative;

                    &::before {
                        display: none;
                        position: absolute;
                        top: 0;
                        z-index: 10;
                        content: '';
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;
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


                .m_box_info {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: left;
                    justify-content: center;
                    height: 100%;
                    margin-left: 5px;
                    text-align: left;
                    overflow: hidden;


                    .box_info_title {
                        font-weight: 700;

                        &:hover {
                            color: #fff;
                        }
                    }

                    .box_info_describ {
                        margin-top: 5px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;

                    }
                }
            }

            .options_box {
                width: 100%;
                height: 80px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: rgba(213, 239, 248, 0.9);

                span {
                    margin-right: 10px;

                    &:hover {
                        color: #fff;
                    }
                }

            }


        }
    }
}
</style>
