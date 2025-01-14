<script lang='ts' setup>

</script>
<template>
    <v-layout class="rounded rounded-md">
        <DefaultHeader> </DefaultHeader>
        <v-main>
            <v-container>
                <router-view v-slot="{ Component }">
                    <keep-alive>
                        <component :is="Component" />
                    </keep-alive>
                </router-view>
            </v-container>
            <BaseFooter></BaseFooter>
        </v-main>
    </v-layout>
</template>
<script lang='ts'>

export default {
    name: 'LayoutDefault',
}
</script>
<style lang='less' scoped></style>
