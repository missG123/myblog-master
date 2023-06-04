<template>
    <div class="show_main">
        <div class="show_blog_img">
            <el-image style="width: 100%; height: 300px" :src="blogInfo.blogImg" fit="fill" />
        </div>
        <h2 class="show_blog_title">{{ blogInfo.title }}</h2>
        <div class="show_blog_someInfo">
            <div class="show_blog_sign_dir">
                <span class="s_blog_dir"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-wenjianjia"></use>
                    </svg>{{ blogInfo.blogDir }}</span>
                <span class="s_blog_sign"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon--"></use>
                    </svg>{{ blogInfo.blogSign }}</span>
            </div>
            <div class="show_blog_time_like">
                <span class="s_blog_time"><svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-rili"></use>
                    </svg>{{ blogInfo.writeTime }}</span>
                <span class="s_blog_read">{{ blogInfo.readNum }}</span>
                <span class="s_blog_like{">{{ blogInfo.likeNum }}</span>
            </div>
        </div>
        <!-- <v-md-preview :text="text"></v-md-preview> -->
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
    width: 80%;
    min-height: 100vh;
    margin: 10px auto;
    background-color: #fff;

    .show_blog_title {
        font-size: 36px;
    }

    .show_blog_sign_dir {
        display: flex;
        justify-content: center;

        span {
            padding: 0 10px;
            height: 20px;
            margin-right: 20px;
            line-height: 20px;
            background-color: skyblue;


        }

        .s_blog_dir {
            background-color: rgb(173, 227, 250);
        }

        .s_blog_sign {
            background-color: rgb(248, 247, 182);
        }
    }

    .show_blog_time_like {}



    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }

}
</style>
