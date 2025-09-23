<script lang="ts" setup>
import axios from "axios";

const files = useFiles();
const route = useRoute();

const showReadme = computed(() => {
    return files.fileList.some((file) => file.name === "README.md");
});

const path = computed(() => {
    return (route.params.path as string) || "/";
});

// 分页相关状态
const itemsPerPage = ref(20);
const currentPage = ref(1);

// 计算分页后的文件列表
const paginatedFiles = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return files.fileList.slice(start, end);
});

// 总页数
const totalPages = computed(() => {
    return Math.ceil(files.fileList.length / itemsPerPage.value);
});

// 监听路由变化，重置分页
watch(
    () => files.fileList,
    () => {
        currentPage.value = 1;
    },
    { deep: true }
);

watch(
    path,
    () => {
        files.getFileList(path.value);
    },
    {
        immediate: true,
    }
);

// 页面切换处理
function handlePageChange(page: number) {
    currentPage.value = page;
    // 滚动到顶部
    const container = document.querySelector(".v-main");
    if (container) {
        container.scrollTo({ top: 0, behavior: "smooth" });
    }
}

axios.post("/api/getSiteName").then(({ data }) => {
    document.title = data.data;
});
</script>
<template>
    <div class="path-index-container">
        <!-- 面包屑导航 -->
        <v-card class="breadcrumb-card" elevation="1">
            <v-card-title class="breadcrumb-title">
                <v-icon class="mr-2" color="primary">mdi-folder-open</v-icon>
                <PathBreadcrumbs></PathBreadcrumbs>
            </v-card-title>
        </v-card>

        <!-- 文件统计信息 -->
        <v-card class="stats-card mt-4" elevation="1" v-if="!files.loading">
            <v-card-text class="stats-content">
                <v-row align="center">
                    <v-col cols="auto">
                        <v-chip color="primary" variant="outlined" class="mr-2">
                            <v-icon start>mdi-file-multiple</v-icon>
                            {{ files.fileList.length }} 项目
                        </v-chip>
                    </v-col>
                    <v-col cols="auto" v-if="totalPages > 1">
                        <v-chip color="secondary" variant="outlined">
                            <v-icon start>mdi-page-layout-body</v-icon>
                            第 {{ currentPage }} 页，共 {{ totalPages }} 页
                        </v-chip>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="auto">
                        <el-select
                            v-model="itemsPerPage"
                            placeholder="每页显示"
                            size="small"
                            style="width: 120px"
                        >
                            <el-option label="10" :value="10"></el-option>
                            <el-option label="20" :value="20"></el-option>
                            <el-option label="50" :value="50"></el-option>
                            <el-option label="100" :value="100"></el-option>
                        </el-select>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        <!-- 主内容区域 -->
        <v-card class="main-card mt-4" :loading="files.loading" elevation="2">
            <!-- 加载状态 -->
            <v-card-text v-if="files.loading" class="loading-container">
                <div class="loading-content">
                    <v-progress-circular
                        indeterminate
                        color="primary"
                        size="64"
                        class="mb-4"
                    ></v-progress-circular>
                    <p class="text-h6 text-center">正在加载文件列表...</p>
                </div>
            </v-card-text>

            <!-- 文件列表 -->
            <v-card-text
                v-else-if="files.fileList.length > 0"
                class="file-list-container"
            >
                <Income :key="$route.path" class="mb-4"></Income>

                <!-- 文件网格视图 -->
                <div class="files-grid">
                    <TransitionGroup
                        name="file-item"
                        tag="div"
                        class="files-transition-group"
                    >
                        <PathItemFiles
                            v-for="item in paginatedFiles"
                            :key="item.name"
                            :item="item"
                            class="file-item-wrapper"
                        ></PathItemFiles>
                    </TransitionGroup>
                </div>

                <!-- 分页控件 -->
                <div class="pagination-container" v-if="totalPages > 1">
                    <v-pagination
                        v-model="currentPage"
                        :length="totalPages"
                        :total-visible="7"
                        @update:model-value="handlePageChange"
                        class="pagination"
                        variant="elevated"
                        show-first-last-page
                    ></v-pagination>
                </div>
            </v-card-text>

            <!-- 空状态 -->
            <v-card-text v-else class="empty-container">
                <div class="empty-content">
                    <v-icon size="96" color="grey-lighten-2"
                        >mdi-folder-open-outline</v-icon
                    >
                    <h3 class="text-h5 mt-4 mb-2">文件夹为空</h3>
                    <p class="text-body-1 text-grey">
                        当前文件夹中没有任何文件或文件夹
                    </p>
                    <v-btn
                        color="primary"
                        variant="outlined"
                        class="mt-4"
                        @click="files.getFileList($route.params.path as string)"
                    >
                        <v-icon start>mdi-refresh</v-icon>
                        刷新
                    </v-btn>
                </div>
            </v-card-text>
        </v-card>

        <!-- README 展示 -->
        <v-card
            class="readme-card mt-4"
            elevation="1"
            v-if="showReadme && !files.loading"
        >
            <v-card-title class="readme-title">
                <v-icon class="mr-2" color="info">mdi-text-box</v-icon>
                README.md
            </v-card-title>
            <v-card-text>
                <PathReadme></PathReadme>
            </v-card-text>
        </v-card>
    </div>
</template>
<script lang="ts">
export default {
    name: "PathIndex",
};
</script>
<style lang="less" scoped>
.path-index-container {
    width: 100%;
}

.breadcrumb-card {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.breadcrumb-title {
    padding: 16px 20px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
}

.stats-card {
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.08);
}

.stats-content {
    padding: 12px 20px;
}

.main-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    min-height: 400px;
}

.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
}

.loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.file-list-container {
    padding: 20px;
}

.files-grid {
    margin-bottom: 24px;
}

.files-transition-group {
    display: grid;
    gap: 8px;
    grid-template-columns: 1fr;
}

.file-item-wrapper {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 文件项动画 */
.file-item-enter-active,
.file-item-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.file-item-enter-from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
}

.file-item-leave-to {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
}

.file-item-move {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.empty-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
}

.empty-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 400px;
    margin: 0 auto;
}

.readme-card {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.readme-title {
    padding: 16px 20px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* 响应式设计 */
@media (min-width: 768px) {
    .files-transition-group {
        grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
        gap: 12px;
    }
}

@media (min-width: 1200px) {
    .files-transition-group {
        grid-template-columns: 1fr;
        gap: 8px;
    }
}

/* 暗色主题优化 */
.v-theme--dark {
    .breadcrumb-card,
    .stats-card,
    .main-card,
    .readme-card {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.12);
    }
}
</style>
