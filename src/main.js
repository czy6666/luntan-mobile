import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入video.js
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import 'videojs-flash'

//引入相对时间方法
import '@/utils/dayjs'

//引入Vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'
import '@/style/icon.css'
import '@/style/index.css'
Vue.use(Vant)
import { Lazyload } from 'vant'

Vue.use(Lazyload)
    //注册懒加载
Vue.use(Lazyload, {
    lazyComponent: true
})

//自动设置REM基准值（字体大小）
import 'amfe-flexible'

Vue.config.productionTip = false

//在原型上注册video.js
Vue.prototype.$video = Video

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')