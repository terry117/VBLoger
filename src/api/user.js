import request from '@/utils/request';
import store from '../store/index';

function logAndRequest(config) {
    console.log('请求的URL：', config.url);
    return request(config);
}

export default {
    verifyToken: function (token) {
        //过时
        // return request({
        //     url: '/user?access_token=' + token
        // })
        return logAndRequest({
            url: '/user',
            headers: {
                'Authorization': `token ${token}`
            }
        });
    },
    getInfo: function () {
        let githubUsername = store.state.configuration.githubUsername
        return logAndRequest({
            url: '/users/' + githubUsername
        })
    },
    followers: function (query) {
        let githubUsername = store.state.configuration.githubUsername
        return logAndRequest({
            url: `/users/${githubUsername}/followers?page=${query.page}&per_page=${query.pageSize}`
        })
    },
    following: function (query) {
        let githubUsername = store.state.configuration.githubUsername
        return logAndRequest({
            url: `/users/${githubUsername}/following?page=${query.page}&per_page=${query.pageSize}`
        })
    },
    info:function (githubUsername) {
        return logAndRequest({
            url: `/users/${githubUsername}`
        })
    },
}