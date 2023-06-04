<template>
    <div class="box_page">
        <div class="box_head">
            <div class="box_img">
                <img src="@/assets/image/bg.png" alt="">
            </div>
            <div class="box_title">
                <h3>百宝箱</h3>
                <p>踏破铁鞋无觅处,得来全不费工夫</p>
            </div>

        </div>
        <div class="box_content">
            <MyBoxCard :boxlist="toolList" title="好风凭借力"></MyBoxCard>
            <MyBoxCard :boxlist="learnList" title="学海无涯"></MyBoxCard>
            <MyBoxCard :boxlist="editList" title="下笔如有神"></MyBoxCard>
        </div>
    </div>
</template>
<script setup lang="ts">
import MyBoxCard from '@/components/MyBoxCard.vue'
import { getToolListTest } from '@/hook/box'
const { toolList, learnList, editList } = getToolListTest()

</script>
<style lang="less" scoped>
.box_page {
    width: 100%;
    min-height: 100vh;
    background: url(@/assets/image/bg.jpg) no-repeat fixed;
    background-size: 100% 100%;
    padding: 70px 0px 80px;

    .box_head {
        width: 80%;
        height: 410px;
        margin: 0 auto;
        border-radius: 20px;
        background: url(@/assets/image/bg1.png) no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .box_img {
            width: 612px;
            height: 381px;
            overflow: hidden;
            border-radius: 20px;
            margin-left: 200px;

            img {
                width: 100%;
                height: 100%;

                &:hover {
                    transform: scale(1.1);
                }
            }
        }

        .box_title {
            // position: absolute;
            // right: 20px;
            color: #000;

            h3 {
                font-size: 42px;
            }

            p {
                font-size: 20px;
                // font-weight: 700;
            }
        }
    }

    .box_content {
        max-width: 80%;
        // height: 600px;
        margin: 30px auto;
        background-color: rgba(255, 248, 248);
        border-radius: 15px;
        padding: 20px 0;


    }

}
</style>
