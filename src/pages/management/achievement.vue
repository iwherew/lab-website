<template>
  <div class="container">
    <el-form :inline="true" :model="searchForm" style="text-align:right">
      <el-form-item prop="search">
        <el-input
          v-model="searchForm.name"
          placeholder="请输入信息标题"
        ></el-input>
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
      <el-form-item>
        <el-button
          type="success"
          icon="search"
          @click="showDialog(true)"
        >
          添加
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      style="width: 100%"
      :row-style="{ height: '30px', color: '#666' }"
      :header-row-style="{
          height: '60px',
          fontSize: '14px',
          color: '#222222'
        }"
    >
      <el-table-column
        prop="id"
        label="id"
        min-width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        min-width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="upNickname"
        label="上传者"
        min-width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="upDate"
        label="时间"
        min-width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="visitCount"
        label="阅读人数"
        min-width="100"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button type="warning" @click="showDialog(false, scope.row)">修改</el-button>
          <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        layout="prev, pager, next, total, jumper"
        :total="totalNum"
        :current-page="pageNum"
        :page-size="pageSize"
        :page-sizes="[10, 20, 30, 100]"
      >
      </el-pagination>
    </div>
    <el-dialog
      :title=this.dialogTitle
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form ref="form" :model="dialogDetail" label-width="80px">
        <el-form-item label="文章标题">
          <el-input v-model="dialogDetail.title" placeholder="请输入文章标题"></el-input>
        </el-form-item>
        <el-form-item label="文章内容">
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入文章内容"
            v-model="dialogDetail.content">
          </el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 认</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="删除操作"
      :visible.sync="deleteDialogVisible"
      width="30%"
    >
      <span>确认删除吗？删除后无法恢复</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="confirmDelete()">删 除</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        totalNum: 0,
        pageNum: 1,
        pageSize: 10,
        searchForm:{},
        list:[],
        dialogVisible: false,
        deleteDialogVisible: false,
        deleteRow: null,
        dialogDetail:{
          title: null,
          content: null,
        },
        dialogTitle: null,
      }
    },
    mounted() {
      this.getData()
    },
    methods:{
      getData(refresh){
        if(refresh){
          this.pageNum = 1
        }
        if(this.searchForm.name){
          this.$api.get('/api/searchAchievement',
            {
              'page': this.pageNum,
              'search': this.searchForm.name,
            },
            res => {
              if (res.status >= 200) {
                this.list = res.data.data
                this.pageNum = res.data.pageNum,
                  this.pageSize = res.data.pageSize,
                  this.totalNum = res.data.totalNum
              } else {
                console.log(res.message);
              }
            }
          )
        }else{
          this.$api.get('/api/achievementPage',
            { 'page': this.pageNum},
            res => {
              if (res.status >= 200) {
                this.list = res.data.data
                this.pageNum = res.data.pageNum,
                  this.pageSize = res.data.pageSize,
                  this.totalNum = res.data.totalNum
              } else {
                console.log(res.message);
              }
            }
          )
        }

      },
      // 分页导航
      handleCurrentChange(val) {
        this.pageNum = val;
        this.getData();
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getData();
      },
      handleDelete(row) {
        this.deleteRow = row
        this.deleteDialogVisible = true
      },
      confirmDelete(){
        this.$api.delete( '/api/deleteAchievement',
          {
            "achievementId": this.deleteRow.id,
            "upUserId": this.$store.state.user.userId
          },
          res => {
            if (res.status >= 200) {
              this.getData(true)
              this.deleteDialogVisible = false
              this.$message.success('删除成功');
            } else {
              console.log(res.message);
            }
          }
        )
      },
      showDialog(isAdd,row){
        if(isAdd){
          this.dialogTitle = '添加'
          this.dialogDetail = {
            title: null,
            content: null,
          }
        }else{
          this.dialogTitle = '修改'
          this.dialogDetail = {
            id: row.id,
            title: row.title,
            content: row.content,
          }
        }
        this.dialogVisible = true
      },
      confirm(){
        if(this.dialogTitle == '添加'){
          this.$api.post('/api/insertAchievement',
            { "title": this.dialogDetail.title,
              "content": this.dialogDetail.content},
            res => {
              if (res.status >= 200) {
                this.getData(true)
                this.dialogVisible = false
                this.$message.success('创建成功');
              } else {
                console.log(res.message);
              }
            }
          )
        }else{
          this.$api.put('/api/updateAchievement',
            {
              "content": this.dialogDetail.content,
              "achievementId": this.dialogDetail.id,
              "title":  this.dialogDetail.title,
              "upUserId": this.$store.state.user.userId
            },
            res => {
              if (res.status >= 200) {
                this.getData(true)
                this.dialogVisible = false
                this.$message.success('修改成功');
              } else {
                console.log(res.message);
              }
            }
          )
        }

      },
    }
  }
</script>
<style scoped lang="less">
</style>
