import axios from "axios";
import { ElNotification } from "element-plus";

export const useFiles = defineStore("patfiles", {
    state: () => ({
        fileList: [] as IFiles[],
        total: 0,
        page: 1,
        per_page: 0,
        loading: false,
        lastPath: "", // 记录上次请求的路径，用于优化重复请求
    }),
    getters: {
        // 文件夹数量
        folderCount: (state) =>
            state.fileList.filter((file) => file.is_dir).length,
        // 文件数量
        fileCount: (state) =>
            state.fileList.filter((file) => !file.is_dir).length,
        // 是否有文件
        hasFiles: (state) => state.fileList.length > 0,
    },
    actions: {
        async getFileList(path: string, forceRefresh = false) {
            // 避免重复请求相同路径
            if (this.lastPath === path && !forceRefresh && this.hasFiles) {
                return;
            }

            this.loading = true;
            this.lastPath = path;

            try {
                const { data } = await axios.post("/api/getFileList", {
                    path,
                    page: this.page,
                    per_page: this.per_page,
                });

                if (data.code == 200) {
                    this.fileList = data.data.content || [];
                    this.total = data.data.total || this.fileList.length;

                    // 对 this.fileList 进行排序, 文件夹在前, 文件在后
                    this.fileList.sort((a, b) => {
                        if (a.is_dir && !b.is_dir) {
                            return -1;
                        } else if (!a.is_dir && b.is_dir) {
                            return 1;
                        } else {
                            // 相同类型按名称排序
                            return a.name.localeCompare(b.name, undefined, {
                                numeric: true,
                                sensitivity: "base",
                            });
                        }
                    });
                } else {
                    this.fileList = [];
                    this.total = 0;
                    ElNotification({
                        title: "错误",
                        message: data.message || "获取文件列表失败",
                        type: "error",
                        duration: 4000,
                    });
                    console.error("获取文件列表失败:", data.message);
                }
            } catch (error) {
                this.fileList = [];
                this.total = 0;
                ElNotification({
                    title: "网络错误",
                    message: "无法连接到服务器，请检查网络连接",
                    type: "error",
                    duration: 4000,
                });
                console.error("网络请求失败:", error);
            } finally {
                this.loading = false;
            }
        },

        // 刷新当前文件列表
        async refreshFileList() {
            if (this.lastPath) {
                await this.getFileList(this.lastPath, true);
            }
        },

        // 清空文件列表
        clearFileList() {
            this.fileList = [];
            this.total = 0;
            this.lastPath = "";
        },
    },
});
