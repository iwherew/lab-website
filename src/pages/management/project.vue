<template>
  <div class="container">
    <el-form :inline="true" :model="searchForm" style="text-align:right">
      <el-form-item>
        <el-button
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
        prop="content"
        label="项目"
        min-width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="departmentName"
        label="部门"
        min-width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="number"
        label="成员"
        min-width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        min-width="100"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button @click="handleRecord(scope.row)" v-if="scope.row.status == '已通过'">纪录</el-button>
          <el-button type="primary" @click="handleComplete(scope.row)" v-if="scope.row.status == '已通过'">验收</el-button>
          <el-button type="success" @click="handlePass(scope.row)" v-if="scope.row.status == '待审核'">通过</el-button>
          <el-button type="danger" @click="handleReject(scope.row)" v-if="scope.row.status == '待审核'">拒绝</el-button>
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
        departmentDetail:{
          id: null,
          name: null,
          description: null,
        },
        allDepartment:[],
        dialogTitle: null,
      }
    },
    mounted() {
      this.getAllDepartment()
    },
    methods:{
      getAllDepartment(){
        this.$api.get( '/api/departments',
          {},
          res => {
            if (res.status >= 200) {
              this.allDepartment.push(...res.data.data)
              this.getData()
            } else {
              console.log(res.message);
            }
          }
        )
      },
      getData(refresh){

        if(refresh){
          this.pageNum = 1
        }
        let url = null
        let params = {}

        if(this.searchForm.name){
          url = '/api/searchDepartment'
          params = {
            'page': this.pageNum,
            'search': this.searchForm.name,
          }
        }else{
          url = '/api/papplyPage'
          params =  { 'page': this.pageNum }
        }

        this.$api.get(url,params,
          res => {
            if (res.status >= 200) {
              let tempList = res.data.data
              tempList.map(item =>{
                this.allDepartment.forEach(departmentItem =>{
                  if(item.departmentId == departmentItem.id){
                    item.departmentName = departmentItem.name
                  }
                })
              })
              this.list = tempList
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
      handlePass(row){
        this.$api.get('/api/papply/accept',
          { "id": row.id},
          res => {
            if (res.status >= 200) {
              this.getData(true)
              this.$message.success('已通过');
            } else {
              console.log(res.message);
            }
          }
        )
      },
      handleReject(row) {
        this.$api.get('/api/papply/reject',
          { "id": row.id},
          res => {
            if (res.status >= 200) {
              this.getData(true)
              this.$message.danger('已拒绝');
            } else {
              console.log(res.message);
            }
          }
        )
      },
      handleRecord(row){
        this.$api.get('/api/pmark/selectByproname',
          {
            "page": 1,
            "proname": row.content
          },
          res => {
            if (res.status >= 200) {
              this.getData(true)
            } else {
              console.log(res.message);
            }
          }
        )
      },
      handleComplete(row){
        this.$api.get('/api/papply/complete',
          { "id": row.id},
          res => {
            if (res.status >= 200) {
              this.getData(true)
              this.$message.success('已验收');
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
