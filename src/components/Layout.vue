<template>
    <div class="layout_page">
        <Header v-if="isHome"></Header>
        <router-view></router-view>
        <Footer v-if="isHome"></Footer>
    </div>
</template>
<script setup lang="ts">
// import ManagerHome from '@/pages/Manager/ManagerHome.vue';
import Header from './Header.vue';
import Footer from './Footer.vue';
import { useRouter } from 'vue-router'
import { ref, onMounted, watch } from 'vue';
let isHome = ref(true);
const router = useRouter()
// const route = useRoute()

onMounted(() => {
    if (router.currentRoute.value.meta.isShow) {
        isHome.value = true;
    } else {
        isHome.value = false;
    }

})

watch(() => router.currentRoute.value, (newValue) => {
    if (newValue.meta.isShow) {
        isHome.value = true;
    } else {
        isHome.value = false;
    }
}, { immediate: true })


</script>
<style lang="less" scoped>
.layout_page {
    position: relative;
    min-height: 100vh;
}
</style>
