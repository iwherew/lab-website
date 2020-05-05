<template>
  <div class="header flex">
    <div class="header-left flex" @click="handleCommand('/forum/home')">
      <div class="school-name flex-c">
        <div class="school-name-cn">杭州电子科技大学</div>
        <div class="school-name-en">Hangzhou Dianzi University</div>
      </div>
      <div class="lab-name">计算机实验室 内部论坛</div>
    </div>
    <div class="header-right flex">
      <div class="nav">
        <el-menu :default-active="activeIndex"
                 mode="horizontal"
                 router
                 background-color="#3B4348"
                 text-color="#fff"
                 active-text-color="#ffd04b"
        >
          <el-menu-item index="/forum/home">首页</el-menu-item>
          <el-menu-item index="/forum/mixed">综合区</el-menu-item>
          <el-menu-item index="/forum/askArea">提问区</el-menu-item>
          <el-menu-item index="/forum/shareArea">分享区</el-menu-item>
          <el-menu-item index="/forum/chatArea">闲聊区</el-menu-item>
        </el-menu>
      </div>
      <div class="avatar-wrap" v-if="!user.sno">
        <el-tooltip class="item" effect="dark" content="用户未登录，请先登录" placement="bottom">
          <div class="avatar no-avatar bg" @click="toLogin"></div>
        </el-tooltip>
      </div>
      <div class="avatar-wrap" v-else>
        <el-dropdown @command="handleCommand">
          <div class="avatar user-avatar bg"></div>
          <div class="red-dot">7</div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="/personalPage/0">个人主页</el-dropdown-item>
            <el-dropdown-item command="/forum">内部论坛</el-dropdown-item>
            <el-dropdown-item command="/personalPage/3">资源查询</el-dropdown-item>
            <el-dropdown-item command="/personalPage/0">部门通知
              <div class="red-dot">5</div>
            </el-dropdown-item>
            <el-dropdown-item command="/personalPage/2">我的消息
              <div class="red-dot">2</div>
            </el-dropdown-item>
            <el-dropdown-item command="/personalPage/1">我的收藏</el-dropdown-item>
            <el-dropdown-item>退出登陆</el-dropdown-item>
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
      toLogin() {
        this.$router.push('/login')
      },
      handleCommand(command) {
        this.$router.push(command)
      }
    }
  }
</script>
<style scoped lang="less">
  .header {
    justify-content: space-between;
    background: #3B4348;
    .header-left {
      cursor: pointer;
      .logo {
        margin: 5px 25px;
        width: 60px;
        height: 60px;
        background-image: url("../images/officialWebsite/home/school-logo.png");
      }

      .school-name {
        margin-left: 20px;
        color: #FFF;
        font-weight: bold;
        padding: 10px 10px 0;
        align-items: center;
      }

      .school-name-cn {
        font-size: 24px;
      }

      .school-name-en {
        margin-top: 8px;
        font-size: 11px;
        letter-spacing: 1px;
      }

      .lab-name {
        padding-left: 20px;
        line-height: 70px;
        color: #818A90;
        font-size: 14px;
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
