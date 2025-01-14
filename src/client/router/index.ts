import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { setupLayouts } from 'virtual:generated-layouts'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: setupLayouts([
        ...routes,
    ]),
})


NProgress.configure({
    easing: 'ease', // 动画方式
    speed: 600, // 递增进度条的速度
    showSpinner: true, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
})

router.beforeEach((to, from, next) => {
    NProgress.start();
    if (to.meta.title) {
        let meta: any = to.meta;
        document.title = meta.title
    }
    next();
});
router.afterEach(() => { // 在即将进入新的页面组件前，关闭掉进度条
    NProgress.done()

    // // 滚动条定位到 顶部
    window.scrollTo(0, 0)

})

export default router
