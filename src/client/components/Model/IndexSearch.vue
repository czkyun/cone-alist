<script lang='ts' setup>
import { Search as ELSearch } from '@element-plus/icons-vue'

const router = useRouter()
const search = useSearch()

const route = useRoute()

if (route.query.mods_title) {
    search.search = route.query.mods_title as string
}

function toSearch() {
    console.log(search.search);
    const query = { ...route.query }
    if (search.search === '') { delete query.mods_title }
    else { query.mods_title = search.search }
    router.push({ path: '/mods', query: query })
}
</script>
<template>
    <div class="search">
        <el-input v-model="search.search" :style="{ width: '60%', height: '50px' }" placeholder="在这里你可以搜索到你想要的东西哦~"
            @keyup.enter="toSearch">
            <template #suffix>
                <el-button @click="toSearch" link :icon="ELSearch"></el-button>
            </template>
        </el-input>
    </div>
</template>
<script lang='ts'>

export default {
    name: 'IndexSearch',
}
</script>
<style lang='less' scoped>
.search {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
}
</style>
