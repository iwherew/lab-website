<template>
  <div class="quick-access flex-c">
    <div class="title">快速访问</div>
    <div class="wrap flex">
      <div class="item flex"
           v-for="(item, index) in quickAccessList"
           :key="index"
           @click="routerPush(item.url)"
      >
        <div class="icon bg" :style="{'backgroundImage':'url('+item.iconUrl+')'}"></div>
        <div class="text">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import icon01 from "../../../images/forum/fatie.png"
  import icon01active from "../../../images/forum/fatie-active.png"
  import icon02 from "../../../images/forum/tuandui.png"
  import icon02active from "../../../images/forum/tuandui-active.png"
  import icon03 from "../../../images/forum/shoucang.png"
  import icon03active from "../../../images/forum/shoucang-active.png"
  import icon04 from "../../../images/forum/tuichu.png"
  import icon04active from "../../../images/forum/tuichu-active.png"
  export default {
    data(){
      return{
        quickAccessList:[
          {
            name: '发帖',
            iconUrl: icon01,
            iconActiveUrl: icon01active,
            url: '/forum/articleEdit'
          },
          {
            name: '团队',
            iconUrl: icon02,
            iconActiveUrl: icon02active,
          },
          {
            name: '收藏',
            iconUrl: icon03,
            iconActiveUrl: icon03active,
          },
          {
            name: '退出论坛',
            iconUrl: icon04,
            iconActiveUrl: icon04active,
          },
        ]
      }
    },
    methods:{
      routerPush(url){
        this.$router.push(url)
      }
    }
  }
</script>
<style scoped lang="less">
  .quick-access{
    margin-top: 30px;
    width: 395px;
    height: 165px;
    box-sizing: border-box;
    border: 1px solid #D7D9DC;
    padding: 10px 35px;
    justify-content: space-around;
    .title{
      color: #3B4348;
      font-size: 22px;
      font-weight: bold;
    }
    .wrap{
      flex-wrap: wrap;
      .item{
        margin: 5px 0;
        width: 150px;
        align-items: center;
        &:hover{
          .text{
            color: #1296DB;
          }
        }
      }
      .icon{
        width: 30px;
        height: 30px;
        margin-right: 12px;
        background-image: url("../../../images/forum/fatie.png");
      }
      .text{
        color: #6F7579;
        font-size: 14px;
        letter-spacing: 1px;
      }
    }
  }
</style>
