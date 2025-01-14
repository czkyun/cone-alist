import axios from 'axios'
import { ElNotification } from 'element-plus'


export const useFiles = defineStore('patfiles', {
    state: () => ({
        fileList: [] as IFiles[],
        total: 0,
        page: 1,
        per_page: 0,
        loading: false
    }),
    getters: {

    },
    actions: {
        async getFileList(path: string) {
            this.loading = true
            const { data } = await axios.post('/api/getFileList', { path, page: this.page, per_page: this.per_page })
            if (data.code == 200) {
                this.fileList = data.data.content
                this.total = data.data.total
                // 对 this.fileList 进行排序, 文件夹在前, 文件在后
                this.fileList.sort((a, b) => {
                    if (a.is_dir && !b.is_dir) {
                        return -1
                    } else if (!a.is_dir && b.is_dir) {
                        return 1
                    } else {
                        return 0
                    }
                })
            } else {
                this.fileList = []
                ElNotification({
                    title: "错误",
                    message: data.message,
                    type: 'error',

                })
                console.log(data.message);

            }
            this.loading = false
        }
    },
})