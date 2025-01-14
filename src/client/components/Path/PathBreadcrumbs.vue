<script lang='ts' setup>

const route = useRoute()

const routes = computed(() => {
    let path = (route.params.path as string).split('/')
    return [
        { label: 'Home', path: '/', icon: 'mdi-home' },
        ...path.map((item, index) => {
            return {
                label: item,
                path: '/' + path.slice(0, index + 1).join('/'),
            }
        })
    ]
})

</script>
<template>
    <EnBreadcrumb :routes="routes"></EnBreadcrumb>
</template>
<script lang='ts'>

export default {
    name: 'PathBreadcrumbs',
}
</script>
<style lang='less' scoped></style>
