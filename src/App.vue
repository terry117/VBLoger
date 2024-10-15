<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
   import { mapGetters } from 'vuex';
    export default {
        name: 'App',
        computed: {
            //mapGetters() 是 Vuex 提供的一个辅助函数，用于将 Vuex 中的 getter 映射为组件的计算属性
            //... 是 JavaScript 的扩展运算符，用于在对象中展开元素
            ...mapGetters([
                'githubUsername',
                'htmlTitle'
            ])
        },
        created() {
            debugger;
            this.$store.dispatch("Init")
            this.$store.dispatch("GetInfo")
            this.$setTitle(this.$route.meta.title)
            let windowSize = this.$util.getWindowSize()    
            console.log(`当前全路径： ${window.location.href}`);
            console.log(`当前子路径： ${this.$route.path}`);
            let pathArr = this.$route.path.split("/")
            console.log(`屏幕长： ${windowSize.height} ； 屏幕宽： ${windowSize.width} `);
            if (pathArr[1] == "user" && windowSize.height > windowSize.width * 1.2) {
                this.$router.push("/mobile/user/blog")
            }
            if (pathArr[1] == "mobile" && windowSize.height <= windowSize.width * 1.2) {
                this.$router.push("/")
            }
        }
    }
</script>