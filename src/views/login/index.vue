<template>
<div class="container">
    <el-card class="my-card">
        <img src="../../assets/images/logo_index.png" alt="">
    </el-card>
</div>
</template>

<script>

import '@/style/index.less'

export default {

}
</script>

// scoped作用域，作用范围，，style仅仅只在当前组件下有用

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
