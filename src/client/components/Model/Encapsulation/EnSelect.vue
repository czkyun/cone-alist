<script lang='ts' setup>

type dropdownType = string | number | Record<string, any> | undefined | Event

const value = defineModel<dropdownType>()

const props = defineProps<{
    label: string
    items: {
        label: string
        value: dropdownType
    }[]
    width?: string
}>()

</script>
<template>
    <a-select class="select" v-model="value" :style="{ width: width || '180px' }" :placeholder="label"
        :bordered="false">
        <template #prefix>
            {{ label }}
        </template>
        <a-option v-for="item in items" :value="item.value">{{ item.label }}</a-option>
    </a-select>
</template>
<script lang='ts'>

export default {
    name: 'EnSelect',
}
</script>
<style lang='less' scoped>
.select {
    margin-bottom: 0.5rem;
}
</style>
