<template>
  <div class="create-team flex">
    <div></div>
    <div class="left-part">
      <div class="title">创建团队</div>
      <div class="subtitle">在这里可以创建你的团队并开始一个新的项目</div>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="团队名称：">
          <el-input v-model="form.teamName"></el-input>
        </el-form-item>
        <el-form-item label="团队描述：">
          <el-input v-model="form.teamDesc"></el-input>
        </el-form-item>
        <el-form-item label="团队成员：">
          <el-select
            v-model="value"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="项目名称：">
          <el-input v-model="form.projectName"></el-input>
        </el-form-item>
        <el-form-item label="项目名称：">
          <el-input v-model="form.projectDesc"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" plain @click="submit">创建团队</el-button>
        </el-form-item>
      </el-form>
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
        form:{
          teamName:'',
          teamDesc:'',
          projectName:'',
          projectDesc:'',

        },
        options: [],
        value: [],
        list: [],
        loading: false,
        states: ["Alabama", "Alaska", "Arizona",
          "Arkansas", "California", "Colorado",
          "Connecticut", "Delaware", "Florida",
          "Georgia", "Hawaii", "Idaho", "Illinois",
          "Indiana", "Iowa", "Kansas", "Kentucky",
          "Louisiana", "Maine", "Maryland",
          "Massachusetts", "Michigan", "Minnesota",
          "Mississippi", "Missouri", "Montana",
          "Nebraska", "Nevada", "New Hampshire",
          "New Jersey", "New Mexico", "New York",
          "North Carolina", "North Dakota", "Ohio",
          "Oklahoma", "Oregon", "Pennsylvania",
          "Rhode Island", "South Carolina",
          "South Dakota", "Tennessee", "Texas",
          "Utah", "Vermont", "Virginia",
          "Washington", "West Virginia", "Wisconsin",
          "Wyoming"],
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
    mounted() {
      this.list = this.states.map(item => {
        return { value: `value:${item}`, label: `${item}` };
      });
    },
    methods:{
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options = [];
        }
      },
      submit(){
        this.$message({
          message: '创建成功',
          type: 'success'
        });
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
    }
  }
</script>
<style scoped lang="less">
  .create-team{
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
    }
  }
</style>
