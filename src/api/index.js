// 配置一个axios  导出
import store from '@/store'
import axios from 'axios'
// 全局挂载的router
import router from '@/routers'

// 进行配置，，，配置请求头
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
// 这是只能检验一次，有问题
// axios.defaults.headers = {
//   Authorization: `Bear ${store.getUser().token}`
// }

// 在每次请求之前，获取token信息，追加在headers中
// 请求拦截器，在每次请求前，做某些事，  发送请求签，，，路由跳转
// config请求配置
// axios.interceptors.request.use(function (config) {
// 在发送请求之前做些什么
// 要做的就是修改config，，追加headers
// return config
// }, function (error) {
// 对请求错误做些什么
// 认为返回错误的promise对象
// return Promise.reject(error)
// })

axios.interceptors.request.use((config) => {
  // 这样是动态拿，，上面是写死的，，登录后不需要刷新就能实时拿到
  config.headers = {
    Authorization: `Bear ${store.getUser().token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (err) {
  // 对响应错误做点什么
  // 获取响应状态码，err对象包含响应对象，err。response
  // err.response.status
  if (err.response.status === 401) {
    // 跳转到登录页
    // 方式1：localhost。hash = ‘#/login’
    // 方式2，此时没有vue实例，4router对象获取不到，通过route实例直接使用
    router.push('/login')
  }
  return Promise.reject(err)
})

// 导出
export default axios
