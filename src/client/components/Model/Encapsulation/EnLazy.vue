<script lang='ts' setup>

const props = defineProps<{
    components: { name: any, props: any, Minheight?: number }[]
}>()

</script>
<template>
    <v-lazy v-for="(component, index) in components" :key="index" :min-height="component.Minheight || 250"
        :options="{ 'threshold': 0.5 }" transition="fade-transition">
        <component :is="component.name" v-bind="component.props"></component>
    </v-lazy>
</template>
<script lang='ts'>

export default {
    name: 'EnLazy',
}
</script>
<style lang='less' scoped></style>
