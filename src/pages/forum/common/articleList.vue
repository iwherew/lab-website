<template>
  <div class="popular">
    <div class="column-title">{{title}}</div>
    <div class="content-item flex"
         v-for="(item, index) in list"
         :key="index"
    >
      <div :class="iconClass(item)"></div>
      <div class="brief flex-c">
        <div class="title one-line">{{item.title}}</div>
        <div class="subtitle flex">
          <div class="time">{{item.time}}</div>
          <div class="subarea" v-text="subareaTransform(item.subarea)"></div>
        </div>
      </div>
      <div :class="['praise',item.isPraised?'is-praised':'']" @click="changePraise(item.id)">
        <div class="praise-icon bg"></div>
        <div class="praise-num">{{item.praisePoints}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props:['title','list'],
    methods:{
      iconClass(item){
        return `content-icon bg `+ item.subarea
      },
      subareaTransform(subarea){
        switch (subarea) {
          case 'ask':
            return '提问区'
          case 'share':
            return '分享区'
          case 'chat':
            return '闲聊区'
        }
      },
      changePraise(id){
        this.$emit('changePraise',id)
      },
    }
  }
</script>
<style scoped lang="less">
  .column-title{
    color: #3B4348;
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 30px;
  }
  .content-item{
    width: 350px;
    border-bottom: 1px solid #F2F2F2;
    padding: 15px 0;
    letter-spacing: 0;
    position: relative;
    .brief{
      .title{
        color: #3B4348;
        font-size: 14px;
      }
      .subtitle{
        margin-top: 11px;
        .time{
          color: #6F7579;
          font-size: 14px;
          margin-right: 10px;
        }
        .subarea{
          color: #3B4348;
          font-size: 14px;
        }
      }
    }
    .praise{
      cursor: pointer;
      position: absolute;
      right: 0;
      bottom: 0;
      padding: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #F2F2F2;
      border-bottom: none;
      .praise-icon{
        margin-right: 8px;
        width: 15px;
        height: 15px;
        background-image: url("../../../images/forum/pariseIcon.png");
      }
      .praise-num{
        color: #6F7579;
        font-size: 12px;
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
</style>
