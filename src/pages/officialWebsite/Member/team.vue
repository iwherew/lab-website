<template>
  <div class="team flex-c bg">
    <div class="title">团队成员</div>
    <div class="member-group flex">
      <div class="member-item bg"
           v-for="(item, index) in members"
           :key="index"
           :style="{'backgroundImage':'url('+item.photo+')'}"
           @mouseenter="changeActive($event)"
           @mouseleave="removeActive($event)"
      >
        <div class="black flex-c">
          <div class="name">{{item.name}}</div>
          <div class="intro">{{item.intro}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import team01 from '../../../images/officialWebsite/member/team01.jpg'
  import team02 from '../../../images/officialWebsite/member/team02.jpg'
  import team03 from '../../../images/officialWebsite/member/team03.jpg'
  import team04 from '../../../images/officialWebsite/member/team04.jpg'
  import team05 from '../../../images/officialWebsite/member/team05.jpg'
  import team06 from '../../../images/officialWebsite/member/team06.jpg'
  import team07 from '../../../images/officialWebsite/member/team07.jpg'
  export default {
    data(){
      return{
        members:[
          {
            name: `倪光南`,
            intro: `计算机专家，中国工程院院士，中国科学院计算技术研究所研究员`,
            photo: team01
          },
          {
            name: `柴天佑`,
            intro: `从事复杂工业过程控制、优化和综合自动化的基础研究与工程技术研究`,
            photo: team02
          },
          {
            name: `陈杰`,
            intro: `主要研究方向是复杂系统多指标优化与控制、多智能体协同控制等`,
            photo: team03,
          },
          {
            name: `戴琼海`,
            intro: `主要研究领域为视频处理及宽带通信`,
            photo: team04,
          },
          {
            name: `邓中翰`,
            intro: `主持研制的“星光”系列数字多媒体芯片`,
            photo: team05,
          },
          {
            name: `方家熊`,
            intro: `从事光传感器研究，为我国空间遥感系统提供了多种红外传感器`,
            photo: team06,
          },
          {
            name: `龚惠兴`,
            intro: `主要从事的研究领域是红外光电技术的空间应用`,
            photo: team07,
          },
        ]
      }
    },
    methods:{
      changeActive($event) {
        $event.currentTarget.classList.add('active');
      },
      removeActive($event) {
        $event.currentTarget.classList.remove('active');
      }
    }
  }
</script>
<style scoped lang="less">
  .team{
    width: 100%;
    background-image: url("../../../images/officialWebsite/notice/background01.jpg");
    align-items: center;
  }
  .title{
    margin: 70px 0 30px;
    color: #003B90;
    font-size: 30px;
    padding-bottom: 20px;
    border-bottom: 5px solid #F54785;
    font-weight: bold;
  }
  .member-group{
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
  .member-item{
    width: 230px;
    height: 300px;
    border-radius: 20px;
    margin: 60px;
    .black{
      visibility: hidden;
      width: 100%;
      height: 100%;
      border-radius: 20px;
      background: rgba(0,0,0,0.5);
      align-items: center;
      color: #FFFFFF;
      .name{
        height: 60px;
        font-size: 28px;
        margin-top: 50px;
        font-weight: bold;
      }
      .intro{
        height: 150px;
        font-size: 18px;
        padding: 0 20px;
        line-height: 25px;
        overflow: hidden;  //隐藏多余行数
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 6; //规定显示几行，其余行数用小数点代替
        -webkit-box-orient: vertical;  //规定为垂直方向排列
      }
    }
    &.active .black{
      visibility: visible;
    }
  }
</style>
