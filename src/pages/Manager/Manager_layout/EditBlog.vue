<template>
    <div class="m_body_edit">
        <div class="edit_head">
            <div class="edit_title">我的博客</div>
            <div class="go_edit" @click="goEdit"><span>写博客</span><span><svg t="1684305401630" class="icon"
                        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4111" width="22"
                        height="22">
                        <path d="M511.1 511.1l1.8 1.8-1.8-1.8zM513.1 510.9l-2.2 2.2c0.8-0.7 1.5-1.4 2.2-2.2z" fill=""
                            p-id="4112"></path>
                        <path
                            d="M639.7 490.3l-1.8-1.8-21.8-21.8L430.4 281c-12.4-12.5-32.8-12.5-45.2-0.1-12.4 12.5-12.4 32.9 0 45.3L570.9 512 385.1 697.7c-12.4 12.5-12.4 32.9 0 45.3 12.5 12.4 32.9 12.4 45.3 0l185.7-185.7 21.5-21.5 2.2-2.2c5.2-5.7 8.3-13.2 8.3-21.5 0.1-8.4-3.1-16.1-8.4-21.8z"
                            fill="" p-id="4113"></path>
                    </svg></span></div>
        </div>
        <div class="edit_show">
            <p class="edit_num">共{{ blogList.length }}篇博客</p>
            <ul class="m_blog_list">
                <li class="m_blog_item" v-for="(item, index) in blogList" :key="index">
                    <div class="eassy_info" @click="goShowBlog(item.blogId)">
                        <el-image class="eassy_img" style="width: 100px; height: 100px" :src="item.blogImg" :fit="fit" />
                        <div class="eassy_detail">
                            <p class="eassy_time">{{ item.writeTime }}</p>
                            <div class="eassy_title">{{ item.title }}</div>
                        </div>
                    </div>
                    <div class="eassy_option">
                        <div class="options" @click=goEditBlog(item.blogId)>编辑</div>
                        <div class="options" @click="goDeleteBlog(item.blogId!)">删除</div>

                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
// import url from '@/assets/image/bg5.jpg'
import { reqGetBlog, reqDeleteBlog } from '@/api/blog'
import { ElMessage, ElMessageBox } from 'element-plus'
const fit = ref('cover')
const router = useRouter()

const blogList = ref<Array<BlogContent>>([])

onMounted(() => {
    getBlogList()

})
const getBlogList = async () => {
    let res = await reqGetBlog();
    if ((res as any).code == 200) {
        blogList.value = res.data;
    }
}
const goEdit = function () {
    router.push('/managerPage/edit')
}

const goShowBlog = (id: any) => {
    router.push({
        path: '/managerPage/blogShow',
        query: {
            blogId: id
        }
    })
}
const goEditBlog = (id: any) => {
    router.push({
        path: '/managerPage/edit',
        query: {
            blogId: id
        }
    })
}
const goDeleteBlog = (id: String) => {
    ElMessageBox.confirm(
        '确定删除该博客嘛？',
        '删除',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
        }
    ).then(async () => {
        let res = await reqDeleteBlog({ blogId: id })
        if ((res as any).code == 200) {
            getBlogList();
            ElMessage({
                type: 'success',
                message: '删除成功！'
            })
        } else {
            ElMessage({
                type: 'error',
                message: '删除失败！'
            })
        }
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '已取消删除'
        })
    })

}

</script>
<style lang="less" scoped>
.m_body_edit {
    background-color: rgba(255, 255, 255);
    border-radius: 15px;
    width: 80%;
    margin: 20px auto;
    padding: 20px 10px;

    .edit_head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 700;
        border-bottom: 2px solid rgb(147, 197, 214);

        .edit_title {
            font-size: 20px;
            margin-bottom: 5px;
        }

        .go_edit {
            font-size: 15px;
            overflow: hidden;
            cursor: pointer;

            &:hover {
                color: rgb(242, 136, 60);
                fill: rgb(242, 136, 60);
            }

            span {
                display: inline-block;
            }

            .icon {
                margin-top: -5px;
                vertical-align: middle;


            }
        }
    }

    .edit_show {
        margin-top: 20px;

        .edit_num {
            text-align: left;
        }

        .m_blog_list {
            padding-top: 10px;

            .m_blog_item {
                background-color: rgb(202, 243, 255);
                height: 100px;
                margin-bottom: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-radius: 15px;
                overflow: hidden;

                .eassy_info {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .eassy_img {
                        border-radius: 15px;
                    }

                    .eassy_detail {
                        margin-left: 10px;
                        text-align: left;
                        padding-right: 10px;

                        .eassy_time {
                            font-size: 14px;
                            margin-bottom: 10px;
                        }

                        .eassy_title {
                            cursor: pointer;

                            &:hover {
                                text-decoration: underline;
                            }
                        }
                    }
                }

                .eassy_option {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;


                    .options {
                        border-radius: 10px;
                        padding: 5px 20px;
                        background-color: skyblue;
                        margin-right: 15px;

                        &:hover {
                            background-color: rgb(128, 234, 206);
                        }
                    }

                }
            }

        }
    }
}
</style>
