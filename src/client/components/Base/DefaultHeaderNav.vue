<script lang='ts' setup>

const main = useMain()

</script>
<template>
    <div class="header-nav">
        <div class="nav">
            <v-chip variant="text" label v-for="item in main.navUrl" :key="item.url" :href="item.url"
                :prepend-icon="item.icon">
                {{ item.title }}
            </v-chip>
        </div>
    </div>
</template>
<script lang='ts'>

export default {
    name: 'DefaultHeaderNav',
}
</script>
<style lang='less' scoped>
.header-nav {
    display: flex;
    align-items: center;
    justify-content: center;

    .nav {
        border-radius: 5rem;
        background-color: rgb(var(--v-theme-background));
        padding: 0.5rem 1rem;
    }
}
</style>
