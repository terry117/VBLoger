import axios from 'axios'
import Vue from 'vue'
import store from '../store/index'

const service = axios.create({
    baseURL: "https://api.github.com",
    timeout: 10000
})

service.interceptors.request.use(
    config => {
        let token = store.state.token.token
        if (token) {
            //access_token 作为查询参数附加到URL,已被 GitHub API 弃用
            // let sp = "?"
            // if (config.url.indexOf("?") >= 0) {
            //     sp = "&"
            // }
            // config.url = config.url + sp + "access_token=" + token
            // 设置 Authorization 头
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config
    },
    error => {
        console.error(error)
        return Promise.reject(error);
    }
)


service.interceptors.response.use(
    response => {
        let responseJson = response.data
        return response
    },
    error => {
        let message
        switch (error.response.status) {
            case 401:
                message = "Token错误"
                break
            default:
                message = error.response.data.message
                break
        }
        Vue.prototype.$message({
            message: message,
            type: 'error'
        })
        return Promise.reject('error')
    }
)

export default service
