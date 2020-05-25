<template>
  <div class="container">
    <el-form :inline="true" style="text-align:right">
      <el-form-item>
        <el-button
          type="success"
          icon="search"
          @click="showDialog()"
        >
          添加账号
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
        prop="account"
        label="账户"
        min-width="100"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
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
      title="添加原始账号"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form ref="form" label-width="80px">
        <el-form-item label="账号名称">
          <el-input v-model="newAccountName" placeholder="请输入账号名称"></el-input>
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
        list:[],
        dialogVisible: false,
        deleteDialogVisible: false,
        deleteRow: null,
        newAccountName: null,
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
          this.$api.get('/api/getuserOrigin',
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
        this.$api.get('/api/deleteuserOrigin',
          {
            "id": this.deleteRow.id
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
      showDialog(){
        this.newAccountName = null
        this.dialogVisible = true
      },
      confirm(){
        this.$api.get('/api/adduserOrigin',
          {
            "account": this.newAccountName
          },
          res => {
            if (res.status >= 200) {
              this.getData(true)
              this.dialogVisible = false
              this.$message.success('添加成功');
            } else {
              console.log(res.message);
            }
          }
        )
      },
    }
  }
</script>
<style scoped lang="less">
</style>
