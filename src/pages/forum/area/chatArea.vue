<template>
  <div class="area">
    <areas @changePraise="changePraise" :articleList="articleList" :newestList="newestList"/>
  </div>
</template>
<script>
  import areas from './area'
  export default {
    components:{areas},
    data(){
      return{
        articleList:[
          {
            id: 2,
            title:'又断电了，代码没保存',
            tag: '生活',
            time:'28  Jun, 2019',
            subarea: 'share',
            praisePoints: 168,
            isPraised: true,
            commentNum: 6,
            brief: `我太难了`
          },
          {
            id: 3,
            title:'技术人看《长安十二时辰》的正确姿势',
            tag: '动态化渲染',
            time:'24  Jun, 2019',
            subarea: 'share',
            praisePoints: 51,
            isPraised: false,
            commentNum: 9,
            brief: `从“叉手礼”、“水盆羊汤”、“酒晕妆”这些唐朝人的生活细节，到精美的坊间造型、充满意境的诗词歌赋，《长安十二时辰》不仅以缜密剧情赢得赞誉，更还原了一个真实的大唐长安。在精良制作之上，技术人如何让观众感受1000多年前的长安风情、更深度的理解剧情...`
          },
          {
            id: 1,
            title:'企业分布式应用架构在云原生时代如何重塑？',
            tag: '分布式',
            time:'24  Jun, 2019',
            subarea: 'share',
            praisePoints: 166,
            isPraised: false,
            commentNum: 8,
            brief: `从十余年前的各种分布式系统研发到现在的容器云，从支撑原有业务到孵化各个新业务，企业的发展离不开统一的、与时俱进的技术架构。本篇文章从企业分布式应用架构层面介绍了云原生计算架构带来的变化，希望能够帮助更多企业的 IT 转型，利用云计算技术推动其成为...`
          },
          {
            id: 4,
            title:'企业分布式应用架构在云原生时代如何重塑？',
            tag: '分布式',
            time:'24  Jun, 2019',
            subarea: 'share',
            praisePoints: 166,
            isPraised: false,
            commentNum: 8,
            brief: `从十余年前的各种分布式系统研发到现在的容器云，从支撑原有业务到孵化各个新业务，企业的发展离不开统一的、与时俱进的技术架构。本篇文章从企业分布式应用架构层面介绍了云原生计算架构带来的变化，希望能够帮助更多企业的 IT 转型，利用云计算技术推动其成为...`
          },
          {
            id: 5,
            title:'这一团糟的代码，真的是我写的？！',
            tag: '代码优化',
            time:'28  Jun, 2019',
            subarea: 'share',
            praisePoints: 168,
            isPraised: true,
            commentNum: 6,
            brief: `你有没有遇到过这种情况：过几周或者几个月之后，再看到自己写的代码，感觉一团糟，不禁怀疑人生？我们每天都与代码打交道，但当被问道什么是好的代码时，很多人可能会先愣一下，然后给出的回答要么比较空泛，要么比较散，没办法简单明了地概括出来。今天，我们...`
          },
        ],
        newestList:[
          {
            id: 7,
            title:'企业分布式应用架构在云原生时代如何重塑？',
            time:'24  Jun, 2019',
            subarea: 'share',
            praisePoints: 166,
            isPraised: false,
          },
          {
            id: 8,
            title:'OceanBase如何获得TPC-C测试第一名？',
            time:'21  Jun, 2019',
            subarea: 'share',
            praisePoints: 95,
            isPraised: false,
          },
          {
            id: 9,
            title:'罗永浩：我不会买新款坚果手机',
            time:'28  Sep, 2019',
            subarea: 'share',
            praisePoints: 80,
            isPraised: true,
          },
          {
            id: 10,
            title:'又断电了，代码没保存',
            time:'24  Sep, 2019',
            subarea: 'share',
            praisePoints: 79,
            isPraised: true,
          },
          {
            id: 11,
            title:'如何实现一次编码，到处运行？',
            time:'24  Jun, 2019',
            subarea: 'share',
            praisePoints: 76,
            isPraised: false,
          },
          {
            id: 12,
            title:'如何打造EB级计算平台存储引擎？',
            time:'21  Jun, 2019',
            subarea: 'share',
            praisePoints: 65,
            isPraised: false,
          },
          {
            id: 120,
            title:'小面包真好吃',
            time:'21  Jun, 2019',
            subarea: 'share',
            praisePoints: 53,
            isPraised: false,
          },
        ],
      }
    },
    methods:{
      changePraise(id){
        let hasChanged = false
        this.articleList.forEach((item,index) => {
          if(item.id == id){
            if(!hasChanged){
              hasChanged = true
              if(item.isPraised){
                this.articleList[index].praisePoints--
              }else{
                this.articleList[index].praisePoints++
              }
            }
            this.articleList[index].isPraised = !item.isPraised
          }
        })
        this.newestList.forEach((item,index) => {
          if(item.id == id){
            if(!hasChanged){
              hasChanged = true
              if(item.isPraised){
                this.newestList[index].praisePoints--
              }else{
                this.newestList[index].praisePoints++
              }
            }
            this.newestList[index].isPraised = !item.isPraised
          }
        })
      },
    }
  }
</script>
<style scoped lang="less">
  .area{
    width: 100%;
  }
</style>
