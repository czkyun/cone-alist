<template>
    <Teleport to="body">
        <Transition name="loading-overlay">
            <div v-if="visible" class="loading-overlay">
                <div class="loading-content">
                    <div class="loading-spinner">
                        <v-progress-circular
                            indeterminate
                            :size="size"
                            :width="width"
                            :color="color"
                        ></v-progress-circular>
                    </div>
                    <div v-if="message" class="loading-message">
                        {{ message }}
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script lang="ts" setup>
interface Props {
    visible?: boolean;
    message?: string;
    size?: number;
    width?: number;
    color?: string;
}

withDefaults(defineProps<Props>(), {
    visible: false,
    message: "加载中...",
    size: 64,
    width: 4,
    color: "primary",
});
</script>

<style lang="less" scoped>
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 32px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(20px);
}

.loading-spinner {
    position: relative;
}

.loading-message {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
}

/* 动画 */
.loading-overlay-enter-active,
.loading-overlay-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.loading-overlay-enter-from,
.loading-overlay-leave-to {
    opacity: 0;
    backdrop-filter: blur(0px);
}

.loading-overlay-enter-from .loading-content,
.loading-overlay-leave-to .loading-content {
    transform: scale(0.8) translateY(20px);
    opacity: 0;
}
</style>
