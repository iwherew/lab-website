<template>
  <div class="right-content flex">
    <div class="select-bar flex">
      <div class="select-bar-wrap">
        <div :class="{'select-bar-item':true,'active':activeIndex==index}"
             v-for="(item, index) in apiUrl"
             @click="clickBar(index)"
        >{{item.title}}</div>
      </div>

    </div>
    <div class="right-part flex-c">
      <article-list-component :apiUrl="apiUrl[activeIndex]"/>
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
        apiUrl:[
          {
            title: '通知公告',
            queryApi: '/api/announcesPage',
            queryIdApi: '/api/announcesId',
            insertApi: '/api/insertAnnounce',
            searchApi: '/api/searchAnnounce',
            updateApi: '/api/updateAnnounce',
            deleteApi: '/api/deleteAnnounce',
            idName: "announceId",
            type: "announce",
          },
          {
            title: '招生信息',
            queryApi: '/api/jobPage',
            queryIdApi: '/api/jobId',
            insertApi: '/api/insertJob',
            searchApi: '/api/searchJob',
            updateApi: '/api/updateJob',
            deleteApi: '/api/deleteJob',
            idName: "jobId",
            type: "job",
          },
          {
            title: '研究成果',
            queryApi: '/api/achievementPage',
            queryIdApi: '/api/achievementId',
            insertApi: '/api/insertAchievement',
            searchApi: '/api/searchAchievement',
            updateApi: '/api/updateAchievement',
            deleteApi: '/api/deleteAchievement',
            idName: "achievementId",
            type: "achievement"
          },
          {
            title: '荣誉奖项',
            queryApi: '/api/awardPage',
            queryIdApi: '/api/awardId',
            insertApi: '/api/insertAward',
            searchApi: '/api/searchAward',
            updateApi: '/api/updateAward',
            deleteApi: '/api/deleteAward',
            idName: "awardId",
            type: "award",
          }
        ],
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
