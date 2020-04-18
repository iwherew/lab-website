<template>
  <div class="create-team flex">
    <div class="left">
      <div class="title">创建团队</div>
      <div class="subtitle">需要不对外公开的团队讨论？在这里创建一个新的团队并邀请你的成员加入</div>
    </div>
    <div class="right bg"></div>
  </div>
</template>
<script>
  export default {
  }
</script>
<style scoped lang="less">
  .create-team{
    width: 395px;
    height: 165px;
    box-sizing: border-box;
    background: #FEFBDC;
    border: 1px solid #E9E6C4;
    padding: 0 35px;
    justify-content: space-between;
    align-items: center;
    .left{
      .title{
        color: #3B4348;
        font-size: 22px;
        font-weight: bold;
      }
      .subtitle{
        letter-spacing: 1px;
        margin-top: 13px;
        color: #6F7579;
        font-size: 14px;
        line-height: 24px;
        width: 195px;
      }
    }
    .right{
      width: 110px;
      height: 110px;
      background-image: url("../../../images/forum/team.png");
    }
  }
</style>
