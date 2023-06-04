<template>
    <div class="photo_page">
        <div class="paper_head">
            <h2 class="paper_title">相册</h2>
            <div class="paper_wave">
                <div class="wave"></div>
                <div class="wave wave_other"></div>
            </div>
        </div>
        <div class="photo_content">
            <div class="photo_main">
                <div class="photo_content_head">
                    <div class="photo_link">
                        <div class="link_main" v-for="(item, index) in photoToolList" :key="index"
                            @click="goUrl(item.ptUrl)">
                            <el-image style="width: 100%; height: 100%" :src="getAssetUrl(item.ptImg)" fit="cover" />
                            <div class="link_info">
                                <div class="link_some">
                                    <p class="link_name">{{ item.ptName }}</p>
                                    <div class="link_describ">{{ item.ptDescrib }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="photo_content_body">
                    <div class="photo_show">
                        <ul class="photo_list">
                            <li class="photo_item" v-for="(item, index) in photoList" :key="index">
                                <el-image style="height:100% ;width: 100%;" :src="item.photoImg" fit="cover" loading="lazy"
                                    class="photo_img" :preview-src-list="srcList" :initial-index="index" />
                            </li>

                        </ul>
                    </div>

                </div>
                <div class="goDown" v-if="isDown">到底啦~</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ElLoading } from 'element-plus'
import { reqGetPhotoPage } from '@/api/photo';
import { ref, onMounted, watch, onBeforeMount, nextTick } from 'vue'
import { reqPhotoTool } from '@/mock/getdata';


const photoList = ref<Array<PhotoContent>>([]);
const photoToolList = ref<Array<PhotoTool>>([])
let srcList = ref<Array<String>>([])
let currentPage = ref(1)
let pageSize = ref(9)
let isDown = ref(false)

onMounted(async () => {
    getPhotoPageList()
    // let res = await reqGetPhoto();
    // if ((res as any).code == 200) {
    //     photoList.value = res.data
    //     res.data.forEach((item: PhotoContent) => {
    //         srcList.value.push(item.photoImg)
    //     })
    // }
    let restool = await reqPhotoTool();
    photoToolList.value = restool.data


    window.addEventListener('scroll', getScroll)
})

onBeforeMount(() => {
    window.removeEventListener('scroll', getScroll)
})

const getAssetUrl = (image: String) => {
    return new URL(`../assets/image/${image}`, import.meta.url).href
}

const goUrl = (url: String) => {
    window.location.href = url.toString()
}

const getPhotoPageList = async () => {
    const loading = ElLoading.service()
    let res = await reqGetPhotoPage({ currentPage: currentPage.value, pageSize: pageSize.value });
    let pages = 1;
    if ((res as any).code == 200) {
        photoList.value.push(...res.data.pageData)
        res.data.pageData.forEach((item: PhotoContent) => {
            srcList.value.push(item.photoImg)
        })
        if (res.data.total % pageSize.value != 0) {
            pages = Math.floor(res.data.total / pageSize.value) + 1;
        } else {
            pages = Math.floor(res.data.total / pageSize.value);
        }
        console.log(pages, currentPage.value)
        if (pages <= currentPage.value) {
            isDown.value = true
        }

        nextTick(() => {
            loading.close()
        })
    }
}

const getScroll = () => {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let clientHeight = document.documentElement.clientHeight;
    let scrollHeight = document.documentElement.scrollHeight
    if (scrollTop + clientHeight >= scrollHeight) {
        if (!isDown.value) {
            currentPage.value = currentPage.value + 1
        }

    }
}

watch(currentPage, () => {
    getPhotoPageList();
})

</script>
<style lang="less" scoped>
.photo_page {
    width: 100%;
    min-height: 100vh;
    background: url(@/assets/image/bg3.webp);
    background-size: 100% 100%;
    padding-bottom: 80px;

    .paper_head {
        position: relative;
        width: 100%;
        height: 50vh;
        background-color: rgba(220, 218, 218, 0.3);

        .paper_title {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 48px;
        }

        .paper_wave {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 51px;
            z-index: 2;

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

    .photo_content {
        width: 80%;
        // background-color: #fff;
        margin: 20px auto;
        border-radius: 20px;

        .photo_main {
            padding: 20px 15px;


            .photo_content_head {
                padding: 20px;
                border-radius: 15px;
                background-color: #fff;


                .photo_link {
                    height: 150px;
                    border-radius: 15px;
                    display: flex;
                    justify-content: space-between;
                    cursor: pointer;
                    // margin: 0 auto;

                    .link_main {
                        width: 32%;
                        height: 100%;
                        border-radius: 15px;
                        overflow: hidden;
                        position: relative;

                        .link_info {
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            top: 0;
                            z-index: 5;
                            color: #fff;
                            padding: 0px 20px;
                            box-sizing: border-box;

                            &:hover {
                                background-color: rgba(0, 0, 0, .5);

                                .link_some {
                                    .link_name::after {
                                        width: 100%;
                                        transition: all 0.5s linear;
                                    }

                                    .link_describ {
                                        display: block;
                                        transition: all 1s linear;
                                    }
                                }
                            }

                            .link_some {
                                margin-top: 15px;

                                .link_name {
                                    font-weight: 700;
                                    font-size: 24px;
                                    text-align: left;

                                    &::after {
                                        display: block;
                                        content: '';
                                        width: 0px;
                                        background-color: #fff;
                                        height: 2px;
                                    }
                                }

                                .link_describ {
                                    display: none;
                                    // width: 0;
                                    text-align: left;
                                    margin-top: 10px;
                                }
                            }
                        }
                    }
                }
            }

            .photo_content_body {
                background-color: #fff;
                border-radius: 15px;
                padding: 15px 10px 10px;
                margin: 30px auto 0px;

                .photo_show {
                    // margin: 30px auto 0px;
                    border-radius: 15px;

                    .photo_list {
                        display: flex;
                        flex-flow: row wrap;

                        .photo_item {
                            margin: 0px 5px 10px 5px;
                            border-radius: 15px;
                            height: 250px;
                            overflow: hidden;

                            &:nth-child(3n) {
                                flex: 1;
                            }

                        }
                    }
                }
            }
        }

        .goDown {
            margin-top: 10px;
            color: rgb(231, 231, 231);
        }
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
