<template>
  <div class="tag-group">
    <div class="title">热门标签</div>
    <div class="tags flex">
      <div class="tag"
           v-for="(item, index) in tagsList"
           :key="index"
           @click="search(item)"
      >{{item}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        tagsList:[
          '机器学习','可视化','Apache','无标注数据','框架','非结构化','云恓大会','微服务','分布式','OceanBase','性能开销'
        ]
      }
    },
    methods:{
      search(searchText){
        this.$router.push({ path: '/forum/mixed' ,query:{keywords: searchText}})
      }
    }
  }
</script>
<style scoped lang="less">
  .tag-group{
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .title{
    color: #3B4348;
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .tags{
    flex-wrap: wrap;
    width: 395px;
    .tag{
      cursor: pointer;
      letter-spacing: 0;
      padding: 5px 10px;
      border: 1px solid #BBBBBB;
      color: #414A52;
      font-size: 13px;
      text-align: center;
      margin-right: 22px;
      margin-bottom: 15px;
      &:hover{
        color: #1296DB;
        border: 1px solid #1296DB;
      }
    }
  }

</style>
