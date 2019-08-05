// 获取用户   设置用户
const key = 'hm-toutiao-user'
// 约定信息的key
// 存储信息的值是  用户信息对象  字符串格式json
export default {
  setUser (user) {
    //   储存信息到sessionStorage中
    window.sessionStorage.setItem(key, JSON.stringify(user))
  },
  getUser () {
    // 获取用户信息从sessionStorage
    return JSON.parse(window.sessionStorage.getItem(key) || '{}')
  }
}
