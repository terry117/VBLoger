import Cookies from 'js-cookie'

export default {
    setAttribute(key, value, time) {
        if (time) {
            //持久Cookies
            return Cookies.set(key, value, { expires: time })
        }
        //会话Cookies
        return Cookies.set(key, value)
    },
    getAttribute(key) {
        return Cookies.get(key)
    },
    remove(key) {
        return Cookies.remove(key)
    }
}