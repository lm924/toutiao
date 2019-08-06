<template>
<div class="container">
    <el-card class="my-card">
        <img src="../../assets/images/logo_index.png" alt="">
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
        <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
            <el-input v-model="loginForm.code" placeholder="请输入验证码"  style="width:236px;margin-right:10px"></el-input>
              <el-button >发送验证码</el-button>
        </el-form-item>

        <el-form-item>
            <el-checkbox :value="true">我已阅读并同意用户条款</el-checkbox>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" style="width:100%"  @click="submit()">登录</el-button>
        </el-form-item>
    </el-form>
    </el-card>

</div>
</template>

<script>

import '@/style/index.less'
import store from '@/store'
export default {

  data () {
    var validateMobile = (rule, value, callback) => {
      let reg = /^1[3-9]\d{9}$/g
      if (!reg.test(value)) {
        return callback(new Error('您输入的手机号格式不正确'))
      }
      callback()
    }

    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      loginRules: {
        mobile: [
          {
            required: true, message: '请输入手机号', trigger: 'blur'
          },
          { validator: validateMobile, trigger: 'blur' }
        ],
        code: [
          {
            required: true, message: '请输入验证码', trigger: 'blur'
          },
          {
            len: 6, message: '长度是6位', trigger: blur
          }
        ]
      }
    }
  },
  methods: {
    submit () {
      this.$refs.loginForm.validate(async valid => {
        // promise写法，.then，.catch标志

        if (valid) {
        //   this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations'
        //     , this.loginForm
        //   ).then(res => {
        //     //   res响应对象  包含响应主体
        //     // console.log(res.data)
        //     // 储存用户信息
        //     store.setUser(res.data.data)
        //     // 跳转去首页
        //     console.log('add')

          //     this.$router.push('/')
          //   })
          //     .catch(() => {
          //       this.message.error('手机号或验证码错误')
          //     })
          // } else {
          //   console.log('error submit!!')
          //   return false

          try {
          // 结构赋值，是上面的res.data。data
            const { data: { data } } = await this.$http.post('authorizations', this.loginForm)
            store.setUser(data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或是验证码错误')
          }
        }
      })
    }
  }

}
</script>

<style scoped lang="less">
    .container{
        position: absolute;
        width: 100%;
        height: 100%;
        background: url(../../assets/images/login_bg.jpg) no-repeat center/cover;
    }
    .my-card{
        width: 400px;
        height: 350px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        img{
            display: block;
            width: 200px;
            margin: 0 auto;
        }

    }
</style>
