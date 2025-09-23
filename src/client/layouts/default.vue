<script lang="ts" setup>
import { useTheme } from "vuetify";
const theme = useTheme();

function setTheme(th: string) {
    theme.global.name.value = th;
    document.documentElement.className = th;
    document.body.setAttribute("arco-theme", th);
}

setTheme("dark");

// 全局状态
const globalLoading = ref(false);
const notificationRef = ref();

// 暴露全局方法
provide("globalLoading", globalLoading);
provide("notification", notificationRef);
</script>
<template>
    <v-layout class="app-layout">
        <DefaultHeader></DefaultHeader>
        <v-main class="main-content">
            <v-container fluid class="content-container">
                <router-view v-slot="{ Component }">
                    <Transition name="page" mode="out-in">
                        <keep-alive>
                            <component :is="Component" />
                        </keep-alive>
                    </Transition>
                </router-view>
            </v-container>
            <BaseFooter></BaseFooter>
        </v-main>

        <!-- 全局组件 -->
        <LoadingOverlay :visible="globalLoading" />
        <NotificationSystem ref="notificationRef" />
    </v-layout>
</template>
<script lang="ts">
export default {
    name: "LayoutDefault",
};
</script>
<style lang="less" scoped>
.app-layout {
    min-height: 100vh;
    background: linear-gradient(135deg, #1e1e1e 0%, #2d2d2d 100%);
}

.main-content {
    background: transparent;
}

.content-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px 16px;
}

/* 页面切换动画 */
.page-enter-active,
.page-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-enter-from {
    opacity: 0;
    transform: translateY(20px);
}

.page-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

/* 扁平化设计的全局样式 */
:deep(.v-card) {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24) !important;
    border-radius: 8px !important;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(255, 255, 255, 0.08);
}

:deep(.v-card:hover) {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23) !important;
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.15);
}

:deep(.v-list-item) {
    border-radius: 6px !important;
    margin: 2px 0;
    transition: all 0.2s ease;
}

:deep(.v-list-item:hover) {
    background-color: rgba(255, 255, 255, 0.08) !important;
    transform: translateX(4px);
}

:deep(.v-btn) {
    border-radius: 6px !important;
    text-transform: none;
    font-weight: 500;
    transition: all 0.2s ease;
}

:deep(.v-btn:hover) {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* 滚动条美化 */
:deep(::-webkit-scrollbar) {
    width: 8px;
    height: 8px;
}

:deep(::-webkit-scrollbar-track) {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
}

:deep(::-webkit-scrollbar-thumb) {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
    transition: background 0.2s ease;
}

:deep(::-webkit-scrollbar-thumb:hover) {
    background: rgba(255, 255, 255, 0.3);
}

/* 选择文本样式 */
::selection {
    background: rgba(96, 165, 250, 0.3);
    color: white;
}

/* 焦点样式 */
:deep(.v-field__input:focus),
:deep(.v-input--focused) {
    box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.3);
}

/* 加载动画 */
@keyframes shimmer {
    0% {
        background-position: -200px 0;
    }
    100% {
        background-position: calc(200px + 100%) 0;
    }
}

.loading-shimmer {
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.05) 0px,
        rgba(255, 255, 255, 0.15) 40px,
        rgba(255, 255, 255, 0.05) 80px
    );
    background-size: 200px 100%;
    animation: shimmer 1.5s infinite;
}

/* 脉冲动画 */
@keyframes pulse {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: 0.7;
    }
}

.loading-pulse {
    animation: pulse 2s infinite;
}

/* 弹跳动画 */
@keyframes bounce {
    0%,
    20%,
    53%,
    80%,
    100% {
        transform: translate3d(0, 0, 0);
    }
    40%,
    43% {
        transform: translate3d(0, -8px, 0);
    }
    70% {
        transform: translate3d(0, -4px, 0);
    }
    90% {
        transform: translate3d(0, -2px, 0);
    }
}

.bounce {
    animation: bounce 1s infinite;
}

/* 工具提示样式美化 */
:deep(.v-tooltip > .v-overlay__content) {
    background: rgba(0, 0, 0, 0.9) !important;
    border-radius: 6px !important;
    padding: 8px 12px !important;
    font-size: 0.8rem !important;
    font-weight: 500 !important;
    backdrop-filter: blur(10px) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
}
</style>
