import UserApi from '@/api/user'
import Ase from '@/utils/ase'
import Cookie from '@/utils/cookie'
import Vue from 'vue'
import store from '../index'

const TOKEN_KEY = "TOKEN_KEY"
const BlogTOKEN_KEY = "BlogTOKEN_KEY"
const token = {
    state: {
        token: Cookie.getAttribute(TOKEN_KEY) || Ase.decryptToken('U2FsdGVkX1+9yt0eiDbTFnJHA/3HPGylocxaW350XpfzdiavvbecvuwgTQVJv8HSOqwOpFzs7POJpZPo9RC1Yw=='),
        blogToken: Cookie.getAttribute(BlogTOKEN_KEY)
    },

    mutations: {
        SET_TOKEN: (state, value) => {
            state.token = value
            Cookie.setAttribute(TOKEN_KEY, value, 30)
        },
        REMOVE_TOKEN: (state) => {
            state.token = null
            Cookie.remove(TOKEN_KEY)
        },

        SET_Bolg_TOKEN: (state, value) => {
            state.blogToken = value
            Cookie.setAttribute(BlogTOKEN_KEY, value, 30)
        },
    },

    actions: {
        Authentication({ commit }, accessToken) {
            UserApi.verifyToken(accessToken).then((response) => {
                let result = response.data
                let githubUsername = store.state.configuration.githubUsername
                console.log('当前配置的gtihub用户名:' + githubUsername)
                console.log('请求验证gtihub登录用户名:' + result['login'])
                if (githubUsername == result['login']) {
                    commit('SET_TOKEN', accessToken)
                    Vue.prototype.$notify({
                        title: '成功',
                        message: 'Token绑定成功',
                        type: 'success'
                    })
                    // Vue.prototype.$message({
                    //     message: 'Token绑定成功',
                    //     type: 'success'
                    // })
                } else {
                    Vue.prototype.$message({
                        message: 'Token用户不一致',
                        type: 'error'
                    })
                }
            }).catch((error) => {
                console.error('验证Token异常：' + error)
            })
        },
        Cancellation({ commit }) {
            commit('REMOVE_TOKEN')
            Vue.prototype.$message({
                message: 'Token取消绑定',
                type: 'info'
            })
        },

        //申请博客编写权限
        ApplyBolgAuthentication({ commit }, bolgToken) {
            if (blogToken == '2FsdGVkX1/B38gVbzqW2tbUC34To/o2DXbL5KrpuTQ=') {
                commit('SET_Bolg_TOKEN', bolgToken)
                Vue.prototype.$notify({
                    title: '成功',
                    message: '申请博文权限成功',
                    type: 'success'
                })
            }else {
                Vue.prototype.$message({
                    message: '密码错误',
                    type: 'error'
                })}
        },
    }
}

export default token