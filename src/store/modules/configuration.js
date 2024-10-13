
const configuration = {
    state: {
        githubUsername: "",
        blogTitle: "",
        blogDescribe: "",
        htmlTitle: "",
        fontColor: "",
        useBackgroundImage: false,
        backgroundColorLeft: "",
        backgroundColorRight: "",
        audioUrl: "",
        mini: false,
        audioAutoPlay:false,
        webSites:[]
    },

    mutations: {
        SET_CONFIGURATION: (state, configuration) => {
            state.githubUsername = configuration["githubUsername"] || "Terry"

            state.blogTitle = configuration["blogTitle"] || state.githubUsername

            state.blogDescribe = configuration["blogDescribe"] || `欢迎来到与${state.githubUsername}共同成长。`

            state.htmlTitle = configuration["htmlTitle"] || `${state.githubUsername}的博客`

            state.fontColor = configuration["fontColor"] || "#ffffff"
  
            state.useBackgroundImage = configuration["useBackgroundImage"] || false
 
            state.backgroundColorLeft = configuration["backgroundColorLeft"] || "#155799"
    
            state.backgroundColorRight = configuration["backgroundColorRight"] || "#159957"

            state.audioUrl = configuration["audioUrl"] || "https://terry117.github.io/PersonalBlog/music/loveyou.mp3"

            state.mini = configuration["mini"] || false

            state.audioAutoPlay = configuration["audioAutoPlay"] || false

            state.webSites = configuration["webSites"] || []
        }
    },

    //actions方法实际调用的是vuex中的Mutation来改变State域中的值
    actions: {
        LocalReload({ commit }, configuration) {
            //commit 是一个方法，用于触发 mutation 从而更新状态（state）
            commit('SET_CONFIGURATION', configuration)
        },
        Init({ commit }) {
            // let 块级作用域
            let xmlhttp
            if (window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest()
            } else {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
            }
            xmlhttp.open("GET", "../../../static/configuration.json", false)
            xmlhttp.send()
            let configuration = JSON.parse(xmlhttp.responseText)
            commit('SET_CONFIGURATION', configuration)
        }
    }
}

export default configuration