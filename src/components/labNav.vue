<template>
  <div class="header flex">
    <div class="header-left flex" @click="handleCommand('/')">
      <div class="logo bg"></div>
      <div class="school-name flex-c">
        <div class="school-name-cn">杭州电子科技大学</div>
        <div class="school-name-en">Hangzhou Dianzi University</div>
      </div>
      <div class="lab-name">计算机实验室</div>
    </div>
    <div class="header-right flex">
      <div class="nav">
        <el-menu :default-active="activeIndex"
                 mode="horizontal"
                 active-text-color="#F54785"
                 router
        >
          <el-menu-item index="/home">首页</el-menu-item>
          <el-menu-item index="/notice">通知公告</el-menu-item>
          <el-menu-item index="/department">部门介绍</el-menu-item>
          <el-menu-item index="/member">成员介绍</el-menu-item>
          <el-menu-item index="/recruitment">招生信息</el-menu-item>
        </el-menu>
      </div>
      <div class="avatar-wrap" v-if="!user.userId">
        <el-tooltip class="item" effect="dark" content="用户未登录，请先登录" placement="bottom">
          <div class="avatar no-avatar bg" @click="toLogin"></div>
        </el-tooltip>
      </div>
      <div class="avatar-wrap" v-else>
        <el-dropdown @command="handleCommand">
          <div class="avatar user-avatar bg" :style="{'backgroundImage':'url('+$store.state.userInfo.profilePicture+')'}"></div>
<!--          <div class="red-dot">7</div>-->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/forum">内部论坛</el-dropdown-item>
            <el-dropdown-item command="/management" v-if="$store.state.user.role[0] != 'student'">后台管理</el-dropdown-item>
            <el-dropdown-item command="/forum/myTeam">我的团队</el-dropdown-item>
            <el-dropdown-item command="/personalPage/0">通知公告</el-dropdown-item>
            <el-dropdown-item command="/personalPage/1">招生信息</el-dropdown-item>
            <el-dropdown-item command="/personalPage/2">研究成果
<!--              <div class="red-dot">5</div>-->
            </el-dropdown-item>
            <el-dropdown-item command="/personalPage/3">荣誉奖项
<!--              <div class="red-dot">2</div>-->
            </el-dropdown-item>
            <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    computed: {
      activeIndex() {
        return this.$route.path
      },
      user() {
        return this.$store.state.user
      }
    },
    methods: {
      logout(){
        this.$store.dispatch('setAccount',{})
        this.$store.dispatch('setUserInfo',{})
        this.$router.push('/')
      },
      toLogin() {
        this.$router.push('/login')
      },
      handleCommand(command) {
        if(command == 'logout'){
          this.logout()
        }else{
          this.$router.push(command)
        }
      }
    }
  }
</script>
<style scoped lang="less">
  .header {
    justify-content: space-between;

    .header-left {
      .logo {
        margin: 5px 25px;
        width: 60px;
        height: 60px;
        background-image: url("../images/officialWebsite/home/school-logo.png");
      }

      .school-name {
        color: #003B90;
        font-weight: bold;
        padding: 10px 10px 0;
        align-items: center;
      }

      .school-name-cn {
        font-size: 26px;
      }

      .school-name-en {
        margin-top: 5px;
        font-size: 12px;
        letter-spacing: 1px;
      }

      .lab-name {
        padding-left: 20px;
        line-height: 70px;
        color: #F54785;
        font-size: 18px;
        font-weight: bold;
      }
    }

    .avatar {
      margin: 10px 20px;
      height: 50px;
      width: 50px;
      border-radius: 50%;
      position: relative;
      &.no-avatar {
        background-image: url("../images/officialWebsite/home/yonghu.png");
      }

      &.user-avatar {
        margin: 5px 20px 0;
        height: 60px;
        width: 60px;
        background-image: url("../images/userImg/userImage.jpg");
      }
    }
    .red-dot{
      position: absolute;
      top: 2px;
      right: 15px;
      min-width: 18px;
      min-height: 18px;
      padding: 1px 1px;
      border-radius: 50%;
      background: #E51C23;
      color: #FFF;
      font-size: 12px;
      line-height: 18px;
      text-align: center;
      letter-spacing: 0;
    }
  }
</style>
<style lang="less">
  .header {
    .el-menu.el-menu--horizontal {
      border-bottom: none;
    }

    .el-menu--horizontal > .el-menu-item {
      height: 70px;
      line-height: 70px;
    }

    .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
      color: #F54785;
    }
  }
  .el-dropdown-menu{
    width: 150px;
    .el-dropdown-menu__item{
      position: relative;
    }
    .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover {
      background-color: #E2E2E2;
      color: #606266;
    }
    .red-dot{
      position: absolute;
      top: 9px;
      right: 15px;
      min-width: 18px;
      min-height: 18px;
      padding: 1px 1px;
      border-radius: 50%;
      background: #E51C23;
      color: #FFF;
      font-size: 12px;
      line-height: 18px;
      text-align: center;
      letter-spacing: 0;
    }
  }
</style>
