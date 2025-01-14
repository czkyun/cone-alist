<script lang='ts' setup>
import axios from 'axios';

const files = useFiles()

const showReadme = computed(() => {
    return files.fileList.some(file => file.name === 'README.md')
})

axios.post('/api/getSiteName').then(({ data }) => {
    document.title = data.data
})

</script>
<template>
    <v-card :loading="files.loading">
        <v-card-title>
            <PathBreadcrumbs></PathBreadcrumbs>
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="12">
                    <Income :key="$route.path"></Income>
                    <PathItems></PathItems>
                </v-col>
                <v-col cols="12" v-if="showReadme">
                    <PathReadme></PathReadme>
                </v-col>
                <v-col cols="12" v-if="!files.loading && files.fileList.length == 0">
                    <el-empty description="当前文件夹为空" />
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script lang='ts'>

export default {
    name: 'PathIndex',
}
</script>
<style lang='less' scoped></style>
