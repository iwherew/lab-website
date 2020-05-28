<template>
  <div class="side-bar">
    <el-row class="tac">
      <el-col>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="/management/user">
            <i class="el-icon-user-solid"></i>
            <span slot="title">原始帐号</span>
          </el-menu-item>
<!--          <el-menu-item index="/management/apply">-->
<!--            <i class="el-icon-s-order"></i>-->
<!--            <span slot="title">入部申请</span>-->
<!--          </el-menu-item>-->
          <el-menu-item index="/management/job">
            <i class="el-icon-reading"></i>
            <span slot="title">招聘信息</span>
          </el-menu-item>
          <el-menu-item index="/management/achievement">
            <i class="el-icon-s-opportunity"></i>
            <span slot="title">研究成果</span>
          </el-menu-item>
          <el-menu-item index="/management/announce">
            <i class="el-icon-s-check"></i>
            <span slot="title">通知公告</span>
          </el-menu-item>
          <el-menu-item index="/management/department">
            <i class="el-icon-s-home"></i>
            <span slot="title">部门管理</span>
          </el-menu-item>
          <el-menu-item index="/management/member">
            <i class="el-icon-s-custom"></i>
            <span slot="title">成员管理</span>
          </el-menu-item>
          <el-menu-item index="/management/project">
            <i class="el-icon-s-cooperation"></i>
            <span slot="title">项目管理</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    computed: {
      activeIndex() {
        return this.$route.path
      },
    },
    methods: {
      handleSelect(key) {
        this.$router.push(key)
      }
    }
  }
</script>
<style lang="less">
  .side-bar{
    width: 260px;
    height: 100%;
    .el-row, .el-col,.el-menu-vertical-demo{
      height: 100%;
    }
  }
</style>
