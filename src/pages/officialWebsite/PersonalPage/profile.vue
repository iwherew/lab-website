<template>
  <div class="profile flex-c">
    <div class="avatar bg"></div>
    <div class="authorization">管理员</div>
    <div class="info">
      <div class="title gray flex">
        <div>个人资料</div>
        <div class="id">id： {{user.userId}}</div>
      </div>
      <div class="nickname">昵称：{{userInfo.nickname}}</div>
      <div class="phone">角色：{{formatter(user.role[0])}}</div>
      <div class="email">邮箱：{{userInfo.email}}</div>
      <div class="self-introduction">个人介绍： {{userInfo.introduction}}</div>
    </div>
    <div class="forum-btn cp pink" @click="showDialog()">完善个人资料</div>
    <div class="forum-btn cp" @click="$router.push('/forum')">进入内部论坛</div>
    <el-dialog
      title='完善个人信息'
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form ref="form" :model="userInfoTemp" label-width="80px">
        <el-form-item label="昵称">
          <el-input v-model="userInfoTemp.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userInfoTemp.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="userInfoTemp.phone" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="个人介绍">
          <el-input v-model="userInfoTemp.introduction" placeholder="请输入个人介绍"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUser()">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    computed:{
      user(){
        return this.$store.state.user
      }
    },
    data(){
      return{
        dialogVisible: false,
        userInfoTemp: {
          "account": null,
          "active": null,
          "email": null,
          "id": null,
          "introduction": null,
          "isban": null,
          "nickname": null,
          "phone": null,
          "profilePicture": null,
          "registerTime": null
        },
        userInfo: {
          "account": null,
          "active": null,
          "email": null,
          "id": null,
          "introduction": null,
          "isban": null,
          "nickname": null,
          "phone": null,
          "profilePicture": null,
          "registerTime": null
        }
      }
    },
    mounted(){
      this.getUserInfo()
    },
    methods:{
      getUserInfo(){
        this.$api.get( '/api/userId',
          {"id" : this.$store.state.user.userId},
          res => {
            if (res.status >= 200) {
              this.userInfo = res.data
              this.$store.dispatch('setUserInfo',res.data)
            } else {
              console.log(res.message);
            }
          }
        )
      },
      formatter(type) {
        switch (type) {
          case 'student':
            return "学生"
            break
          case 'teacher':
            return "教师"
            break
          case 'admin':
            return "管理员"
            break
          case 'root':
            return "超级管理员"
            break
        }
      },
      showDialog(){
        this.userInfoTemp = JSON.parse(JSON.stringify(this.userInfo))
        this.dialogVisible = true
      },
      updateUser(){
        this.$api.put( '/api/updateUser',
          {
            "id" : this.$store.state.user.userId,
            "description": this.userInfoTemp.introduction,
            "email": this.userInfoTemp.email,
            "name": this.userInfoTemp.nickname,
            "phone": this.userInfoTemp.phone,
          },
          res => {
            if (res.status >= 200) {
              this.dialogVisible = false
              this.getUserInfo()
            } else {
              console.log(res.message);
            }
          }
        )
      }
    }
  }
</script>
<style scoped lang="less">
  .profile{
    width: 240px;
    align-items: center;
    .avatar{
      width: 180px;
      height: 180px;
      border-radius: 50%;
      background-image: url("../../../images/userImg/userImage.jpg");
    }
    .authorization{
      width: 100px;
      height: 26px;
      border-radius: 13px;
      background: #00D2D4;
      text-align: center;
      line-height: 26px;
      color: #fff;
      letter-spacing: 0;
      margin-top: 25px;
    }
    .info{
      width: 100%;
      margin-top: 20px;
      border: 1px solid #BBBBBB;
      border-radius: 10px;
      padding: 0 24px;
      background: #FDFBFB;
      letter-spacing: 0;
      font-size: 16px;
      color: #4D4D4D;
      div{
        margin: 20px 0;
      }
      .title{
        justify-content: space-between;
        border-bottom: 1px solid #BBBBBB;
      }
      .gray{
        color: #959595;
      }
    }
    .forum-btn{
      width: 200px;
      height: 40px;
      background: #337AB7;
      border-radius: 20px;
      line-height: 40px;
      letter-spacing: 0;
      text-align: center;
      color: #FFF;
      margin-top: 30px;
      &.pink{
        background: #00c3f5;
      }
    }
  }
</style>
