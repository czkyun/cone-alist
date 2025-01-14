<script lang='ts' setup>
import { join } from 'path-browserify'
import axios from 'axios';
import { ElMessage } from 'element-plus';

const props = defineProps<{
    item: IFiles
}>()

const route = useRoute()
const router = useRouter()

const main = useMain()

const path = computed(() => route.params.path as string)

const avatar = computed(() => {
    // if (['bmp', 'jpg', 'jpeg', 'png', 'gif'].indexOf(suffix) > -1) {
    //     return "mdi-image-area";
    // } else if (['mp4', 'mkv', 'webm', 'avi', 'mpg', 'mpeg', 'rm', 'rmvb', 'mov', 'wmv', 'mkv', 'asf'].indexOf(suffix) > -1) {
    //     return "mdi-video";
    // } else if (['ogg', 'mp3', 'wav', 'flac'].indexOf(suffix) > -1) {
    //     return "mdi-volume-high";
    // } else if (['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'iso'].indexOf(suffix) > -1) {
    //     return "mdi-archive";
    // } else if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf'].indexOf(suffix) > -1) {
    //     return "mdi-file-pdf";
    // } else if (['txt', 'md'].indexOf(suffix) > -1) {
    //     return "mdi-file-document";
    // }

    if (props.item.is_dir) return 'mdi-folder-outline'
    return 'mdi-file-outline'
})

const to = computed(() => {
    // const path = route.params.path as string
    let url = join(path.value, props.item.name)
    console.log(url);
    return url
})

async function click() {
    if (props.item.is_dir) {
        router.push(`/${to.value}`)
    } else {
        // console.log('download');
        // console.log(to.value);
        const { data } = await axios.post(`/api/getFileContent`, { path: to.value })

        if (data.code == 200) {
            // console.log(data.data.raw_url);
            window.open(data.data.raw_url)
        } else {
            ElMessage.error(data.message)
        }

    }
}

</script>
<template>
    <v-list-item :title="item.name" :prepend-icon="avatar" @click="click">
        <template #append>
            <a-descriptions :data="[
                { label: main.formatSize(item.size), value: main.formatTime(item.modified) }
            ]" />
        </template>
    </v-list-item>
</template>
<script lang='ts'>

export default {
    name: 'PathItemFiles',
}
</script>
<style lang='less' scoped></style>
