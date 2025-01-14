<script lang='ts' setup>
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

const props = defineProps<{
    interval?: number
    height?: string
    autoplay?: boolean
    indicatorPosition?: '' | 'none' | 'outside'
}>()

const type = computed<'' | 'card'>(() => {
    return width.value < 600 ? '' : 'card'
})

console.log('type:', type.value);


</script>
<template>
    <el-carousel :interval="interval || 2000" :type="type" :height="height || '250px'" :autoplay="autoplay"
        :indicator-position="indicatorPosition">
        <slot></slot>
    </el-carousel>
</template>
<script lang='ts'>

export default {
    name: 'EnCarousel',
}
</script>
<style lang='less' scoped></style>
