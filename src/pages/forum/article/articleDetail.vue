<template>
  <div class="article flex">
    <div></div>
    <div class="left">
      <div class="title-content flex one-line">
        <div :class="iconClass(article.title)"></div>
        <div class="title">{{article.title.slice(10)}}</div>
      </div>
      <div class="info flex">
        <div class="info-left flex">
          <div class="info-icon bg calendar"></div>
          <div class="time text">{{article.datetime}}</div>
          <div class="info-icon bg tag"></div>
          <div class="text">{{article.nickname}}</div>
          <div class="info-icon bg comment"></div>
          <div class="text">{{article.visitCount}}次查看</div>
        </div>
      </div>
      <div class="article-context" v-html="article.content"></div>
<!--      <div class="comment">-->
<!--        <div class="comment-title">评论</div>-->
<!--        <div class="comment-item"-->
<!--             v-for="(item, index) in article.comment"-->
<!--             :key="index"-->
<!--        >-->
<!--          <div class="user-info flex">-->
<!--            <div class="head-image bg" :style="{'backgroundImage':'url('+item.author.avatar+')'}"></div>-->
<!--            <div class="comment-info">-->
<!--              <div class="name">{{item.author.name}}</div>-->
<!--              <div class="time">{{item.author.time}}</div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="comment-context">{{item.context}}</div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="reply">-->
<!--        <div class="reply-title">发表回复</div>-->
<!--        <el-input-->
<!--          type="textarea"-->
<!--          :rows="3"-->
<!--          placeholder="请输入回复"-->
<!--          v-model="reply">-->
<!--        </el-input>-->
<!--        <div class="reply-btn flex">-->
<!--          <div></div>-->
<!--          <el-button type="primary">回复</el-button>-->
<!--        </div>-->

<!--      </div>-->
    </div>
    <div class="right">
<!--      <div class="author-content flex">-->
<!--        <div class="author-left flex-c">-->
<!--          <div class="author-name">{{article.author.name}}</div>-->
<!--          <div class="author-item">id: {{article.author.id}}</div>-->
<!--          <div class="author-item">{{article.author.position}}</div>-->
<!--          <div class="author-item">{{article.author.selfIntroduction}}</div>-->
<!--        </div>-->
<!--        <div class="author-img bg" :style="{'backgroundImage':'url('+article.author.avatar+')'}"></div>-->
<!--      </div>-->
      <tag-group/>
      <article-list title="最新内容" :list="newestList"/>
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
        article:{},
        newestList:[],
        reply:null,
      }
    },
    mounted(){
      this.getData()
      this.getNewestList()
    },
    methods:{
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
      getData(){
        this.$api.get('/api/awardId',
          {'id': this.$route.query.id},
          res => {
            if (res.status >= 200) {
              console.log(res.data)
              this.article = res.data
            } else {
              console.log(res.message);
            }
          }
        )
      },
      getNewestList(){
        this.$api.get('/api/awards',
          {},
          res => {
            if (res.status >= 200) {
              let articleList = []
              res.data.data.forEach(item => {
                if(item.title.indexOf('【内部论坛') != -1){
                  articleList.push(item)
                }
              })
              this.newestList = [...articleList].sort(this.compare('datetime')).reverse()
            } else {
              console.log(res.message);
            }
          }
        )
      },
      compare(property) {
        return (a, b)=> {
          let value1 = a[property];
          let value2 = b[property];
          return (value1 - value2)*(-1);
        }
      },
    },
  }
</script>
<style scoped lang="less">
  .article{
    padding-bottom: 50px;
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
