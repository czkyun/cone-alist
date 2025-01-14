<script lang='ts' setup>

const value = defineModel<(string | number)[]>()

function onChange(key: (string | number)[]) {
    value.value = key
}

</script>
<template>
    <a-collapse :active-key="value" @change="onChange">
        <slot></slot>
    </a-collapse>
</template>
<script lang='ts'>

export default {
    name: 'EnCollapse',
}
</script>
<style lang='less' scoped></style>
