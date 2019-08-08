// 定义router文件，导出给main。js使用
import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login'
import Home from '@/views/home'
import welcome from '@/views/welcome/welcome.vue'
import NotFound from '@/views/404/404.vue'
import store from '../store'
// import axios from '@/axios'
import Article from '@/views/article'
import Image from '@/components/imag/image.vue'
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
        {
          path: '/', name: 'welcome', component: welcome
        },
        {
          path: '/article', name: 'article', component: Article
        },
        {
          path: '/image', name: 'image', component: Image
        }
      ]
    },
    {
      // 处理404
      path: '*', name: '404', component: NotFound
    }
  ]
})
//   前置导航守卫
router.beforeEach((to, from, next) => {
  // 判断是否登录
  // 如果你不是去登录，且没有做登录，，你应该跳转去登录
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  //  next放行
  next()
})

export default router
