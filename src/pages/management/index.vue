<template>
  <div class="management-home flex-c">
    <management-nav/>
    <div class="management-content flex">
      <side-bar/>
      <div class="page-wrap flex">
        <div class="inside-page">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import managementNav from '../../components/managementNav'
  import sideBar from './sideBar'
  export default {
    components:{managementNav,sideBar},
  }
</script>
<style scoped lang="less">
  .management-home{
    box-sizing: border-box;
    height: 100vh;
    .management-content{
      flex-grow: 1;
      .page-wrap{
        flex-grow: 1;
        justify-content: center;
        background: gainsboro;
        .inside-page{
          letter-spacing: 0;
          background: #FFF;
          margin: 30px 0;
          width: 90%;
          padding: 20px;
          border: 1px solid #f0f0f0;
          border-radius: 20px;
          box-shadow:4px 4px 5px #999
        }
      }
    }
  }
</style>
