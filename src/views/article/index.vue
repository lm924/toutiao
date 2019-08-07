<template>
    <div class="container">
       <el-card>
           <div slot="header">
               <my-bread>内容管理</my-bread>
        </div>
         <!-- //size说明在form参考文档 -->
        <el-form label-width="80px" size="mini">
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
            <el-select clearable v-model="reqParams.channel_id" placeholder="请选择">
                <el-option
                  v-for="item in channelOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="日期:">
            <el-date-picker
            value-format="yyyy-MM-dd"
            @change="changeDate"
              v-model="dateArr"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <el-form-item >
                <el-button type="primary" @click="search()">筛选</el-button>
            </el-form-item>
        </el-form-item>
    </el-form>
       </el-card>
       <el-card>
           <div slot="header">
               根据筛选条件查询到,{{total}}条数据
           </div>

<!-- 表格组件 -->
    <el-table :data="articles">
        <el-table-column label="封面" >
           <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" fit="cover" style="width:120px;height:80px">
              <div slot="error">
                <img src="../../assets/images/error.gif" style="width:120px;height:80px" alt="">
              </div>
            </el-image>
          </template>
        </el-table-column>

        <el-table-column label="标题"></el-table-column>

        <el-table-column label="状态">
            <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">删除</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="发布时间"></el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button plain type="primary" @click="edit(scope.row.id)" icon="el-icon-edit" circle></el-button>
            <el-button plain type="danger" @click="del(scope.row.id)" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>

    </el-table>

    <!-- 分页组件 -->
    <div style="text-align:center">
      <!-- prev上一按钮，，页码按钮，下一按钮 -->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="changePager"
        ></el-pagination>
    </div>
       </el-card>
    </div>

</template>

<script>

import MyBread from '@/components/my-bread.vue'

export default {
  components: { MyBread },
  data () {
    return {

      // 筛选项表单，，提交给后台的参数
      reqParams: {
        //   参数名，，参考文档，api规定文档接口文档
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      //   value,label是和上面一样的额意思，，
      channelOptions: [],
      //   日期数据
      dateArr: [],
      // 文章列表
      articles: [],
      // 总条数
      total: 0

    }
  },
  created () {
    // 获取下拉信息
    this.getchannelOptions()
    // 获取文章列表
    this.getArticles()
  },
  watch: {
    'reqParams.channel_id': function (newVal, oldVal) {
      if (newVal === '') {
        this.reqParams.channel_id = null
      }
    }
  },
  methods: {
    // 编辑函数
    edit (id) {
      this.$router.push('/publish?id=' + id)
    },
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确认
        await this.$http.delete(`article/${id}`)
        this.$message.success('文章删除成功')
        // 更新列表
        this.getArticles()
      }).catch(() => {
        // 点击取消

      })
    },
    search () {
      // 筛选项双向绑定，拿着对应的数据发送请求即可，重新筛选后页码显示第一页
      this.reqParams.page = 1
      this.getArticles()
    },
    async getchannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      // console.log(data)
      this.channelOptions = data.channels
    },
    async getArticles () {
      // sxios  get  传参第二传参是对象{params：指定传参对象}  发请求时自动拼接在地址后
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      // 列表数据
      this.articles = data.results
      // 总条数
      this.total = data.total_count
    },
    // 改变分页对应函数
    changePager (newPage) {
      // 修改 获取数据的页码
      // this.reqParams.page = newPage
      this.reqParams.page = newPage
      this.getArticles()
    },
    // 日期选择后的事件
    changeDate (dateArr) {
      // 严谨一些，清空数据考虑在内
      if (dateArr) {
        this.reqParams.begin_pubdate = dateArr[0]
        this.reqParams.end_pubdate = dateArr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    }

  }
}
</script>

<style scoped lang="less">
.el-card{
    margin-bottom: 20px;
}
.container{
  text-align: left;
}
</style>
