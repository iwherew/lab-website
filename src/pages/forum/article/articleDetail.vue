<template>
  <div class="article flex">
    <div></div>
    <div class="left">
      <div class="title-content flex one-line">
        <div :class="iconClass()"></div>
        <div class="title">{{article.title}}</div>
      </div>
      <div class="info flex">
        <div class="info-left flex">
          <div class="info-icon bg calendar"></div>
          <div class="time text">{{article.time}}</div>
          <div class="info-icon bg tag"></div>
          <div class="text">{{article.tag}}</div>
          <div class="info-icon bg comment"></div>
          <div class="text">{{article.commentNum}}条评论</div>
        </div>
        <div :class="['info-right','flex','praise',article.isPraised?'is-praised':'']" @click="changePraise(articleItem.id)">
          <div class="praise-icon bg"></div>
          <div class="praise-num">{{article.praisePoints}}</div>
        </div>
      </div>
      <div class="article-context" v-html="article.context"></div>
      <div class="comment">
        <div class="comment-title">评论</div>
        <div class="comment-item"
             v-for="(item, index) in article.comment"
             :key="index"
        >
          <div class="user-info flex">
            <div class="head-image bg" :style="{'backgroundImage':'url('+item.author.avatar+')'}"></div>
            <div class="comment-info">
              <div class="name">{{item.author.name}}</div>
              <div class="time">{{item.author.time}}</div>
            </div>
          </div>
          <div class="comment-context">{{item.context}}</div>
        </div>
      </div>
      <div class="reply">
        <div class="reply-title">发表回复</div>
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入回复"
          v-model="reply">
        </el-input>
        <div class="reply-btn flex">
          <div></div>
          <el-button type="primary">回复</el-button>
        </div>

      </div>
    </div>
    <div class="right">
      <div class="author-content flex">
        <div class="author-left flex-c">
          <div class="author-name">{{article.author.name}}</div>
          <div class="author-item">id: {{article.author.id}}</div>
          <div class="author-item">{{article.author.position}}</div>
          <div class="author-item">{{article.author.selfIntroduction}}</div>
        </div>
        <div class="author-img bg" :style="{'backgroundImage':'url('+article.author.avatar+')'}"></div>
      </div>
      <tag-group/>
      <article-list title="最新内容" :list="newestList" @changePraise="changePraise"/>
    </div>
    <div></div>
  </div>
</template>
<script>
  import tagGroup from '../Home/tagGroup'
  import articleList from '../common/articleList'
  import authorImg02 from '../../../images/userImg/userImage02.jpg'
  import authorImg03 from '../../../images/userImg/userImage03.jpg'
  import authorImg04 from '../../../images/userImg/userImage04.jpg'
  import authorImg05 from '../../../images/userImg/userImage05.jpg'
  export default {
    components:{tagGroup,articleList},
    data(){
      return{
        article:{
          id: 1,
          title:'企业分布式应用架构在云原生时代如何重塑？',
          time:'24  Jun, 2019',
          subarea: 'share',
          praisePoints: 166,
          isPraised: false,
          tag: `分布式`,
          commentNum: 4,
          context:`<p>现代软件架构的核心任务之一就是定义基础设施与应用的边界，合理切分复杂性，减少应用开发者需要面对的复杂性。换句话说，就是让开发者专注在核心价值创新上，而把一些问题交给更合适的人和系统来解决。<br><br>我们就从下面这张图开始，探究企业分布式应用架构演进背后的逻辑。<br><br><img src="https://img-blog.csdnimg.cn/20190830144908908.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mzk3MDg5MA==,size_16,color_FFFFFF,t_70" style="max-width:100%;"><br><br><h2><span style="font-weight: bold;">蜕变之痛 - SOA</span></h2><br>2004 年，IBM 建立 SOA 全球设计中心，我作为研发 TL 和架构师参与了一系列全球客户的 pilot 项目，帮助 Pepboys, Office Depot 等国际企业利用 SOA 优化企业内部和企业间的业务流程，提升业务敏捷性。<br><br>当时的大背景是：随着经济全球化逐渐深入，企业面对的竞争加剧，商业变革也开始提速。在大型企业内部的 IT 系统已经经过了数十年的演化。整个的技术体系变得异常复杂，并存着诸如主机系统上的 CISC/COBOL 交易应用，小型机 AS400 中的 RPG 业务系统，和 X86/Power 等分布式系统的 C/JEE/.Net 应用。<br><br>大量应用系统由三方供应商提供，一些系统甚至已经无人维护。而且随着业务迭代，一些新的业务系统被持续构建出来，由于缺乏合理的方法论指导，系统之间缺乏有机的链接，形成了若干的孤岛，持续加剧了 IT 架构的复杂性，无法支撑业务的发展诉求。这就仿佛各派高手为了帮助受伤的令狐冲，把异种真气输入体中，虽然短时间可以缓解伤势。可是多道真气无法融合，互相激荡，长时间下来会伤上加伤。<br><br>因此，企业 IT 所面临的首要挑战就是整合企业中大量竖桶型（silo-ed）的 IT 系统，支撑日益复杂的业务流程，进行高效的业务决策和支撑业务快速变化。在这种背景下，IBM 等公司提出了 SOA（面向服务的架构）理念，将应用系统抽象成一个个粗粒度的服务，构建松耦合服务架构，可以通过业务流程对服务进行灵活组合，提升企业 IT 资产复用，提高了系统的适应性、灵活性和扩展性，解决“信息孤岛”问题。<br><br>SOA 提出了一系列构建分布式系统的原则，这些思考直到今天也依然适用：<br><br>首先是，服务具备明确定义的标准化的接口。通过服务定义描述，将服务消费者（Service Consumer）和服务提供者 (Service Provider) 的实现进行解耦，并且服务应该采用 contract-first 而非 code-first 方式进行开发。服务间通信采用面向文档的消息而非特定语言 RPC 协议，一方面可以解决服务与实现语言的解耦，另一方面可以灵活选择同步或者异步的通信实现，提升系统可用性和可伸缩性；<br>\t服务应该是松耦合的，服务之间不应存在时间、空间、技术、团队上的依赖；<br>\t服务应该是无状态的，使得服务调用与会话上下文状态实现解耦；<br>\t服务应该是自治和自包含的，服务的实现是可以独立进行部署、版本控制、自我管理和恢复；<br>\t服务是可发现、可组合的。比如可以通过 Service Registry 进行服务发现，实现了服务消费者和服务提供者的动态绑定。业务流程中可以对来自不同系统的的业务服务进行编排组装。<br><br></p>`,
          author:{
            name: `Amadeus`,
            id: 233,
            position: `摸鱼组组长`,
            selfIntroduction: `这个人很懒，什么都没写`,
            avatar: authorImg02
          },
          comment:[
            {
              author:{
                name: `春风朝露`,
                id: 233,
                commentID:12313254,
                time: `25  Jun, 2019 at 1:18 pm`,
                avatar: authorImg03,
              },
              context: `Istio 提供了一系列高阶的服务治理能力，比如：服务发现和负载均衡，渐进式交付(灰度发布)，混沌注入与分析，全链路追踪，零信任网络安全等，可以供上层业务系统将其编排到自己的 IT 架构和发布系统之中。`,
              reply:[
                {
                  author:{
                    name: `我的老伙计`,
                    id: 234,
                    commentID:12313255,
                    time: `25  Jun, 2019 at 3:54 pm`,
                    avatar: authorImg04,
                  },
                  context:`诸君，有没有兴趣听我这个计算机肥肥讲讲最近在做研究时发现的一些有趣的东西。其中最为核心的内容是佛教哲学与强化学习。`
                },
                {
                  author:{
                    name: `不会吧不会吧`,
                    id: 236,
                    commentID:12313256,
                    time: `25  Jun, 2019 at 5:17 pm`,
                    avatar: authorImg05,
                  },
                  reply:{
                    author:{
                      name: `我的老伙计`,
                      id: 234,
                      commentID:12313255,
                      time: `25  Jun, 2019 at 3:54 pm`,
                      avatar: authorImg04,
                    },
                    context:`诸君，有没有兴趣听我这个计算机肥肥讲讲最近在做研究时发现的一些有趣的东西。其中最为核心的内容是佛教哲学与强化学习。`
                  },
                  context:`大师，仿生佛祖会超度电子烤全羊吗？`
                },
              ]
            },
            {
              author:{
                name: `不会吧不会吧`,
                id: 236,
                commentID:12313257,
                time: `25  Jun, 2019 at 6:45 pm`,
                avatar: authorImg05,
              },
              context:`微服务的核心思想便是应用功能拆分与解耦，降低业务系统实现复杂性。微服务强调将应用功能拆解为一组松耦合服务，每个服务遵守单一责任原则（Single Responsibility Principle）。微服务架构解决了传统单体式架构存在的几个固有问题：每个服务可以独立部署和交付，大大提升了业务敏捷性；每个服务可以独立横向扩展/收缩，应对互联网规模的挑战。`
            }
          ]
        },
        newestList:[
          {
            id: 7,
            title:'企业分布式应用架构在云原生时代如何重塑？',
            time:'24  Jun, 2019',
            subarea: 'ask',
            praisePoints: 166,
            isPraised: false,
          },
          {
            id: 8,
            title:'OceanBase如何获得TPC-C测试第一名？',
            time:'21  Jun, 2019',
            subarea: 'ask',
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
            subarea: 'chat',
            praisePoints: 79,
            isPraised: true,
          },
          {
            id: 11,
            title:'如何实现一次编码，到处运行？',
            time:'24  Jun, 2019',
            subarea: 'ask',
            praisePoints: 76,
            isPraised: false,
          },
          {
            id: 12,
            title:'如何打造EB级计算平台存储引擎？',
            time:'21  Jun, 2019',
            subarea: 'ask',
            praisePoints: 65,
            isPraised: false,
          },
          {
            id: 120,
            title:'小面包真好吃',
            time:'21  Jun, 2019',
            subarea: 'chat',
            praisePoints: 53,
            isPraised: false,
          },
        ],
        reply:null,
      }
    },
    methods:{
      iconClass(){
        return `content-icon bg `+ this.article.subarea
      },
      changePraise(id){
        let hasChanged = false
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
    },
  }
</script>
<style scoped lang="less">
  .article{
    letter-spacing: 0;
    justify-content: space-between;
    .left{
      width: 810px;
    }
    .content-icon{
      width: 35px;
      height: 35px;
      margin-left: 10px;
      margin-right: 30px;
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
    .title-content{
      align-items: center;
      margin-top: 35px;
      margin-bottom: 15px;
      .title{
        color: #3B4348;
        font-size: 28px;
        font-weight: bold;
      }
    }
    .info{
      width: 810px;
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
    .article-context{
      width: 810px;
      line-height: 30px;
      color: #3B4348;
    }
    .author-content{
      margin-top: 35px;
      width: 395px;
      height: 165px;
      box-sizing: border-box;
      background: #FEFBDC;
      border: 1px solid #E9E6C4;
      padding: 0 35px;
      justify-content: space-between;
      align-items: center;
      .author-left{
        width: 200px;
        height: 120px;
        justify-content: space-between;
        .author-name{
          font-size: 22px;
          font-weight: bold;
          color: #3B4348;
        }
        .author-item{
          font-size: 14px;
          color: #6F7579;
        }
      }
      .author-img{
        width: 120px;
        height: 120px;
        border-radius: 50%;
      }
    }
    .comment{
      .comment-title{
        font-size: 22px;
        font-weight: bold;
        color: #3B4348;
        margin-bottom: 30px;
      }
      .comment-item{
        margin-top: 20px;
        border-bottom: 1px solid #F2F2F2;
        .user-info{
          height: 80px;
          align-items: center;
          .head-image{
            width: 74px;
            height: 74px;
            border-radius: 50%;
            margin-right: 30px;
          }
          .comment-info{
            .name{
              font-size: 16px;
              color: #3B4348;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .time{
              font-size: 14px;
              color: #6F7579;
            }
          }
        }
        .comment-context{
          margin: 20px 0;
          font-size: 16px;
          color: #6F7579;
          line-height: 28px;
          text-indent: 32px;
        }
      }
    }
    .reply{
      margin-top: 30px;
      .reply-title{
        font-size: 22px;
        font-weight: bold;
        color: #3B4348;
        margin-bottom: 30px;
      }
      .reply-btn{
        margin: 20px 0 40px;
        width: 100%;
        justify-content: space-between;
      }
    }
  }
</style>
