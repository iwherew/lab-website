<template>
  <div class="personal-page">
    <banner/>
    <div class="wrap flex">
      <div class="content flex">
        <profile/>
        <right-content/>
      </div>
    </div>

  </div>
</template>
<script>
  import banner from '../../../components/banner'
  import profile from './profile'
  import rightContent from './content'
  export default {
    components: {banner,profile,rightContent},
  }
</script>
<style scoped lang="less">
  .wrap{
    width: 100%;
    padding: 60px 0 100px;
    background-image: url("../../../images/officialWebsite/notice/background01.jpg");
    justify-content: center;
  }
  .content{
    width: 1200px;
    padding: 60px;
    background: #F7F7F7;
    justify-content: space-around;
  }
</style>
