<template>
  <div>
    <el-button type="primary" icon='el-icon-plus'>添加</el-button>
    <!-- 
      table写法:
      先写eltable回车
      有几列就复制几个列
      先把动态数据属性data干掉
      有边框的话加border属性
      每个列的width控制列的宽度
      每个列的label控制这个列的名称
      想让哪个列居中 那么哪个列就需要添加align='center'
      需要序号的话,添加type='index'
     -->

     <el-table
     :data="trademarkList"
    border
    style="width: 100%;margin:20px 0">
    <el-table-column
      type="index"
      label="序号"
      width="80"
      align="center">
    </el-table-column>
    <el-table-column
      prop="tmName"
      label="品牌名称"
      width="width">
    </el-table-column>
    <el-table-column
      prop="logoUrl"
      label="品牌logo"
      width="width">
      <template slot-scope="{row,$index}">
          <!-- row,$index对应的就是当前遍历的某个品牌对象 及这个品牌对象在数组当中的下标 -->
          <img :src="row.logoUrl" alt="" style="width:80px;height:60px">
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="width">
      <template slot-scope="{row,$index}">
          <el-button type="warning" icon="el-icon-edit" size="mini">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    
    <el-pagination
      style="text-align:center"
      @size-change="handleSizeChange"
      @current-change="getTrademarkList"
      :current-page="page"
      :page-sizes="[3,5,7]"
      :page-size="limit"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total">
    </el-pagination>

  </div>
</template>

<script>
export default {
  name: '',
  data(){
    return{
      page:1,
      limit:3,
      trademarkList:[],
      total:0
    }
  },
  mounted(){
    this.getTrademarkList()
  },
  methods:{
    //发请求获取品牌列表及分页器翻页的回调
    async getTrademarkList(page = 1){
      this.page = page
      const result = await this.$API.trademark.getPageList(this.page,this.limit)
      if(result.code === 200){
        this.trademarkList = result.data.records
        this.total = result.data.total
      }
    },
    handleSizeChange(size){
      this.limit = size
      this.getTrademarkList()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
