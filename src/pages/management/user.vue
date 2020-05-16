<template>
  <div class="container">
    <el-form :inline="true" :model="searchForm" style="text-align:right">
      <el-form-item prop="startTime">
        <el-date-picker
          style="width:100%"
          v-model="searchForm.startTime"
          type="datetime"
          placeholder="选择开始时间"
          value-format="timestamp"
          @change="getData"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="endTime">
        <el-date-picker
          style="width:100%"
          v-model="searchForm.endTime"
          type="datetime"
          placeholder="选择结束时间"
          value-format="timestamp"
          @change="getData"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="search"
          @click="getData(true)"
          style="marginLeft:20px"
        >
          搜索
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      style="width: 100%"
      :row-style="{ height: '60px', color: '#666' }"
      :header-row-style="{
          height: '60px',
          fontSize: '14px',
          color: '#222222'
        }"
    >
      <el-table-column
        prop="estate.companyName"
        label="物业公司"
        min-width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="estate.estateName"
        label="园区"
        min-width="100"
        align="center"
      ></el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="prev, pager, next, total, jumper"
        :total="totalCount"
        :current-page="curPage"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 100]"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        totalCount: 0,
        curPage: 1,
        pageSize: 10,
        searchForm:{},
        list:[],
      }
    },
    mounted() {
      this.getData()
    },
    methods:{
      getData(){
        this.$api.get('/api/userOrigin',
          { 'page': 1}
        ).then(
          res => {
            console.log(res)
          }
        ).catch(err => {console.log(err)})
      },
      // 分页导航
      handleCurrentChange(val) {
        this.curPage = val;
        this.getData();
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getData();
      },
    }
  }
</script>
<style scoped lang="less">
</style>
