<script lang='ts' setup>

const files = useFiles()
const route = useRoute()

const path = computed(() => {
    return (route.params.path as string)
})

const passFiles = ['README.md']

watch(path, () => {
    files.getFileList(path.value)
}, { immediate: true })


</script>
<template>
    <v-list>
        <PathItemFiles v-for="item in files.fileList" :key="item.name" :item="item"></PathItemFiles>
    </v-list>
</template>
<script lang='ts'>

export default {
    name: 'PathItems',
}
</script>
<style lang='less' scoped></style>
