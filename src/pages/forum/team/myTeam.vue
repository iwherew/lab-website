<template>
  <div class="my-team flex">
    <div></div>
    <div class="left-part">
      <div class="title">我的团队</div>
      <div class="subtitle">在这里查看你参与的团队</div>
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item v-for="(item, index) in teamList" :key="index" name="1">
          <template slot="title">
            <div class="collapse-title">{{item.teamName}}</div>
          </template>
          <div>{{item.teamDesc}}</div>
          <div>组员： <span v-for="(member, memberIndex) in item.teamMember" :key="memberIndex"> {{member.name}}、</span></div>
          <div class="project-item" v-for="(project, projectIndex) in item.projectList" :key="projectIndex">
            <div class="projectName">项目： {{project.projectName}}</div>
            <div>描述： {{project.projectDesc}}</div>
            <el-button type="primary" size="small" @click="goToDetail(project.projectID)">进入项目</el-button>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="right-part">
      <quick-access/>
      <tag-group/>
      <article-list title="最新内容" :list="newestList" @changePraise="changePraise"/>
    </div>
    <div></div>
  </div>
</template>
<script>
  import quickAccess from '../Home/quickAccess'
  import tagGroup from '../Home/tagGroup'
  import articleList from '../common/articleList'
  export default {
    components:{quickAccess,tagGroup,articleList},
    data(){
      return{
        activeNames: ['1'],
        teamList:[
          {
            teamID: 2,
            teamName:'初级组',
            teamDesc:'刚开始学的一些小东西',
            teamMember:[
              {
                id: 11,
                name:'Amadeus'
              },
              {
                id: 12,
                name:'莫扎特'
              },
              {
                id: 14,
                name:'还行的昵称'
              }
            ],
            projectList:[
              {
                projectID: 456,
                projectName:'实验室管理系统',
                projectDesc:'一个实验室项目',
              },
              {
                projectID: 457,
                projectName:'爬虫实现',
                projectDesc:'爬取IP地址',
              },
            ],

          },
          {
            teamID: 4,
            teamName:'兴趣组',
            teamDesc:'找一些感兴趣的东西做',
            teamMember:[
              {
                id: 11,
                name:'Amadeus'
              },
              {
                id: 12,
                name:'莫扎特'
              },
              {
                id: 16,
                name:'Dio'
              }
            ],
            projectList:[
              {
                projectID: 458,
                projectName:'天池幸福感预测',
                projectDesc:'预测幸福感指数',
              },
              {
                projectID: 459,
                projectName:'自动化测试',
                projectDesc:'运用TestNG运行自动化测试脚本',
              },
            ],

          },
        ],
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
      }
    },
    methods:{
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
      goToDetail(id){
        let routeData = this.$router.resolve({ path: '/forum/project' ,query:{id:id}});
        window.open(routeData.href, '_blank');
      },
    }
  }
</script>
<style scoped lang="less">
  .my-team{
    margin: 50px 0;
    justify-content: space-between;
    letter-spacing: 0;
    .left-part{
      .title{
        width: 810px;
        font-size: 22px;
        font-weight: bold;
        color: #3B4348;
        padding-bottom: 10px;
        border-bottom: 1px solid #F2F2F2;
      }
      .subtitle{
        font-size: 14px;
        color: #6F7579;
        margin: 15px 0 30px;
      }
      .collapse-title{
        font-size: 18px;
        font-weight: bold;
      }
      .projectName{
        font-size: 16px;
        font-weight: bold;
        margin-top: 20px;
      }
    }
  }
</style>
