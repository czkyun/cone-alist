<script lang='ts' setup>

const props = defineProps<{
    to?: string
    target?: "_blank" | "_parent" | "_self" | "_top"
    href?: string
    color?: string
    appendIcon?: string
}>()

const linkColor = computed(() => props.color || 'rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity))')

</script>
<template>
    <RouterLink v-if="to" :to="to">
        <el-link :underline="false" class="en-link">
            <slot></slot>
            <v-icon v-if="appendIcon" size="14" :icon="appendIcon"></v-icon>
        </el-link>
    </RouterLink>
    <el-link class="en-link" v-else :href="href" :target="target || '_blank'" :underline="false">
        <slot></slot>
        <v-icon v-if="appendIcon" size="14" :icon="appendIcon"></v-icon>
    </el-link>
</template>
<script lang='ts'>

export default {
    name: 'EnLink',
}
</script>
<style lang='less' scoped>
.en-link {
    color: v-bind(linkColor);
    transform: 1s;
    margin-right: 0.5rem;

    &:hover {
        opacity: .7;
    }
}
</style>
