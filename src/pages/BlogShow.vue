<template>
    <div class="show_main">
        <div class="show_head">
            <div class="show_img">
                <el-image style="width: 100%;height: 300px; " :src="blogInfo.blogImg" fit="cover" />
            </div>
            <div class="show_info">
                <h2 class="show_title">{{ blogInfo.title }}</h2>
                <div class="show_other">
                    <span>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-rili"></use>
                        </svg>
                        {{ blogInfo.writeTime }} </span>
                    <span> <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-gouhuo"></use>
                        </svg>{{ blogInfo.readNum }}</span>
                    <span> <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-dianzan1"></use>
                        </svg>{{ blogInfo.likeNum }}</span>
                </div>
            </div>
        </div>

        <div class="show_blog">
            <div class="show_describ">
                <p class="blog_describ">{{ blogInfo.describ }}
                </p>
            </div>
            <div class="show_content">
                <v-md-preview :text="blogInfo.blogText"></v-md-preview>
            </div>

        </div>

        <div class="blog_note">
            <span class="sign_dir">
                <span>{{ blogInfo.blogDir }}</span> &
                <span>{{ blogInfo.blogSign }}</span>
            </span>
            <div class="note">
                <p class="author">作者: 小丑</p>
                <p class="public">版权声明: 转载请注明文章出处</p>
            </div>
        </div>
        <div class="dot_icon">
            <svg t="1685461192498" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="6102" width="84" height="84">
                <path
                    d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
                    p-id="6103"></path>
            </svg>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reqGetBlogInfo } from '@/api/blog';
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue'
const route = useRoute()
const blogInfo = ref<BlogContent>({
    blogId: '',
    title: '',
    blogText: '',
    writeTime: '',
    blogImg: '',
    describ: '',
    blogDir: '',
    blogSign: '',
    likeNum: 0,
    readNum: 0,
})
onMounted(async () => {
    let res = await reqGetBlogInfo({ blogId: route.query.blogId })
    if ((res as any).code == 200) {
        blogInfo.value = res.data
    }
})
</script>
<style lang="less" scoped>
.show_main {
    padding-bottom: 80px;

    .show_head {
        position: relative;
        text-align: left;

        .show_info {
            position: absolute;
            bottom: 20px;
            left: 255px;
            color: #fff;

            .show_title {
                padding-left: 5px;
                font-size: 42px;
            }

            .show_other {
                span {
                    margin-left: 10px;
                }
            }

        }
    }

    .show_blog {
        width: 65%;
        margin: 30px auto;

        .show_describ {
            position: relative;
            width: 100%;
            display: block;
            padding: 20px;

            &::before {
                display: block;
                content: '“';
                position: absolute;
                top: 0;
                left: 0;
                font-size: 40px;

            }

            &::after {
                display: block;
                content: '”';
                position: absolute;
                bottom: 0;
                right: 0;
                line-height: 20px;
                font-size: 40px;
            }

            .blog_describ {
                font-size: 24px;
            }
        }
    }

    .blog_note {
        width: 65%;
        margin: 0 auto;
        position: relative;
        padding: 15px 0px;
        margin-top: 20px;


        .sign_dir {
            padding: 0px 10px;
            position: absolute;
            top: 0;
            right: 0;
            background-color: rgb(243, 233, 123);
            color: #fff;
            font-size: 18px;
            border-radius: 5px;
        }

        .note {
            width: 100%;
            background-color: rgb(227, 243, 255);
            margin-top: 30px;
            padding: 10px 0px 10px 15px;
            text-align: left;
            border-left: 5px solid rgb(135, 180, 235);
            border-radius: 5px;
            font-weight: 700;

            p {
                margin-bottom: 10px;
            }
        }
    }

    .dot_icon {


        svg {
            width: 72px;
            height: 72px;

            &:hover {
                transform: scale(1.1)
            }
        }

    }

    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }

}
</style>
