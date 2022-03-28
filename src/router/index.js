import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/views/Login')
    },
    //渲染根组件的router-view
    {
        path: '/',
        component: () =>
            import ('@/views/Layout'),
        children: [{
            path: '', //默认子路由
            name: 'home',
            component: () =>
                import ('@/views/Home')
        }, {
            path: 'video', //子路由
            name: 'video',
            component: () =>
                import ('@/views/Video')
        }, {
            path: 'interlocution', //子路由
            name: 'interlocution',
            component: () =>
                import ('@/views/Interlocution')
        }, {
            path: 'my', //子路由
            name: 'my',
            component: () =>
                import ('@/views/My')
        }]
    },
    {
        path: '/search',
        name: 'search',
        component: () =>
            import ('@/views/Search')
    },
    {
        path: '/article/:articleId',
        name: 'article',
        component: () =>
            import ('@/views/Article'),
        //将动态路由参数映射到组件的props
        props: true
    },
    {
        path: '/user/profile',
        name: 'UserFile',
        component: () =>
            import ('@/views/UserFile')
    }
]

// 解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;

// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject)
        return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch(err => err);
};

//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
    if (onResolve || onReject)
        return originalReplace.call(this, location, onResolve, onReject);
    return originalReplace.call(this, location).catch(err => err);
};

const router = new VueRouter({
    routes
})

export default router