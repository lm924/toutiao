// 定义router文件，导出给main。js使用
import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import Home from '@/views/home'

import welcome from '@/views/welcome/welcome.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [

    // 路由规则配置
    // name的作用给当前路由规则取名  $router.push('/login')  或者 $router.push({name:'login'})
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      // name: 'home',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: welcome }
      ]
    }
  ]
})

export default router
