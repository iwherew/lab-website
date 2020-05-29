<template>
  <!-- 门户网站文章列表 -->
  <div class="wrap flex-c notice-lists bg">
    <div class="header">{{type.title}}</div>
    <div class="content flex" :style="{'flexDirection':flexDirection}">
      <div class="content-left bg" :style="{'backgroundImage':'url('+type.imageUrl+')'}"></div>
      <div class="content-right flex-c">
        <div class="btn-group flex">
          <div class="black"></div>
          <div class="circle-group flex" >
            <div class="circle"
                 @mouseenter="changeActive($event)"
                 @mouseleave="removeActive($event)"
                 @click="goToNoticeEdit"
                 v-if="$store.state.user && $store.state.user.role[0] != 'student'"
            >
              <div class="icon bg add"></div>
            </div>

<!--            <div class="circle"-->
<!--                 @mouseenter="changeActive($event)"-->
<!--                 @mouseleave="removeActive($event)"-->
<!--                 @click="changeShowSelect"-->
<!--            >-->
<!--              <div class="icon bg classify"></div>-->
<!--            </div>-->
<!--            <el-select-->
<!--              v-model="departmentSelected"-->
<!--              placeholder="筛选部门信息"-->
<!--              size="small"-->
<!--              v-show="showSelect"-->
<!--            >-->
<!--              <el-option-->
<!--                v-for="(item, index) in departmentList"-->
<!--                :key="index"-->
<!--                :label="item"-->
<!--                :value="item">-->
<!--              </el-option>-->
<!--            </el-select>-->
            <div class="circle"
                 @mouseenter="changeActive($event)"
                 @mouseleave="removeActive($event)"
                 @click="changeSearch"
            >
              <div class="icon bg search"></div>
            </div>
            <el-autocomplete
              v-show="showSearch"
              v-model="search"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入搜索内容"
              @select="handleSelect"
              size="small"
            ></el-autocomplete>
          </div>

        </div>
        <div class="notice-group flex-c">
          <div class="notice-item flex"
               v-for="(item, index) in articleList"
               :key="index"
               @mouseenter="changeActive($event)"
               @mouseleave="removeActive($event)"
               @click="goToDetail(item.id)"
          >
            <div class="square"></div>
            <div class="title one-line">{{item.title}}</div>
            <div class="time">{{item.upDate || item.datetime}}</div>
          </div>
        </div>
        <el-pagination
          background
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          layout="prev, pager, next, total, jumper"
          :total="totalNum"
          :current-page="pageNum"
          :page-size="pageSize"
          :page-sizes="[10, 20, 30, 100]">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import schoolImage from '../../../images/officialWebsite/notice/school.jpg'
  export default {
    props:{
      type: {
        type: Object,
        default: ()=>{
          return{
            title: '通知公告',
            imageUrl: schoolImage,
            queryApi: '/api/announcesPage',
            insertApi: '/api/insertAnnounce',
            searchApi: '/api/searchAnnounce',
            updateApi: '/api/updateAnnounce',
            idName: "announceId"
          }
        },
      },
      flexDirection:{
        type: String,
        default:'row'
      }
    },
    data(){
      return{
        totalNum: 0,
        pageNum: 1,
        pageSize: 10,
        articleList:[
          {
            id: 118,
            title: '学术报告：THz for Smart and Safe Future: a special focus on Towards Tbit THz wireless communications',
            time: 1581178630478
          },
          {
            id: 117,
            title: '讲座：脑机接口在康复与辅助系统中的应用',
            time: 1581005604000
          },
          {
            id: 116,
            title: '学术讲座：统计方法前沿研究',
            time: 1581005604000
          },
          {
            id: 115,
            title: '院士讲座：创新是科学的灵魂',
            time: 1580919204000
          },
          {
            id: 114,
            title: '高雅艺术进校园——中国爱乐乐团来校演出',
            time: 1580919204000
          },
          {
            id: 113,
            title: '学术交流与科研评价的现状与挑战',
            time: 1580919204000
          },
          {
            id: 112,
            title: '召开新时代网络意识形态安全与高校思想政治教育学术研讨会',
            time: 1580832804000
          },
          {
            id: 111,
            title: '新冠病毒潜在中间宿主或为穿山甲',
            time: 1580832804000
          },
        ],
        departmentList:[
          '全部',
          '语音识别部',
          '图像处理部',
          '统计分析部',
          '算法部',
        ],
        departmentSelected: '',
        showSelect: false,
        search:'',
        timeout:  null,
        showSearch: false,
      }
    },
    mounted() {
      this.getData()
    },
    methods:{
      getData(refresh){
        if(refresh){
          this.pageNum = 1
        }
        this.$api.get(this.type.queryApi,
          { 'page': this.pageNum},
          res => {
            if (res.status >= 200) {
              let articleList = []
              res.data.data.forEach(item => {
                if(item.title.indexOf('【内部论坛') == -1){
                  articleList.push(item)
                }
              })
              this.articleList = articleList
              this.pageNum = res.data.pageNum,
                this.pageSize = res.data.pageSize,
                this.totalNum = res.data.totalNum
            } else {
              console.log(res.message);
            }
          }
        )
      },
      // 分页导航
      handleCurrentChange(val) {
        this.pageNum = val;
        this.getData();
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getData();
      },
      changeActive($event) {
        $event.currentTarget.classList.add('active');
      },
      removeActive($event) {
        $event.currentTarget.classList.remove('active');
      },
      changeShowSelect(){
        this.showSelect = !this.showSelect
      },
      changeSearch(){
        this.showSearch = !this.showSearch
      },
      handleSelect(item) {
        this.goToDetail(item.id);
      },
      querySearchAsync(queryString, cb){
        this.$api.get(this.type.searchApi,
          { 'search': queryString,
            'page': 1
          },
          res => {
            if (res.status >= 200) {
              for (let i of res.data.data) {
                i.value = i.title;  //将想要展示的数据作为value
              }
              cb(res.data.data)
            } else {
              console.log(res.message);
            }
          }
        )
      },
      goToDetail(id){
        let routeData = this.$router.resolve({ path: '/article/articleDetail' ,query:{articleType: this.type.type,id:id}})
        window.open(routeData.href, '_blank');
      },
      goToNoticeEdit(){
        this.$router.push({ path: '/article/articleEdit' ,query:{type:'add',articleType: this.type.type}})
      }
    },
  }
</script>
<style scoped lang="less">
  .wrap{
    width: 100%;
    padding: 70px 0;
    align-items: center;
    background-image: url("../../../images/officialWebsite/notice/background01.jpg");
    .header{
      font-size: 30px;
      color: #003B90;
      font-weight: bold;
      border-bottom: 5px solid #F54785;
      padding-bottom: 20px;
      margin-bottom: 85px;
    }
    .content{
      width: 1300px;
      justify-content: space-around;
      .content-left{
        width: 555px;
        height: 430px;
        border-radius: 20px;
      }
      .content-right{
        width: 600px;
        letter-spacing:0;
      }
      .btn-group{
        margin-top: -45px;
        margin-bottom: 15px;
        width: 100%;
        justify-content: space-between;
        .circle-group{
        }
      }
      .circle{
        width: 30px;
        height: 30px;
        border: 1px solid #BBBBBB;
        border-radius: 50%;
        background: #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
        margin-right: 5px;
        .icon{
          width: 18px;
          height: 18px;
          &.add{
            background-image: url("../../../images/officialWebsite/notice/add.png");
          }
          &.classify{
            background-image: url("../../../images/officialWebsite/notice/classify.png");
          }
          &.search{
            background-image: url("../../../images/officialWebsite/notice/search.png");
          }

        }
        &.active{
          border: 1px solid #F54785;
          .add{
            background-image: url("../../../images/officialWebsite/notice/add-acitve.png");
          }
          .classify{
            background-image: url("../../../images/officialWebsite/notice/classify-active.png");
          }
          .search{
            background-image: url("../../../images/officialWebsite/notice/search-active.png");
          }
        }
      }
      .notice-group{
        height: 420px;
        width: 100%;
        margin-bottom: 30px;
        .notice-item{
          height: 45px;
          width: 100%;
          margin: 3px 0;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;
          .square{
            height: 15px;
            width: 15px;
            background: #00D2D4;
          }
          .title{
            width: 350px;
            font-size: 16px;
            color: #101010;
          }
          .time{
            font-size: 16px;
            color: #101010;
          }
          &.active{
            background: #ECECEC;
            .square{
              background: #F54785;
            }
            .title, .time{
              font-weight: bold;
            }
          }
        }
      }
    }
  }
</style>
<style lang="less">
  .notice-lists{
    .el-pagination.is-background .el-pager li{
      background-color: #FFFFFF;
    }
  }
</style>
