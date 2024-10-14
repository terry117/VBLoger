//项目主要入口：负责初始化应用程序并配置全局设置
//Vue.js 核心库
import Vue from 'vue'
//主应用组件
import App from './App'
import util from './utils/util'
//路由配置，用于导航
import router from './router'
//Markdown 编辑
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'mavon-editor/dist/markdown/github-markdown.min.css'
//Vuex 状态管理 : 默认情况下，import store from './store' 会导入 store 目录下的 index.js 文件
import store from './store'
//UI 组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//移动端 UI 组件库
import Vant from 'vant'
import 'vant/lib/index.css'

//注册组件
Vue.use(Vant)
Vue.use(ElementUI)
Vue.use(mavonEditor)

//全局方法$

//使用 mavonEditor 的 markdownIt 渲染 Markdown 内容
Vue.prototype.$markdown = function (value) {
    return mavonEditor.markdownIt.render(value)
}

//实现刷新当前路由的功能，通过先跳转到一个空页面，然后返回:直接刷新浏览器（如 window.location.reload()）
//会导致整个页面重新加载，并失去所有保存在内存中的状态。这种方法则避免了这种情况，只在 Vue 的路由级别处理。
Vue.prototype.$reload = function (context) {
    let NewPage = '/empty'
    context.$router.push(NewPage)  // 先跳转到空页面
    context.$nextTick(() => (context.$router.go(-1))) // 然后返回原页面
}

//设置网页标题，结合 store 中的配置
Vue.prototype.$setTitle = function (title) {
    if (title) {
        document.title = store.state.configuration.htmlTitle + " - " + title
    } else {
        document.title = store.state.configuration.htmlTitle
    }
}

//生成分享链接，通过 util.copy 复制到剪贴板，并显示确认对话框（区别在于桌面和移动端的 UI 处理）
Vue.prototype.$share = function (message) {
    if (!message) {
        message = window.location
    } else {
        let arr = (window.location + "").split("#")
        message = arr[0] + "#" + message
    }
    if (util.copy(message)) {
        Vue.prototype.$confirm('链接已复制,去分享给好友吧!!', '分享', {
            showCancelButton: false,
            showClose: false,
            type: 'success'
        })
    } else {
        Vue.prototype.$confirm('链接复制失败,可能因为浏览器不兼容', '分享', {
            showCancelButton: false,
            showClose: false,
            type: 'warning'
        })
    }
}

Vue.prototype.$mobileShare = function (message) {
    if (!message) {
        message = window.location
    } else {
        let arr = (window.location + "").split("#")
        message = arr[0] + "#" + message
    }
    if (util.copy(message)) {
        Vue.prototype.$dialog.alert({
            title: '分享',
            message: '链接已复制,去分享给好友吧!!'
        })
    } else {
        Vue.prototype.$dialog.alert({
            title: '分享',
            message: '链接复制失败,可能因为浏览器不兼容'
        })
    }
}


Vue.prototype.$util = util

//关闭生产模式下的提示
Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
