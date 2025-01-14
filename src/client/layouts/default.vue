<script lang='ts' setup>

import { useTheme } from 'vuetify'
const theme = useTheme()

function setTheme(th: string) {
    theme.global.name.value = th
    document.documentElement.className = th
    document.body.setAttribute('arco-theme', th)
}

setTheme('dark')

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
