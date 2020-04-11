<template>
  <div class="right-content flex">
    <div class="select-bar flex">
      <div class="select-bar-wrap">
        <div :class="{'select-bar-item':true,'active':activeIndex==index}"
             v-for="(item, index) in selectBarItems"
             @click="clickBar(index)"
        >{{item.title}}</div>
      </div>

    </div>
    <div class="right-part flex-c">
      <article-list-component :title="selectBarItems[activeIndex].title"/>
    </div>
  </div>
</template>
<script>
  import articleListComponent from '../common/articleListsComponent'
  export default {
    components:{articleListComponent},
    data(){
      return{
        activeIndex: 0,
        selectBarItems:[
          {
            title: '部门消息',
            component: ''
          },
          {
            title: '我的收藏',
            component: ''
          },
          {
            title: '我的消息',
            component: ''
          },
          {
            title: '资源查询',
            component: ''
          },
        ]
      }
    },
    computed:{
      part(){
        return this.$route.params.part
      }
    },
    methods:{
      clickBar(index){
        this.activeIndex = index
      }
    },
    mounted() {
      this.activeIndex = this.$route.params.part
    },
    watch:{
      part(val){
        this.activeIndex = val
      }
    }
  }
</script>
<style scoped lang="less">
  .right-content{
    letter-spacing: 0;
    width: 800px;
    margin-top: 20px;
    padding: 20px 0;
    border: 1px solid #bbbbbb;
    border-radius: 10px;
    background: #FDFBFB;
    .select-bar{
      width: 160px;
      border-right: 1px solid #BBBBBB;
      .select-bar-wrap{
        width: 100%;
        margin-top: 30px;
      }
      .select-bar-item{
        width: 100%;
        height: 35px;
        color: #4D4D4D;
        text-align: center;
        line-height: 35px;
        &.active{
          background: #F54785;
          color: #FFF;
        }
      }
    }
    .right-part{
      margin-top: 20px;
      flex-grow: 1;
      align-items: center;
    }
  }
</style>
