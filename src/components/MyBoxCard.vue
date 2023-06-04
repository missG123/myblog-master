<template>
    <div class="box_list">
        <div class="tool_name">
            <span><svg t="1683706515074" class="icon" viewBox="0 0 1450 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="31494" width="32" height="32">
                    <path
                        d="M 116.868 494.783 H 531.777 c 41.9987 0 76.0451 -34.0463 76.0451 -76.0469 V 245.532 H 447.12 c -122.565 0 -241.77 125.854 -330.252 249.251 Z M 646.085 0 v 414.911 c 0 41.9987 34.0463 76.0451 76.0469 76.0451 h 173.204 V 330.254 c 0 -122.565 -125.854 -241.772 -249.251 -330.254 Z M 1140.87 529.219 H 725.957 c -41.9987 0 -76.0451 34.0481 -76.0451 76.0469 v 173.204 h 160.702 c 122.565 0 241.772 -125.854 330.252 -249.251 Z M 611.649 1024 V 609.091 c 0 -41.9987 -34.0463 -76.0451 -76.0469 -76.0451 H 362.398 v 160.702 c 0 122.563 125.854 241.77 249.251 330.252 Z"
                        fill="#79a9ac" p-id="31495"></path>
                </svg></span>{{ props.title }}
        </div>
        <ul class="box_item">
            <li class="tool_info" v-for="(item, index) in props.boxlist" :key="index" @click="goAddress(item.toolUrl)">
                <div class="tool_head"> <el-avatar shape="square" :size="80" fit="fill" :src="item.toolImg" /></div>
                <div class="tool_content">
                    <p class="tool_title">{{ item.toolName }}</p>
                    <p class="tool_describ">{{ item.toolDescrib }}</p>
                </div>
            </li>

        </ul>
    </div>
</template>
<script setup lang="ts">

// import { ref } from 'vue'
const props = defineProps({
    boxlist: {
        type: Array<ToolContent>,
        default: () => []
    },
    title: {
        type: String,
        default: () => ''
    }
})
const goAddress = (url: String) => {
    window.location.href = url.toString();
}
</script>
<style lang="less" scoped>
.box_list {

    margin-left: 10px;
    margin-bottom: 20px;

    .tool_name {
        text-align: left;
        font-size: 26px;
        font-weight: 700;

        .icon {
            vertical-align: sub;
        }
    }

    .box_item {
        display: flex;
        flex-flow: row wrap;

        .tool_info {
            width: 24%;
            height: 90px;
            border-radius: 15px;
            margin-right: 10px;
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            background-color: rgb(188, 241, 230);
            cursor: pointer;

            &:hover {
                background-color: rgb(155, 235, 234);
            }

            .tool_head {
                margin: 0px 10px;
                height: 80px;
            }

            .tool_content {
                flex: 1;
                text-align: left;

                .tool_title {
                    font-size: 20px;
                    font-weight: 700;
                }

                .tool_describ {
                    font-size: 14px;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    text-overflow: ellipsis;
                }
            }
        }
    }
}
</style>
