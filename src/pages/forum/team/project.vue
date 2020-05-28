<template>
  <div class="project flex">
    <div></div>
    <div class="left-part">
      <div class="title flex">
        <div>项目状态</div>
        <el-button :type=buttonType size="small" @click="refreshState">{{stateTimeline[stateTimeline.length-1]}}</el-button>
      </div>
      <div class="block">

        <el-timeline>
          <el-timeline-item
            v-for="(item, index) in stateTimeline"
            :key="index">
            {{item}}
          </el-timeline-item>
        </el-timeline>
      </div>
      <div class="title flex">
        <div>项目更新</div>
        <el-button type="primary" plain size="small" @click="showDialog">提交更新</el-button>
      </div>
      <el-timeline>
        <el-timeline-item :timestamp="item.update" placement="top" v-for="(item, index) in record" :key="index">
          <el-card>
            <h4>{{item.pcontent}}</h4>
            <p>{{item.username}} 提交于 {{item.update}}</p>
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
    <el-dialog
      title='提交更新内容'
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form ref="form" label-width="80px">
        <el-form-item label="更新内容">
          <el-input v-model="update" placeholder="请输入更新内容"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import quickAccess from '../Home/quickAccess'
  import tagGroup from '../Home/tagGroup'
  import articleList from '../common/articleList'
  import {getCurrentDate} from '../../../utils/func'
  export default {
    components:{quickAccess,tagGroup,articleList},
    data() {
      return {
        state: {},
        activities: [
          {
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
        dialogVisible: false,
        update:null,
        record: [],
      };
    },
    computed:{
      stateTimeline(){
        let list = []
        switch (this.state.status) {
          case "待审核":
            list = ['待审核']
            break
          case "已拒绝":
            list = ['待审核','已拒绝']
            break
          case "已通过":
            list = ['待审核','已通过']
            break
          case "验收完成":
            list = ['待审核','已通过','验收完成']
            break
        }
        return list
      },
      buttonType(){
        switch (this.stateTimeline[this.stateTimeline.length-1]) {
          case "待审核":
            return 'warning'
            break
          case "已拒绝":
            return 'danger'
            break
          case "已通过":
            return 'success'
            break
          case "验收完成":
            return 'primary'
            break
        }
      }
    },
    mounted(){
      this.getData()
    },
    methods:{
      getData(){
        this.$api.get( '/api/projects',
          {},
          res => {
            if (res.status >= 200) {
              res.data.data.forEach(item => {
                if(item.id == this.$route.query.id){
                  this.state = item
                  // 对比项目成员名单
                  if(item.number.indexOf(this.$store.state.userInfo.account+'、') == -1){
                    this.$message.error('不在项目名单中，禁止访问')
                    this.$router.push('/forum/myTeam')
                  }
                }
              })
              this.getRecord()
            } else {
              console.log(res.message);
            }
          }
        )
      },
      getRecord(){
        this.$api.get( '/api/pmark/selectByproname',
          {
            'page' : 1,
            'proname' : this.state.content,
          },
          res => {
            if (res.status >= 200) {
              this.record = res.data.data.reverse()
            } else {
              console.log(res.message);
            }
          }
        )
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
      showDialog(){
        this.update = null
        this.dialogVisible = true
      },
      confirm(){
        this.$api.post( '/api/pmark/add',
          {
            "pcontent": this.update,
            "pname": this.state.content,
            "update": this.getCurrentDate(),
            "userid": this.$store.state.user.userId,
            "username": this.$store.state.userInfo.account
          },
          res => {
            if (res.status >= 200) {
              this.dialogVisible = false
              this.getData()
            } else {
              console.log(res.message);
            }
          }
        )
      },
      refreshState(){
        this.getData()
        this.$message.success('已刷新');
      },
      getCurrentDate,
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
