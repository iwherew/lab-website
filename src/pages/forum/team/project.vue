<template>
  <div class="project flex">
    <div></div>
    <div class="left-part">
      <div class="title flex">
        <div>项目状态</div>
        <el-button type="primary" plain size="small">提交状态</el-button>
      </div>
      <div class="block">
        <div class="radio">
          排序：
          <el-radio-group v-model="reverse">
            <el-radio :label="true">倒序</el-radio>
            <el-radio :label="false">正序</el-radio>
          </el-radio-group>
        </div>

        <el-timeline :reverse="reverse">
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.timestamp">
            {{activity.content}}
          </el-timeline-item>
        </el-timeline>
      </div>
      <div class="title flex">
        <div>项目更新</div>
        <el-button type="primary" plain size="small">提交更新</el-button>
      </div>
      <el-timeline>
        <el-timeline-item timestamp="2020/4/16" placement="top">
          <el-card>
            <h4>接口联调完成</h4>
            <p>王立龙 提交于 2020/4/16 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/4/15" placement="top">
          <el-card>
            <h4>文章详情页面开发完成</h4>
            <p>王立龙 提交于 2020/4/15 20:46</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/4/13" placement="top">
          <el-card>
            <h4>更新 Github 模板</h4>
            <p>王立龙 提交于 2020/4/13 20:46</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
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
    data() {
      return {
        reverse: true,
        activities: [{
          content: '通过验收',
          timestamp: '2020-04-29'
        }, {
          content: '通过审核',
          timestamp: '2020-04-13'
        }, {
          content: '提交审核',
          timestamp: '2020-04-11'
        }],
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
      };
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
    }
  }
</script>
<style scoped lang="less">
  .project{
    margin: 50px 0;
    justify-content: space-between;
    letter-spacing: 0;
    .left-part{
      .title{
        justify-content: space-between;
        align-items: center;
        width: 810px;
        font-size: 22px;
        font-weight: bold;
        color: #3B4348;
        padding-bottom: 10px;
        border-bottom: 1px solid #F2F2F2;
        margin-bottom: 20px;
      }
    }

  }
</style>
<style lang="less">
  .project{
    .radio{
      margin: 20px 0;
    }
  }
</style>
