import Vue from 'vue'
import Vuex from 'vuex'
import token from './modules/token'
import user from './modules/user'
import configuration from './modules/configuration'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        token,
        user,
        configuration
    },
    getters
})

//export default 用于导出文件中的主要内容，使其在被其他文件导入时不需要使用大括号
export default store
