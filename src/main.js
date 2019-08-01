import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// @ 是某一个路径别名  src路径别名  在vue-cli创建的项目下才可是呀
// 目录下是有默认索引文件 index.js 就是索引文件  .js .vue .json
import router from '@/routers'

// 控制台提示信息 开发环境来提示  详细一些
Vue.config.productionTip = false
Vue.use(ElementUI)

// g根实例
new Vue({
  router,
  // render是渲染 h是传参渲染函数，
  render: h => h(App)
  // 挂载到App这个容器下public下index。HTML文件下的id是App的div
  // mount方法直接挂在到App，，不用el
}).$mount('#app')
// main.js 的职责
// 1. 职责：导入项目需要依赖的资源（js包 css文件 其他资源）
// 2. 职责：创建一个根实例
