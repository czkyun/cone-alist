<script lang="ts" setup>
import { join } from "path-browserify";
import axios from "axios";
import { ElMessage } from "element-plus";

const props = defineProps<{
    item: IFiles;
}>();

const route = useRoute();
const router = useRouter();
const main = useMain();

const path = computed(() => route.params.path as string);
const isLoading = ref(false);

// 获取文件类型图标和颜色
const fileInfo = computed(() => {
    const fileName = props.item.name.toLowerCase();
    const suffix = fileName.split(".").pop();

    if (props.item.is_dir) {
        return {
            icon: "mdi-folder",
            color: "amber",
            type: "文件夹",
        };
    }

    // 图片文件
    if (
        ["bmp", "jpg", "jpeg", "png", "gif", "webp", "svg"].includes(
            suffix || ""
        )
    ) {
        return {
            icon: "mdi-image",
            color: "green",
            type: "图片",
        };
    }

    // 视频文件
    if (
        [
            "mp4",
            "mkv",
            "webm",
            "avi",
            "mpg",
            "mpeg",
            "rm",
            "rmvb",
            "mov",
            "wmv",
            "asf",
            "flv",
        ].includes(suffix || "")
    ) {
        return {
            icon: "mdi-video",
            color: "red",
            type: "视频",
        };
    }

    // 音频文件
    if (["ogg", "mp3", "wav", "flac", "aac", "m4a"].includes(suffix || "")) {
        return {
            icon: "mdi-music",
            color: "purple",
            type: "音频",
        };
    }

    // 压缩文件
    if (
        ["zip", "rar", "7z", "tar", "gz", "bz2", "iso", "dmg"].includes(
            suffix || ""
        )
    ) {
        return {
            icon: "mdi-archive",
            color: "orange",
            type: "压缩包",
        };
    }

    // 文档文件
    if (
        ["doc", "docx", "xls", "xlsx", "ppt", "pptx", "pdf"].includes(
            suffix || ""
        )
    ) {
        return {
            icon: "mdi-file-document",
            color: "blue",
            type: "文档",
        };
    }

    // 代码文件
    if (
        [
            "js",
            "ts",
            "vue",
            "html",
            "css",
            "scss",
            "less",
            "py",
            "java",
            "cpp",
            "c",
            "php",
            "go",
            "rs",
        ].includes(suffix || "")
    ) {
        return {
            icon: "mdi-code-braces",
            color: "indigo",
            type: "代码",
        };
    }

    // 文本文件
    if (
        [
            "txt",
            "md",
            "json",
            "xml",
            "yml",
            "yaml",
            "ini",
            "cfg",
            "conf",
        ].includes(suffix || "")
    ) {
        return {
            icon: "mdi-file-document-outline",
            color: "grey",
            type: "文本",
        };
    }

    return {
        icon: "mdi-file",
        color: "grey",
        type: "文件",
    };
});

const to = computed(() => {
    let url = join(path.value, props.item.name);
    return url;
});

async function click() {
    if (isLoading.value) return;

    isLoading.value = true;

    try {
        if (props.item.is_dir) {
            router.push(`/${to.value}`);
        } else {
            const { data } = await axios.post(`/api/getFileContent`, {
                path: to.value,
            });

            if (data.code == 200) {
                window.open(data.data.raw_url);
            } else {
                ElMessage.error(data.message || "获取文件失败");
            }
        }
    } catch (error) {
        ElMessage.error("操作失败，请重试");
        console.error("文件操作失败:", error);
    } finally {
        isLoading.value = false;
    }
}

// 格式化文件大小
const formattedSize = computed(() => {
    if (props.item.is_dir) return "-";
    return main.formatSize(props.item.size);
});

// 格式化修改时间
const formattedTime = computed(() => {
    return main.formatTime(props.item.modified);
});
</script>
<template>
    <v-list-item
        class="file-item"
        :class="{ 'file-item--loading': isLoading }"
        :data-file-type="fileInfo.type.toLowerCase()"
        @click="click"
        :disabled="isLoading"
        lines="two"
    >
        <!-- 文件图标 -->
        <template #prepend>
            <div class="file-icon-container">
                <v-avatar
                    :color="fileInfo.color"
                    variant="tonal"
                    size="40"
                    class="file-avatar"
                >
                    <v-icon :icon="fileInfo.icon" size="20"></v-icon>
                </v-avatar>
                <!-- 加载指示器 -->
                <v-progress-circular
                    v-if="isLoading"
                    indeterminate
                    size="16"
                    width="2"
                    class="loading-indicator"
                    color="primary"
                ></v-progress-circular>
            </div>
        </template>

        <!-- 文件信息 -->
        <v-list-item-title class="file-name">
            {{ item.name }}
        </v-list-item-title>

        <v-list-item-subtitle class="file-details">
            <div class="file-meta">
                <v-chip
                    size="x-small"
                    variant="outlined"
                    :color="fileInfo.color"
                    class="file-type-chip"
                >
                    {{ fileInfo.type }}
                </v-chip>
                <span class="file-size">{{ formattedSize }}</span>
                <span class="file-time">{{ formattedTime }}</span>
            </div>
        </v-list-item-subtitle>

        <!-- 操作按钮 -->
        <template #append>
            <v-btn
                icon
                variant="text"
                size="small"
                class="action-btn"
                @click.stop="click"
                :loading="isLoading"
            >
                <v-icon>
                    {{ item.is_dir ? "mdi-folder-open" : "mdi-download" }}
                </v-icon>
                <v-tooltip activator="parent" location="top">
                    {{ item.is_dir ? "打开文件夹" : "下载文件" }}
                </v-tooltip>
            </v-btn>
        </template>
    </v-list-item>
</template>

<script lang="ts">
export default {
    name: "PathItemFiles",
};
</script>
<style lang="less" scoped>
.file-item {
    border-radius: 12px !important;
    margin: 4px 0;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;

    &:hover {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(255, 255, 255, 0.15);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &--loading {
        opacity: 0.7;
        pointer-events: none;
    }
}

.file-icon-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.file-avatar {
    transition: all 0.2s ease;
}

.file-item:hover .file-avatar {
    transform: scale(1.05);
}

.loading-indicator {
    position: absolute;
    top: -2px;
    right: -2px;
}

.file-name {
    font-weight: 500;
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.9);
    word-break: break-word;
    line-height: 1.4;
}

.file-details {
    margin-top: 4px;
}

.file-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
}

.file-type-chip {
    font-size: 0.7rem;
    height: 20px;
    font-weight: 500;
}

.file-size {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
}

.file-time {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.5);
    margin-left: auto;
}

.action-btn {
    opacity: 0;
    transition: all 0.2s ease;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;

    .v-icon {
        transition: transform 0.2s ease;
    }

    &:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: scale(1.05);

        .v-icon {
            transform: scale(1.1);
        }
    }
}

.file-item:hover .action-btn {
    opacity: 1;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .file-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
    }

    .file-time {
        margin-left: 0;
    }

    .action-btn {
        opacity: 1;
    }
}

/* 不同文件类型的特殊样式 */
.file-item {
    &[data-file-type="folder"] {
        border-left: 3px solid #ffc107;
    }

    &[data-file-type="image"] {
        border-left: 3px solid #4caf50;
    }

    &[data-file-type="video"] {
        border-left: 3px solid #f44336;
    }

    &[data-file-type="audio"] {
        border-left: 3px solid #9c27b0;
    }

    &[data-file-type="code"] {
        border-left: 3px solid #3f51b5;
    }

    &[data-file-type="document"] {
        border-left: 3px solid #2196f3;
    }

    &[data-file-type="archive"] {
        border-left: 3px solid #ff9800;
    }
}

/* 暗色主题适配 */
.v-theme--dark .file-item {
    background: rgba(255, 255, 255, 0.03);
    border-color: rgba(255, 255, 255, 0.08);

    &:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.2);
    }
}
</style>
