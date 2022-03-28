import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

//存储在本地的key
const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
    state: {
        //当前登录用户登录状态
        user: getItem(USER_KEY),

        //缓存页面
        cachePages: ['Layout']
    },
    mutations: {
        setUser(state, data) {
            state.user = data

            //本地存储token
            setItem(USER_KEY, state.user)

            // localStorage.setItem('user', JSON.stringify(state.user))
        },
        addCachePage(state, pageName) {
            if (!state.cachePages.includes(pageName)) {
                state.cachePages.push(pageName)
            }
        },
        removeCachePage(state, pageName) {
            const index = state.cachePages.indexOf(pageName)
            if (index !== -1) {
                state.cachePages.splice(index, 1)
            }
        }
    },
    actions: {},
    modules: {}
})