// 定义router文件，导出给main。js使用
import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [

    // 路由规则配置
    // name的作用给当前路由规则取名  $router.push('/login')  或者 $router.push({name:'login'})
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})

export default router
