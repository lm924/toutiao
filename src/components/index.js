// 封装一个插件
// 注册所有components下的组件为全局组件
import MyBread from '@/components/my-bread.vue'

import MyChannel from '@/components/my-channel.vue'

// vue插件  暴露一个对象 对象中有一个选项  install安装意思
export default {
  // vue是全局的vue对象
  install (Vue) {
    // 后面的mybread是组件对象
    // 安装函数   当vue。use（使用插件） install会被调用
    // 通过当前的vue对象注册vue组件
  // name是以后注册组件时，可以当做组件名字，，，是my-bread里面的name
    Vue.component('MyBread.name', MyBread)
    Vue.component('MyChannel.name', MyChannel)
  }
}
