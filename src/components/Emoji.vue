<template>
    <div class="emoji_main">
        <ul class="emoji_list">
            <li class="emoji_item" v-for="(item, index) in emojiList" :key="index"> {{
                String.fromCodePoint(item)
            }}
            </li>
        </ul>
    </div>
</template>
<script setup lang="ts">
const emojiList = [0x1F602, 0x1F603]


</script>
<style lang="less" scoped>
.emoji_main {
    width: 400px;
    min-height: 100px;

    .emoji_list {
        display: flex;
        flex-flow: row wrap;

        .emoji_item {}
    }

}
</style>
