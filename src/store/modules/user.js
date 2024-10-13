import UserApi from '@/api/user'

const user = {
    state: {
        avatarUrl: null,
        name: null,
        location: null,
        blog: null,
        followers: 0,
        following: 0
    },

    mutations: {
        SET_AVATAR_URL: (state, value) => {
            state.avatarUrl = value
        },
        SET_NAME: (state, value) => {
            state.name = value
        },
        SET_LOCATION: (state, value) => {
            state.location = value
        },
        SET_BLOG: (state, value) => {
            //如果 value 为 null、undefined、空字符串或者其他 falsy 值，会使用 'https://www.cnblogs.com/terryK/' 作为默认值
            state.blog = value || 'https://www.cnblogs.com/terryK/'
        },
        SET_FOLLOWERS: (state, value) => {
            state.followers = value
        },
        SET_FOLLOWING: (state, value) => {
            state.following = value
        }
    },

    actions: {
        GetInfo({ commit }) {
            //https://api.github.com/users/{username} 要获取 GitHub 用户信息
            UserApi.getInfo()
            .then(response => {
                let result = response.data
                console.table('请求数据：' + JSON.stringify(result, null, 2))
                commit('SET_AVATAR_URL', result['avatar_url'])
                commit('SET_NAME', result['name'])
                commit('SET_LOCATION', result['location'])
                commit('SET_BLOG', result['blog'])
                commit('SET_FOLLOWERS', result['followers'])
                commit('SET_FOLLOWING', result['following'])
            })
            .catch(error=>{
                console.error('请求失败：', error);
            })
        }
    }
}

export default user