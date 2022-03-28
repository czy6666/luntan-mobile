/**
 * 初始化dayjs
 */
import Vue from 'vue'
import dayjs from 'dayjs'

//配置使用中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

dayjs.locale('zh-cn')

//全局过滤器(模板中可以调用的函数)
Vue.filter('relativeTime', value => {

    return dayjs(value).from(dayjs())
})