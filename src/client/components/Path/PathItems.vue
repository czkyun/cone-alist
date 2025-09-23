<script lang="ts" setup>
const files = useFiles();
const route = useRoute();

const path = computed(() => {
    return route.params.path as string;
});

watch(
    path,
    () => {
        files.getFileList(path.value);
    },
    { immediate: true }
);
</script>
<template>
    <div class="path-items-container">
        <v-list class="file-list">
            <TransitionGroup name="file-item" tag="div">
                <PathItemFiles
                    v-for="item in files.fileList"
                    :key="item.name"
                    :item="item"
                />
            </TransitionGroup>
        </v-list>
    </div>
</template>
<script lang="ts">
export default {
    name: "PathItems",
};
</script>
<style lang="less" scoped>
.path-items-container {
    width: 100%;
}

.file-list {
    background: transparent;
    padding: 0;
}

/* 文件项动画 */
.file-item-enter-active,
.file-item-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.file-item-enter-from {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
}

.file-item-leave-to {
    opacity: 0;
    transform: translateY(-30px) scale(0.9);
}

.file-item-move {
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 确保列表项有合适的间距 */
:deep(.v-list-item) {
    min-height: 64px;
    padding: 8px 0;
}
</style>
