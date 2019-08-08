<template>
<div class="container">
    <el-card>
        <div slot="header">
            <my-bread>素材管理</my-bread>
        </div>
        <div class="btn_box">
            <el-radio-group v-model="reqParams.collect" size="small" @change="changeCollect">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
            <el-button type="success" size="small" style="float:right">添加素材</el-button>
        </div>
        <div class="img_list">
            <div class="img_item" v-for="item in 10" :key="item.id" >
                <img :src="item.url" alt="">
                <div class="foot" v-show="!reqParams.collect">
                    <span class="el-icon-star-off" :class="{selected:item.is_collected}"></span>
                    <span class="el-icon-delete "></span>
                </div>
            </div>
        </div>
         <!-- prev上一按钮，，页码按钮，下一按钮 -->
        <el-pagination
        v-if="total>reqParams.per_page"
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="reqParams.per_page"
          :current-page="reqParams.page"
          @current-change="changePager"
        ></el-pagination>
    </el-card>
     <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
         <span>上传组件</span>
         <span slot="footer" class="dialog-footer">
           <el-button @click="dialogVisible = false">取 消</el-button>
         </span>
     </el-dialog>
     <el-button type="success" size="small" @click="openDialog()"></el-button>
<!-- 上传页面 -->
<el-upload
     class="avatar-uploader"
     action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
     :show-file-list="false"
     :on-success="handleSuccess"
     :headers="uploadHeaders"
      name="image">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
</div>

</template>

<script>
export default {

  data () {
    return {
      // 提交参数,,提交给后台的参数
      reqParams: {
        //   默认全部
        collect: false,
        page: 1,
        per_page: 10

      },
      //   图片列表数据
      images: [],
      //   控制对话框显示隐藏
      dialogVisible: false,
      //   总条数
      total: 0
    }
  },
  methods: {
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.result
      this.total = data.total
    },
    changeCollect () {
      this.reqParams.page = 1
      this.getImages()
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 打开对话框
    openDialog () {
      this.dialogVisible = true
    }
  },
  created () {
    // 获取素材列表
    this.getImages()
  }
}
</script>

<style scope lang="less">
.container{
    text-align: left;
}
.img_item{
    display: inline-block;
        width: 160px;
        height: 160px;
        margin: 5px 20px;
        border: 1px dashed #ddd;
        position: relative;
    img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .foot{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 30px;
        line-height: 30px;
        background: rgba(0,0,0,0.5);
        color: #ccc;
        span{
            margin: 0  20px;
            &.selected{
            color: red;
            }
        }
    }
}

</style>
