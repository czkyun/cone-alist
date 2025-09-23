<script lang="ts" setup>
const main = useMain();
</script>
<template>
    <v-app-bar
        class="modern-header"
        :elevation="0"
        color="transparent"
        height="64"
    >
        <template #title>
            <div class="header-content">
                <v-btn
                    @click="main.drawer = !main.drawer"
                    variant="text"
                    icon
                    class="menu-btn"
                    size="small"
                >
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
                <div class="brand-section">
                    <v-icon color="primary" size="28" class="brand-icon"
                        >mdi-cloud</v-icon
                    >
                    <h1 class="brand-title">小莫的云网盘</h1>
                </div>
            </div>
        </template>

        <template #append>
            <div class="header-actions">
                <v-btn icon variant="text" size="small" class="action-btn">
                    <v-icon>mdi-magnify</v-icon>
                    <v-tooltip activator="parent" location="bottom"
                        >搜索</v-tooltip
                    >
                </v-btn>

                <v-btn icon variant="text" size="small" class="action-btn">
                    <v-icon>mdi-brightness-6</v-icon>
                    <v-tooltip activator="parent" location="bottom"
                        >切换主题</v-tooltip
                    >
                </v-btn>
            </div>
        </template>
    </v-app-bar>

    <!-- 二级导航栏 -->
    <v-app-bar
        color="transparent"
        :elevation="0"
        class="secondary-header d-none d-md-block"
        v-if="!main.drawer"
        height="48"
    >
        <v-container class="nav-container">
            <DefaultHeaderNav></DefaultHeaderNav>
        </v-container>
    </v-app-bar>

    <!-- 侧边栏 -->
    <v-navigation-drawer v-model="main.drawer" class="modern-drawer" temporary>
        <div class="drawer-header">
            <div class="drawer-brand">
                <v-icon color="primary" size="24">mdi-cloud</v-icon>
                <span class="drawer-title">云网盘</span>
            </div>
        </div>

        <v-list class="drawer-nav">
            <v-list-item
                v-for="item in main.navUrl"
                :key="item.url"
                :prepend-icon="item.icon"
                :title="item.title"
                :href="item.url"
                :target="item.target ? '_blank' : '_self'"
                class="nav-item"
                lines="one"
            >
                <template #append v-if="item.target">
                    <v-icon size="14" opacity="0.6">mdi-open-in-new</v-icon>
                </template>
            </v-list-item>
        </v-list>

        <template #append>
            <div class="drawer-footer">
                <Income :key="$route.path" class="income-widget"></Income>
                <v-divider class="my-3"></v-divider>
                <v-list-item
                    @click="main.drawer = !main.drawer"
                    :prepend-icon="
                        main.drawer
                            ? 'mdi-chevron-double-left'
                            : 'mdi-chevron-double-right'
                    "
                    title="收起侧栏"
                    class="collapse-btn"
                >
                </v-list-item>
            </div>
        </template>
    </v-navigation-drawer>
</template>
<script lang="ts">
export default {
    name: "DefaultHeader",
};
</script>
<style lang="less" scoped>
.modern-header {
    background: rgba(255, 255, 255, 0.05) !important;
    backdrop-filter: blur(20px) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.header-content {
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
}

.menu-btn {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    transition: all 0.2s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.15);
        transform: scale(1.05);
    }
}

.brand-section {
    display: flex;
    align-items: center;
    gap: 12px;
}

.brand-icon {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.brand-title {
    font-size: 1.3rem;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
}

.action-btn {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    transition: all 0.2s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.12);
        transform: translateY(-1px);
    }
}

.secondary-header {
    background: rgba(255, 255, 255, 0.02) !important;
    backdrop-filter: blur(10px) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
}

.modern-drawer {
    background: rgba(30, 30, 30, 0.95) !important;
    backdrop-filter: blur(20px) !important;
    border-right: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.drawer-header {
    padding: 20px 24px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.drawer-brand {
    display: flex;
    align-items: center;
    gap: 12px;
}

.drawer-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
}

.drawer-nav {
    padding: 16px 8px;
}

.nav-item {
    margin: 4px 0;
    border-radius: 12px;
    transition: all 0.2s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.08);
        transform: translateX(4px);
    }

    :deep(.v-list-item__prepend) .v-icon {
        margin-right: 12px;
        opacity: 0.8;
    }
}

.drawer-footer {
    padding: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.income-widget {
    margin-bottom: 8px;
}

.collapse-btn {
    border-radius: 8px;
    transition: all 0.2s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.08);
    }
}

/* 响应式设计 */
@media (max-width: 768px) {
    .brand-title {
        font-size: 1.1rem;
    }

    .header-actions {
        gap: 4px;
    }

    .action-btn {
        padding: 6px;
    }
}

/* 暗色主题适配 */
.v-theme--dark {
    .modern-header {
        background: rgba(255, 255, 255, 0.03) !important;
        border-bottom-color: rgba(255, 255, 255, 0.08) !important;
    }

    .secondary-header {
        background: rgba(255, 255, 255, 0.01) !important;
        border-bottom-color: rgba(255, 255, 255, 0.03) !important;
    }

    .modern-drawer {
        background: rgba(20, 20, 20, 0.98) !important;
        border-right-color: rgba(255, 255, 255, 0.08) !important;
    }
}
</style>
