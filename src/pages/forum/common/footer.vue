<template>
  <div class="footer">
    <div class="main flex">
      <div class="address">
        <div class="title">实验室地址</div>
        <div class="text">杭州市杭州经济技术开发区白杨街道2号大街1158号</div>
      </div>
      <div class="link-group">
        <div class="title">友情链接</div>
        <div class="link-item flex"
             v-for="(item, index) in links"
             :key="index"
             @click="urlOpen(item.link)"
        >
          <div class="right-icon">></div>
          <div class="link-name">{{item.name}}</div>
        </div>
      </div>
    </div>
    <div class="bar"></div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        links:[
          {
            name: '杭州电子科技大学官网',
            link: 'http://www.hdu.edu.cn/'
          },
          {
            name: '杭州电子科技大学计算机学院',
            link: 'http://computer.hdu.edu.cn/'
          },
          {
            name: '数字杭电',
            link: 'https://cas.hdu.edu.cn/'
          },
          {
            name: 'TensorFlow中文社区',
            link: 'http://www.tensorfly.cn/'
          },
        ]
      }
    },
    methods:{
      urlOpen(url){
        window.open(url,'_blank')
      }
    }
  }
</script>
<style scoped lang="less">
  .footer{
    width: 100%;
    letter-spacing: 0;
    .main{
      width: 100%;
      height: 200px;
      background: #414A52;
      padding-top: 20px;
      padding-left: 100px;
      .title{
        font-size: 20px;
        color: #FFF;
        font-weight: bold;
        margin-bottom: 12px;
      }
      .address{
        .text{
          width: 200px;
          font-size: 14px;
          font-weight: bold;
          color: #8F98A0;
          line-height: 20px;
        }
      }
      .link-group{
        margin-left: 110px;
        .link-item{
          height: 30px;
          width: 233px;
          border-bottom: 1px solid #535B61;
          cursor: pointer;
          .right-icon{
            transform: scale(1, 1.5);
            line-height: 30px;
            color: #535B61;
            margin-right: 8px;
          }
          .link-name{
            font-size: 15px;
            font-weight: bold;
            color: #DDDDDD;
            line-height: 30px;
          }
          &:hover{
            border-bottom: 1px solid #FFFFFF;
            .right-icon, .link-name{
              color: #FFFFFF;
            }
          }
        }
      }
    }
    .bar{
      width: 100%;
      height: 30px;
      background: #353C41;
    }
  }
</style>
