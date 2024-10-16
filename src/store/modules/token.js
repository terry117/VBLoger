import UserApi from '@/api/user'
import Cookie from '@/utils/cookie'
import CryptoJS from 'crypto-js'
import Vue from 'vue'
import store from '../index'

const ENCRYPTION_KEY = "terry117"
// 加密函数
function encryptToken(token) {
    return CryptoJS.AES.encrypt(token, ENCRYPTION_KEY).toString();
}


// 解密函数
function decryptToken(encryptedToken) {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8)
}

function test(key)
{
    let encryptResult =  encryptToken(key)
    console.log('encrypt: ' + encryptResult)
    let decryptResult = decryptToken(encryptResult)
    console.log('decrypt: ' + decryptResult)
}

const TOKEN_KEY = "TOKEN_KEY"
const token = {
    state: {        
        token: Cookie.getAttribute(TOKEN_KEY) || decryptToken('U2FsdGVkX1+9yt0eiDbTFnJHA/3HPGylocxaW350XpfzdiavvbecvuwgTQVJv8HSOqwOpFzs7POJpZPo9RC1Yw==' )
    },

    mutations: {
        SET_TOKEN: (state, value) => {
            state.token = value
            Cookie.setAttribute(TOKEN_KEY, value, 30)
        },
        REMOVE_TOKEN: (state) => {
            state.token = null
            Cookie.remove(TOKEN_KEY)
        }
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
                console.error('验证Token异常：'+error)
            })
        },
        Cancellation({ commit }) {
            commit('REMOVE_TOKEN')
            Vue.prototype.$message({
                message: 'Token取消绑定',
                type: 'info'
            })
        },
    }
}

export default token