<template>
  <div class="container">
    <el-form :inline="true" :model="searchForm" style="text-align:right">
      <el-form-item prop="search">
        <el-input
          v-model="searchForm.name"
          placeholder="请输入部门名称"
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
        prop="memberId"
        label="成员id"
        min-width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="memberId"
        label="成员名称"
        min-width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="memberType"
        label="成员权限"
        min-width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="departmentId"
        label="部门"
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
      :title=this.dialogTitle
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form ref="form" :model="departmentDetail" label-width="80px">
        <el-form-item label="部门名称">
          <el-input v-model="departmentDetail.name" placeholder="请输入部门名称"></el-input>
        </el-form-item>
        <el-form-item label="部门描述">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入部门描述"
            v-model="departmentDetail.description">
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
        <el-button type="danger" @click="confirm()">删 除</el-button>
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
        departmentDetail:{
          id: null,
          name: null,
          description: null,
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
          this.$api.get('/api/searchMember',
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
          this.$api.get('/api/memberPage',
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
        this.$api.delete('/api/deleteMember',
          {
            "memberId" : this.deleteRow.memberId,
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
          this.dialogTitle = '添加部门'
          this.departmentDetail = {
            id: null,
            name: null,
            description: null,
          }
        }else{
          this.dialogTitle = '修改部门'
          this.departmentDetail = {
            id: row.id,
            name: row.name,
            description: row.description,
          }
        }
        this.dialogVisible = true
      },
      confirm(){
        if(this.dialogTitle == '添加部门'){
          this.$api.post('/api/insertDepartment',
            { "description": this.departmentDetail.description,
              "name": this.departmentDetail.name},
            res => {
              if (res.status >= 200) {
                this.getData(true)
                this.dialogVisible = false
                this.$message.success('创建新部门成功');
              } else {
                console.log(res.message);
              }
            }
          )
        }else{
          this.$api.put('/api/updateDepartment',
            {
              "id" : this.departmentDetail.id,
              "description": this.departmentDetail.description,
              "name": this.departmentDetail.name
            },
            res => {
              if (res.status >= 200) {
                this.getData(true)
                this.dialogVisible = false
                this.$message.success('修改部门信息成功');
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
