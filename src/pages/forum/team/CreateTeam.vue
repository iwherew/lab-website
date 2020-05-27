<template>
  <div class="create-team flex">
    <div></div>
    <div class="left-part">
      <div class="title">创建团队</div>
      <div class="subtitle">在这里可以创建你的团队并开始一个新的项目</div>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="部门名称：">
          <el-select v-model="form.departmentId" placeholder="请选择部门">
            <el-option
              v-for="item in allDepartment"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="团队成员：">
          <el-select v-model="form.member" multiple filterable placeholder="请选择成员">
            <el-option
              v-for="item in allMemberCompleted"
              :key="item.id"
              :label="item.account"
              :value="item.account">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目名称：">
          <el-input v-model="form.projectName"></el-input>
        </el-form-item>
<!--        <el-form-item label="项目描述：">-->
<!--          <el-input v-model="form.projectDesc"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="">
          <el-button type="primary" plain @click="submit" :disabled=check()>创建团队</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right-part">
      <quick-access/>
      <tag-group/>
      <article-list title="最新内容" :list="newestList" @changePraise="changePraise"/>
    </div>
    <div></div>
  </div>
</template>
<script>
  import quickAccess from '../Home/quickAccess'
  import tagGroup from '../Home/tagGroup'
  import articleList from '../common/articleList'
  import {getCurrentDate} from '../../../utils/func'
  export default {
    components:{quickAccess,tagGroup,articleList},
    data(){
      return{
        form:{},
        allDepartment:[],
        allMember:[],
        newestList:[
          {
            id: 7,
            title:'企业分布式应用架构在云原生时代如何重塑？',
            time:'24  Jun, 2019',
            subarea: 'ask',
            praisePoints: 166,
            isPraised: false,
          },
          {
            id: 8,
            title:'OceanBase如何获得TPC-C测试第一名？',
            time:'21  Jun, 2019',
            subarea: 'ask',
            praisePoints: 95,
            isPraised: false,
          },
          {
            id: 9,
            title:'罗永浩：我不会买新款坚果手机',
            time:'28  Sep, 2019',
            subarea: 'share',
            praisePoints: 80,
            isPraised: true,
          },
          {
            id: 10,
            title:'又断电了，代码没保存',
            time:'24  Sep, 2019',
            subarea: 'chat',
            praisePoints: 79,
            isPraised: true,
          },
          {
            id: 11,
            title:'如何实现一次编码，到处运行？',
            time:'24  Jun, 2019',
            subarea: 'ask',
            praisePoints: 76,
            isPraised: false,
          },
          {
            id: 12,
            title:'如何打造EB级计算平台存储引擎？',
            time:'21  Jun, 2019',
            subarea: 'ask',
            praisePoints: 65,
            isPraised: false,
          },
          {
            id: 120,
            title:'小面包真好吃',
            time:'21  Jun, 2019',
            subarea: 'chat',
            praisePoints: 53,
            isPraised: false,
          },
        ],
        getAllDepartmentCompleted:false,
      }
    },
    computed:{
      allMemberCompleted(){
        let tempList = []
        let reg=/^\d{1,}$/
        let pattern=new RegExp(reg);
        this.allMember.forEach(item => {
          if(!pattern.test(item.account) && this.$store.state.userInfo.account != item.account){
            tempList.push(item)
          }
        })
        console.log(tempList)
        return tempList
      }
    },
    mounted() {
      this.getAllMember(1)
      this.getAllDepartment()
    },
    methods:{
      getAllMember(page){
        this.$api.get( '/api/getuserInfoByPage',
          {'page':page},
          res => {
            if (res.status >= 200) {
              this.allMember.push(...res.data.data)
              if(!this.getAllDepartmentCompleted && res.data.totalNum > res.data.pageSize){
                this.getAllDepartmentCompleted = true
                let count = res.data.totalNum / res.data.pageSize -1
                for(let i=0;i<count;i++){
                  this.getAllMember(i+2)
                }
              }
            } else {
              console.log(res.message);
            }
          }
        )
      },
      getAllDepartment(){
        this.$api.get( '/api/departments',
          {},
          res => {
            if (res.status >= 200) {
              this.allDepartment.push(...res.data.data)
            } else {
              console.log(res.message);
            }
          }
        )
      },
      check(){
        if(this.form.departmentId && this.form.projectName){
          return false
        }else{
          return true
        }
      },
      submit(){
        let memberList = this.$store.state.userInfo.account + '、'
        this.form.member.forEach(item => {
          memberList += item + '、'
        })
        console.log(memberList)
        this.$api.post( '/api/papply',
          {
            "content": this.form.projectName,
            "departmentId": this.form.departmentId,
            "number": memberList,
            "userId": this.$store.state.user.userId
          },
          res => {
            if (res.status >= 200) {
              this.addFirstRecord(this.form.projectName)
              this.$message({
                message: '创建成功',
                type: 'success'
              });
              this.$router.push('/forum/myTeam')
            } else {
              console.log(res.message);
            }
          }
        )
      },
      addFirstRecord(projectName){
        this.$api.post( '/api/pmark/add',
          {
            "pcontent": "创建项目",
            "pname": projectName,
            "update": this.getCurrentDate(),
            "userid": this.$store.state.user.userId,
            "username": this.$store.state.userInfo.account
          },
          res => {
            if (res.status >= 200) {
            } else {
              console.log(res.message);
            }
          }
        )
      },
      getCurrentDate,
      changePraise(id){
        let hasChanged = false
        this.newestList.forEach((item,index) => {
          if(item.id == id){
            if(!hasChanged){
              hasChanged = true
              if(item.isPraised){
                this.newestList[index].praisePoints--
              }else{
                this.newestList[index].praisePoints++
              }
            }
            this.newestList[index].isPraised = !item.isPraised
          }
        })
      },
    }
  }
</script>
<style scoped lang="less">
  .create-team{
    margin: 50px 0;
    justify-content: space-between;
    letter-spacing: 0;
    .left-part{
      .title{
        width: 810px;
        font-size: 22px;
        font-weight: bold;
        color: #3B4348;
        padding-bottom: 10px;
        border-bottom: 1px solid #F2F2F2;
      }
      .subtitle{
        font-size: 14px;
        color: #6F7579;
        margin: 15px 0 30px;
      }
    }
  }
</style>
