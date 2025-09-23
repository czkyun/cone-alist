<template>
    <Teleport to="body">
        <TransitionGroup
            name="notification"
            tag="div"
            class="notification-container"
        >
            <div
                v-for="notification in notifications"
                :key="notification.id"
                class="notification-item"
                :class="[
                    `notification-item--${notification.type}`,
                    {
                        'notification-item--dismissible':
                            notification.dismissible,
                    },
                ]"
            >
                <div class="notification-icon">
                    <v-icon
                        :icon="getIcon(notification.type)"
                        size="20"
                    ></v-icon>
                </div>

                <div class="notification-content">
                    <div v-if="notification.title" class="notification-title">
                        {{ notification.title }}
                    </div>
                    <div class="notification-message">
                        {{ notification.message }}
                    </div>
                </div>

                <v-btn
                    v-if="notification.dismissible"
                    icon
                    variant="text"
                    size="small"
                    class="notification-close"
                    @click="dismiss(notification.id)"
                >
                    <v-icon size="16">mdi-close</v-icon>
                </v-btn>
            </div>
        </TransitionGroup>
    </Teleport>
</template>

<script lang="ts" setup>
interface Notification {
    id: string;
    type: "success" | "error" | "warning" | "info";
    title?: string;
    message: string;
    duration?: number;
    dismissible?: boolean;
}

const notifications = ref<Notification[]>([]);

function getIcon(type: string) {
    const icons = {
        success: "mdi-check-circle",
        error: "mdi-alert-circle",
        warning: "mdi-alert",
        info: "mdi-information",
    };
    return icons[type as keyof typeof icons] || "mdi-information";
}

function add(notification: Omit<Notification, "id">) {
    const id = Math.random().toString(36).substring(2);
    const newNotification: Notification = {
        id,
        dismissible: true,
        duration: 4000,
        ...notification,
    };

    notifications.value.push(newNotification);

    if (newNotification.duration && newNotification.duration > 0) {
        setTimeout(() => {
            dismiss(id);
        }, newNotification.duration);
    }
}

function dismiss(id: string) {
    const index = notifications.value.findIndex((n) => n.id === id);
    if (index > -1) {
        notifications.value.splice(index, 1);
    }
}

// 暴露方法给外部使用
defineExpose({
    add,
    dismiss,
});
</script>

<style lang="less" scoped>
.notification-container {
    position: fixed;
    top: 80px;
    right: 24px;
    z-index: 10000;
    max-width: 400px;
    width: 100%;
    pointer-events: none;
}

.notification-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
    margin-bottom: 12px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    pointer-events: auto;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        transform: translateX(-4px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    }

    &--success {
        border-left: 4px solid #4caf50;

        .notification-icon {
            color: #4caf50;
        }
    }

    &--error {
        border-left: 4px solid #f44336;

        .notification-icon {
            color: #f44336;
        }
    }

    &--warning {
        border-left: 4px solid #ff9800;

        .notification-icon {
            color: #ff9800;
        }
    }

    &--info {
        border-left: 4px solid #2196f3;

        .notification-icon {
            color: #2196f3;
        }
    }
}

.notification-icon {
    flex-shrink: 0;
    margin-top: 2px;
}

.notification-content {
    flex: 1;
    min-width: 0;
}

.notification-title {
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 4px;
    color: rgba(255, 255, 255, 0.95);
}

.notification-message {
    font-size: 0.85rem;
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.8);
    word-break: break-word;
}

.notification-close {
    flex-shrink: 0;
    opacity: 0.6;
    transition: opacity 0.2s ease;

    &:hover {
        opacity: 1;
    }
}

/* 动画 */
.notification-enter-active,
.notification-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.notification-enter-from {
    opacity: 0;
    transform: translateX(100%) translateY(-20px);
}

.notification-leave-to {
    opacity: 0;
    transform: translateX(100%) scale(0.8);
}

.notification-move {
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 响应式设计 */
@media (max-width: 768px) {
    .notification-container {
        top: 70px;
        right: 16px;
        left: 16px;
        max-width: none;
    }

    .notification-item {
        padding: 12px;
        margin-bottom: 8px;
    }
}
</style>
