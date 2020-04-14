<template>
  <div class="profile flex-c">
    <div class="avatar bg"></div>
    <div class="authorization">管理员</div>
    <div class="info">
      <div class="title gray flex">
        <div>个人资料</div>
        <div class="id">id： {{user.id}}</div>
      </div>
      <div class="nickname">昵称： {{user.nickname}}</div>
      <div class="phone">手机：{{user.phone}}</div>
      <div class="email">邮箱：{{user.email}}</div>
      <div class="self-introduction">个人介绍： {{user.selfIntroduction}}</div>
    </div>
    <div class="forum-btn" @click="$router.push('/forum')">进入内部论坛</div>
  </div>
</template>
<script>
  export default {
    computed:{
      user(){
        return this.$store.state.user
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
      margin-top: 40px;
    }
  }
</style>
