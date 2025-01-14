<script lang='ts' setup>

const props = defineProps<{
    routes: { icon?: string, label: string, path: string }[]
    color?: string
}>()

const linkColor = computed(() => props.color || 'unset')

</script>
<template>
    <a-breadcrumb :routes="routes" class="breadcrumb">
        <a-breadcrumb-item v-for="item in routes">
            <router-link :to="item.path" class="link">
                <v-icon v-if="item.icon" :icon="item.icon"></v-icon>
                <span>{{ item.label }}</span>
            </router-link>
        </a-breadcrumb-item>
    </a-breadcrumb>
</template>
<script lang='ts'>

export default {
    name: 'EnBreadcrumb',
}
</script>
<style lang='less' scoped>
.breadcrumb {
    flex-wrap: wrap;

    .link {
        display: flex;
        align-items: center;
        color: v-bind(linkColor);
    }
}
</style>
