<template>
  <el-container class="wrapper">
    <el-aside :width="isCollapse? '64px':'200px'">
      <div class="logo" :class="{miniLogo:isCollapse}"></div>
<el-menu
      :default-active="$router.path"
      :collapse="isCollapse"
      :collapse-transition="false"
      router
      background-color="#002033"
      text-color="#fff"
      active-text-color="#ffd04b">

       <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>

    </el-aside>

    <el-container>
      <el-header>
        <span class="el-icon-s-fold" @click="toggleMenu()"></span>
        <span class="text">江苏传智播客教育集团</span>

        <el-dropdown>
          <span class="el-dropdown-link">
            <img src="../../assets/images/avatar.jpg" alt="">
            用户名称
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>

          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main>
        <div class="container" style="text-align:center">
          <router-view></router-view>
        </div>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    toggleMenu () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style  scoped lang="less">
.wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background-color: #002033;
  }
}
.el-header {
  width: 100%;
  height: 64px;
  border-bottom: 1px solid #ddd;
  line-height: 64px;
  .el-icon-s-fold {
    font-size: 25px;
    vertical-align: middle;
  }
  .text {
    margin-left: 10px;
    font-weight: 700;
  }
}
.el-dropdown{
  float:right;
  img{
    width: 30px;
    height: 26px;
    vertical-align:middle;
  }
  .el-dropdown-link{
    font-weight: 700;
  }
}
.logo{
  width: 100%;
  height: 64px;
  background: #024 url(../../assets/images/logo_admin.png) no-repeat center / 140px auto ;
.el-menu{
  border-right:none;
}
}
.miniLogo{
  background-image: url(../../assets/images/logo_admin_01.png);
  background-size: 36px auto;
}
</style>
