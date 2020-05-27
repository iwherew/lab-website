<template>
  <div class="box">
    <div class="login flex-c" v-if="step == 0">
      <div class="title">欢迎来到实验室</div>
      <div class="icon bg"></div>
      <input type="text" v-model="username" placeholder="请输入账号或邮箱">
      <input type="password" v-model="password" placeholder="请输入密码">
      <div class="login-btn" @click="login">立即登录</div>
      <div class="bottom-text" @click="toRegister">没有账号？这里注册</div>
    </div>
    <div class="register flex-c" v-else>
      <div class="icon bg"></div>
      <div class="title" v-if="step == 1">欢迎加入实验室</div>
      <div class="title" v-if="step == 2">填写个人资料</div>
      <div class="title" v-if="step == 3">最后一步</div>
      <div class="wrap flex-c" v-if="step == 1">
        <el-form ref="form">
          <el-form-item>
            <el-input v-model="registerSno" placeholder="你的账号是什么"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="registerPassword" placeholder="必须由6-18位字母、数字组成" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="registerEmail" placeholder="还可以使用邮箱登录"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="role" placeholder="请选择角色">
              <el-option
                v-for="item in roleList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div :class="{'next-btn':true, 'gray': !registerFull}" @click="checkAll">注 册</div>
      </div>
<!--      <div class="wrap flex-c" v-if="step == 2">-->
<!--        <input type="text" v-model="registerNickname" placeholder="给自己取个昵称吧">-->
<!--        <input type="text" v-model="registerPhone" placeholder="输入您的手机号码">-->
<!--        <input type="text" v-model="registerIntroduce" placeholder="来一句自我介绍呗">-->
<!--        <div class="next-btn red" @click="nextStep" v-if="registerEmpty">不想填，跳过</div>-->
<!--        <div class="next-btn" @click="nextStep" v-else>下一步</div>-->
<!--      </div>-->
<!--      <div class="wrap flex-c" v-if="step == 3">-->
<!--        <el-upload-->
<!--          class="avatar-uploader"-->
<!--          action="https://jsonplaceholder.typicode.com/posts/"-->
<!--          :show-file-list="false"-->
<!--          :on-success="handleAvatarSuccess"-->
<!--          :before-upload="beforeAvatarUpload">-->
<!--          <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
<!--          <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--        </el-upload>-->
<!--        <div :class="{ 'next-btn':true, 'gray': !imageUrl }" @click="register">完成</div>-->
<!--      </div>-->
      <div class="bottom-text" @click="toLogin">返回登录</div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        step: 0,
        username: null,
        password: null,
        registerSno: null,
        registerPassword: null,
        registerEmail: null,
        registerNickname: null,
        registerPhone: null,
        registerIntroduce: null,
        registerErrorMsg: null,
        imageUrl: null,
        role:'student',
        roleList:[
          {
            value: 'student',
            label: '学生'
          },
          {
            value: 'teacher',
            label: '教师'
          },
          {
            value: 'admin',
            label: '管理员'
          },
          {
            value: 'root',
            label: '超级管理员'
          },
        ],

      }
    },
    computed:{
      registerFull(){
        return (this.registerSno && this.registerPassword && this.registerEmail)
      }
      ,registerEmpty(){
        return !(this.registerNickname || this.registerPhone || this.registerIntroduce)
      }
    },
    methods:{
      showErrorMsg(){
        this.$notify.error({
          title: '错误',
          message: this.registerErrorMsg
        });
      },
      checkAll(){
        this.registerErrorMsg = null
        if(this.checkSno() && this.checkPassword() && this.checkEmail()){
          this.register()
        }else{
          this.showErrorMsg()
        }
      },
      checkSno(){
        let reg = /\S/
        let pattern = new RegExp(reg);
        let result = pattern.test(this.registerSno)
        if(!result){
          this.registerSno = null
          this.registerErrorMsg = "账号名称不为空"
        }
        return result
      },
      checkPassword(){
        let reg = /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{6,18}$/
        let pattern = new RegExp(reg);
        let result = pattern.test(this.registerPassword)
        if(!result){
          this.registerPassword = null
          this.registerErrorMsg = "密码长度为6-18位字母或数字"
        }
        return result
      },
      checkEmail(){
        let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        let pattern = new RegExp(reg);
        let result = pattern.test(this.registerEmail)
        if(!result){
          this.registerEmail = null
          this.registerErrorMsg = "邮箱格式不正确"
        }
        return result
      },
      toRegister(){
        this.step = 1
      },
      toLogin(){
        this.step = 0
      },
      // nextStep(){
      //   this.step++
      // },
      // handleAvatarSuccess(res, file) {
      //   this.imageUrl = URL.createObjectURL(file.raw);
      // },
      // beforeAvatarUpload(file) {
      //   const isJPG = file.type === 'image/jpeg';
      //   const isLt2M = file.size / 1024 / 1024 < 2;
      //
      //   if (!isJPG) {
      //     this.$message.error('上传头像图片只能是 JPG 格式!');
      //   }
      //   if (!isLt2M) {
      //     this.$message.error('上传头像图片大小不能超过 2MB!');
      //   }
      //   return isJPG && isLt2M;
      // },
      register(){
        // 在这里发送注册请求
        this.$api.post('/api/register',
          {
            'account': this.registerSno,
            'email': this.registerEmail,
            'password': this.registerPassword,
            'role': this.role,
            'verificationCode': 1,
            'verificationId': 1
          } ,
          res => {
            if (res.status >= 200 && !res.data.code && res.data.code != 400) {
              this.$notify({
                title: '成功',
                message: '完成注册',
                type: 'success'
              });
              this.toLogin()
            } else {
              this.$notify.error(res.data.message);
            }
          }
        )
      },
      getUserInfo(id){
        this.$api.get( '/api/userId',
          {"id" : id},
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
      login(){
        this.$api.post('/api/login',
          {
            "credential": this.password,
            "identifier": this.username
          }
          ,
          res => {
            if (res.status >= 200 && !res.data.code && res.data.code != 400) {
              this.$notify({
                title: '成功',
                message: '登录成功',
                type: 'success'
              });
              this.$store.dispatch('setAccount',res.data)
              this.getUserInfo(res.data.userId)
              this.$router.back()
            } else {
              this.$notify.error(res.data.message);
            }
          }
        )
      },
    }
  }
</script>
<style scoped lang="less">
  .box{
    width: 480px;
    height: 500px;
    background: rgba(225,225,225,0.5);
    border-radius: 20px;
    flex-direction: column;
    align-items: center;
    input{
      width: 290px;
      height: 30px;
      border-radius: 15px;
      border: none;
      padding-left: 20px;
      margin: 12px 0;
      &::-webkit-input-placeholder{
        color: #BBB;
        font-size: 14px;
        letter-spacing:1px;
      }
    }
    .icon{
      margin-top: 10px;
      width: 132px;
      height: 150px;
      background-size: contain;
      background-image: url("../../images/login/global.png");
    }
    .login{
      position: relative;
      align-items: center;
      height: 100%;
      .title{
        padding-top: 40px;
        font-size: 24px;
        color: #FFF;
        font-weight: bold;
      }
      .login-btn{
        margin-top: 30px;
        width: 160px;
        height: 36px;
        border-radius: 18px;
        color: #FFF;
        background: #12B0DB;
        font-size: 14px;
        line-height: 36px;
        text-align: center;
        font-weight: bold;
        cursor:pointer;
      }
    }
    .bottom-text{
      position: absolute;
      bottom: 6px;
      right: 10px;
      color: #fff;
      letter-spacing:0;
      font-size: 14px;
      cursor:pointer;
    }
    .register{
      position: relative;
      align-items: center;
      height: 100%;
      .title{
        padding: 10px 0 20px;
        font-size: 24px;
        color: #FFF;
        font-weight: bold;
      }
      .wrap{
        align-items: center;
      }
      .next-btn{
        width: 160px;
        height: 36px;
        border-radius: 18px;
        color: #FFF;
        background: #12B0DB;
        font-size: 14px;
        line-height: 36px;
        text-align: center;
        font-weight: bold;
        cursor:pointer;
        &.red{
          background: #FF4081;
        }
        &.gray{
          background: #959595;
        }
      }
    }
  }
</style>
<style lang="less">
  .register{
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      background: white;
      border-radius: 50%;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .el-form-item {
      margin-bottom: 15px;
    }
    .el-form{
      width: 300px;
    }
  }
</style>
