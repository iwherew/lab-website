<template>
  <div class="search-area bg flex-c">
    <div class="title">欢迎来到内部论坛</div>
    <div class="sub-title">可以在论坛里分享思路、获取资料、畅所欲言</div>
    <div class="search-bar flex">
      <input class="search-input" v-model="searchText" placeholder="想要搜索什么？">
      <div class="search-btn" @click="search">搜索</div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        searchText: ''
      }
    },
    methods:{
      search(){
        if(this.searchText){
          this.$router.push({ path: '/forum/mixed' ,query:{keywords: this.searchText}})
        }else{
          this.$router.push('/forum/mixed')
        }
      }
    }
  }
</script>
<style scoped lang="less">
  .search-area{
    height: 280px;
    width: 100%;
    background-image: url("../../../images/forum/searchBackground.jpg");
    justify-content: center;
    align-items: center;
    .title{
      color: #FFF;
      font-size: 34px;
      font-weight: bold;
    }
    .sub-title{
      color: #FFF;
      font-size: 17px;
      font-weight: bold;
      margin: 25px 0 35px;
    }
    .search-bar{
      .search-input{
        width: 650px;
        height: 40px;
        padding-left: 20px;
        color: #3B4348;
      }
      .search-btn{
        cursor: pointer;
        width: 115px;
        height: 46px;
        line-height: 46px;
        margin-left: 32px;
        background: #4B5760;
        color: #FFF;
        text-align: center;
        font-weight: bold;
        letter-spacing: 2px;
      }
    }
  }
</style>
