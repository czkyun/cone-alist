<script lang="ts" setup>
const props = defineProps<{
    routes: { icon?: string; label: string; path: string }[];
    color?: string;
}>();

const linkColor = computed(() => props.color || "rgba(255, 255, 255, 0.8)");
</script>
<template>
    <div class="breadcrumb-container">
        <nav class="breadcrumb-nav">
            <div
                v-for="(item, index) in routes"
                :key="item.path"
                class="breadcrumb-item"
                :class="{ 'is-last': index === routes.length - 1 }"
            >
                <router-link
                    :to="item.path"
                    class="breadcrumb-link"
                    :class="{ 'is-current': index === routes.length - 1 }"
                >
                    <v-icon
                        v-if="item.icon"
                        :icon="item.icon"
                        size="18"
                        class="breadcrumb-icon"
                    ></v-icon>
                    <span class="breadcrumb-label">{{ item.label }}</span>
                </router-link>

                <!-- 分隔符 -->
                <v-icon
                    v-if="index < routes.length - 1"
                    icon="mdi-chevron-right"
                    size="16"
                    class="breadcrumb-separator"
                ></v-icon>
            </div>
        </nav>
    </div>
</template>
<script lang="ts">
export default {
    name: "EnBreadcrumb",
};
</script>
<style lang="less" scoped>
.breadcrumb-container {
    width: 100%;
    overflow: hidden;
}

.breadcrumb-nav {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 4px;
    padding: 8px 0;
}

.breadcrumb-item {
    display: flex;
    align-items: center;
    flex-shrink: 0;
}

.breadcrumb-link {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 8px;
    text-decoration: none;
    color: v-bind(linkColor);
    font-weight: 500;
    font-size: 0.9rem;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;

    &:hover {
        background: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.95);
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }

    &.is-current {
        background: rgba(255, 255, 255, 0.08);
        color: rgba(255, 255, 255, 0.95);
        font-weight: 600;
        border: 1px solid rgba(255, 255, 255, 0.15);

        &:hover {
            background: rgba(255, 255, 255, 0.12);
        }
    }

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
        );
        transition: left 0.6s ease;
    }

    &:hover::before {
        left: 100%;
    }
}

.breadcrumb-icon {
    flex-shrink: 0;
    opacity: 0.8;
    transition: opacity 0.2s ease;
}

.breadcrumb-link:hover .breadcrumb-icon {
    opacity: 1;
}

.breadcrumb-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 150px;
    line-height: 1.2;
}

.breadcrumb-separator {
    margin: 0 4px;
    color: rgba(255, 255, 255, 0.4);
    flex-shrink: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .breadcrumb-label {
        max-width: 100px;
    }

    .breadcrumb-link {
        padding: 4px 8px;
        font-size: 0.8rem;
    }
}

@media (max-width: 480px) {
    .breadcrumb-nav {
        flex-wrap: nowrap;
        overflow-x: auto;
        gap: 2px;
        padding-bottom: 12px;

        &::-webkit-scrollbar {
            height: 4px;
        }

        &::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 2px;
        }

        &::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 2px;
        }
    }

    .breadcrumb-label {
        max-width: 80px;
    }
}

/* 暗色主题适配 */
.v-theme--dark {
    .breadcrumb-link {
        &:hover {
            background: rgba(255, 255, 255, 0.08);
        }

        &.is-current {
            background: rgba(255, 255, 255, 0.06);
            border-color: rgba(255, 255, 255, 0.12);
        }
    }
}
</style>
