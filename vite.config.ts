import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from 'vite-plugin-vue-devtools'

import vuetify from 'vite-plugin-vuetify'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Layouts from 'vite-plugin-vue-layouts';
import VueRouter from 'unplugin-vue-router/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        VueRouter({
            routesFolder: "src/client/pages",
        }),
        vue(),
        vuetify({ autoImport: true }),
        vueDevTools(),
        Layouts({
            layoutsDirs: 'src/client/layouts', // 指定布局文件的目录路径
            defaultLayout: 'default' // 指定默认布局文件的名称
        }),
        AutoImport({
            imports: ['vue', 'vue-router', 'pinia'],
            resolvers: [
                ElementPlusResolver(),
                // 自动导入图标组件
                IconsResolver({
                    prefix: 'Icon',
                }),
                ArcoResolver(),
            ],
            dirs: ['src/client/model', 'src/client/stores'],
        }),
        Components({
            dirs: ['src/client/components'],
            resolvers: [
                ElementPlusResolver(),
                // 自动注册图标组件
                IconsResolver({
                    enabledCollections: ['ep'],
                }),
                ArcoResolver({
                    sideEffect: true,
                    resolveIcons: true,
                    importStyle: 'less',
                })

            ],
        }),
        Icons({
            autoInstall: true,
        }),
    ],
    // 隐射 @ 到 /src
    resolve: {
        alias: {
            // "@/": "/src/client",
            '@': fileURLToPath(new URL('./src/client', import.meta.url))
        },
    },
});
