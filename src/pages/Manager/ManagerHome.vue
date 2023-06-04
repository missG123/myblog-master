<template>
    <div class="m_home_main">
        <ManagerHead></ManagerHead>

        <router-view></router-view>

        <Footer></Footer>
    </div>
</template>
<script lang="ts" setup>
// import Edit from "@/pages/Manager/Manager_layout/Edit.vue"
import ManagerHead from '@/components/managerComponents/ManagerHead.vue';
import Footer from '@/components/Footer.vue'
</script>
<style lang="less" scoped>
.m_home_main {
    min-height: 100vh;
    background: url(@/assets/image/bg10.jpg) fixed;
    background-size: 100% 100%;
    position: relative;
    padding-bottom: 80px;
}
</style>
