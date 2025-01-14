<script lang='ts' setup>

const main = useMain()

</script>
<template>
    <v-app-bar>
        <template #title>
            <v-btn @click="main.drawer = !main.drawer" variant="text">
                <v-icon>mdi-menu </v-icon>
            </v-btn>
            小莫的云网盘
        </template>
    </v-app-bar>
    <v-app-bar color="#0000" elevation="0" class="d-none d-md-block" v-if="!main.drawer">
        <v-container>
            <DefaultHeaderNav></DefaultHeaderNav>
        </v-container>
    </v-app-bar>
    <v-navigation-drawer v-model="main.drawer">
        <v-list>
            <v-list-item v-for="item in main.navUrl" :prepend-icon="item.icon" :title="item.title" :href="item.url">
            </v-list-item>
        </v-list>
        <template #append>
            <Income :key="$route.path"></Income>
            <v-list-item @click="main.drawer = !main.drawer"
                :prepend-icon="main.drawer ? 'mdi-chevron-double-left' : 'mdi-chevron-double-right'">
            </v-list-item>
        </template>
    </v-navigation-drawer>
</template>
<script lang='ts'>

export default {
    name: 'DefaultHeader',
}
</script>
<style lang='less' scoped></style>
