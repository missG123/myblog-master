<template>
    <el-pagination background layout="prev, pager, next" :total="props.total" class="mt-4" :page-size="props.pageSize"
        :current-page="currentPage" @current-change="handlePageChange" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits(['sendCurrentPage'])

let currentPage = ref(1)

const props = defineProps({
    // currentPage: {
    //     type: Number,
    //     default: () => 1
    // },
    total: {
        type: Number,
        default: () => 0
    },
    pageSize: {
        type: Number,
        default: () => 0
    },
})

const handlePageChange = (value: number) => {
    emit('sendCurrentPage', value)
    currentPage.value = value
}

</script>
<style lang="less" scoped></style>
