<template>
    <div class="container">
       <el-card>
           <div slot="header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>内容管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
         <!-- //size说明在form参考文档 -->
        <el-form label-width="80px" size="small">
        <el-form-item label="状态:">
                <el-radio-group v-model="reqParams.status">
                 <el-radio :label="null">全部</el-radio>
                 <el-radio :label="0">草稿</el-radio>
                 <el-radio :label="1">待审核</el-radio>
                 <el-radio :label="2">审核通过</el-radio>
                 <el-radio :label="3">审核失败</el-radio>
                </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:">
            <el-select v-model="reqParams.channel_id" placeholder="请选择">
                <el-option
                  v-for="item in channerOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="日期:">
            <el-date-picker
              v-model="dateArr"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <el-form-item >
                <el-button type="primary">筛选</el-button>
            </el-form-item>
        </el-form-item>
    </el-form>
       </el-card>
    </div>

</template>

<script>
export default {
  data () {
    return {
      // 筛选项表单，，提交给后台的参数
      reqParams: {
        //   参数名，，参考文档，api规定文档接口文档
        status: null,
        channel_id: null
      },
      //   value,label是和上面一样的额意思，，
      channerOptions: [{ value: 1, label: 'js' }],
      //   日期数据
      dateArr: []
    }
  }
}
</script>

<style>

</style>
