<template>
  <div class="article-brief">
    <div class="header flex cp">
      <div :class="iconClass(articleItem.title)"></div>
      <div class="title one-line" @click="goToDetail(articleItem.id)">{{articleItem.title.slice(10)}}</div>
    </div>
    <div class="info flex">
      <div class="info-left flex">
        <div class="info-icon bg calendar"></div>
        <div class="time text">{{articleItem.datetime}}</div>
        <div class="info-icon bg tag"></div>
        <div class="text">{{articleItem.nickname}}</div>
        <div class="info-icon bg comment"></div>
        <div class="text">{{articleItem.visitCount}}次查看</div>
      </div>
<!--      <div :class="['info-right','flex','praise',articleItem.isPraised?'is-praised':'']" @click="changePraise(articleItem.id)">-->
<!--        <div class="praise-icon bg"></div>-->
<!--        <div class="praise-num">{{articleItem.praisePoints}}</div>-->
<!--      </div>-->
    </div>
    <div class="brief cp" @click="goToDetail(articleItem.id)" v-html="articleItem.content">
    </div>
  </div>
</template>
<script>
  export default {
    props:['articleItem'],
    methods: {
      iconClass(title) {
        let subarea
        if(title.indexOf('【内部论坛：提问区】') != -1){
          subarea = 'ask'
        }else if(title.indexOf('【内部论坛：分享区】') != -1){
          subarea = 'share'
        }else{
          subarea = 'chat'
        }
        return `content-icon bg ` + subarea
      },
      goToDetail(id){
        let routeData = this.$router.resolve({ path: '/forum/articleDetail' ,query:{id:id}});
        window.open(routeData.href, '_blank');
      },
    }
  }
</script>
<style scoped lang="less">
  .article-brief{
    margin-top: 40px;
    .header{
      height: 40px;
      align-items: center;
      margin-bottom: 4px;
      .content-icon{
        width: 28px;
        height: 28px;
        margin-right: 15px;
        &.ask{
          background-image: url("../../../images/forum/askIcon.png");
        }
        &.share{
          background-image: url("../../../images/forum/shareIcon.png");
        }
        &.chat{
          background-image: url("../../../images/forum/chatIcon.png");
        }
      }
      .title{
        color: #3B4348;
        font-size: 22px;
        font-weight: bold;
        width: 650px;
      }
    }
    .info{
      justify-content: space-between;
      height: 30px;
      margin-bottom: 20px;
      border-top: 1px solid #F2F2F2;
      border-bottom: 1px solid #F2F2F2;
      .info-left,.info-right{
        height: 30px;
        align-items: center;
      }
      .info-icon{
        width: 15px;
        height: 15px;
        margin-left: 10px;
        margin-right: 10px;
        &.calendar{
          background-image: url("../../../images/forum/calendar-icon.png");
        }
        &.tag{
          background-image: url("../../../images/forum/category-icon.png");
        }
        &.comment{
          background-image: url("../../../images/forum/comment.png");
        }
      }
      .text{
        color: #3B4348;
        margin-right: 20px;
        font-size: 14px;
        &.time{
          color: #6F7579;
        }
      }
      .info-right{
        margin-right: 10px;
        cursor: pointer;
        .praise-icon{
          margin-right: 8px;
          width: 18px;
          height: 15px;
          background-image: url("../../../images/forum/pariseIcon.png");
        }

        .praise-num{
          color: #6F7579;
          font-size: 14px;
        }
        &.is-praised{
          .praise-num{
            color: #1296DB;
          }
          .praise-icon{
            background-image: url("../../../images/forum/pariseIconActive.png");
          }
        }
        &:hover{
          .praise-icon{
            background-image: url("../../../images/forum/pariseIconActive.png");
          }
        }
      }
    }
    .brief{
      width: 810px;
      max-height: 90px;
      color: #6F7579;
      font-size: 14px;
      line-height: 25px;
      margin-bottom: 50px;
    }
  }

</style>
