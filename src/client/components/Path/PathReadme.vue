<script lang='ts' setup>
import { join } from 'path-browserify'
import axios from 'axios';

const files = useFiles()
const route = useRoute()

const md = ref('')
const path = computed(() => route.params.path as string)

async function getReadme() {

    // 判断 files.fileList 是否包含 README.md
    if (files.fileList.some(file => file.name === 'README.md')) {

        let readme = join(path.value, 'README.md')
        // 获取 README.md 文件内容
        const { data } = await axios.post(`/api/getFileContent`, { path: readme })
        // console.log(data);
        if (data.code == 200) {
            fetch(data.data.raw_url)
                .then(res => res.text())
                .then(text => {
                    md.value = text
                })
        }
    }
}

watch(path, () => {
    getReadme()
}, { immediate: true })


</script>
<template>
    <v-card>
        <v-card-title>
            <v-chip variant="elevated" prepend-icon="mdi-material-design">README.md</v-chip>
        </v-card-title>
        <v-card-text>
            <Income :key="$route.path"></Income>
            <Markdown :md="md"></Markdown>
        </v-card-text>
    </v-card>
</template>
<script lang='ts'>

export default {
    name: 'PathReadme',
}
</script>
<style lang='less' scoped></style>
