<template>
  <!-- 个人主页文章列表 -->
  <div class="article-list-component flex-c">
    <div class="component-title">{{apiUrl.title}}</div>
    <div class="btn-group flex">
      <div class="black"></div>
      <div class="circle-group flex">
<!--        <div class="circle"-->
<!--             @mouseenter="changeActive($event)"-->
<!--             @mouseleave="removeActive($event)"-->
<!--             @click="goToNoticeEdit"-->
<!--             v-if="apiUrl.title == '部门消息'"-->
<!--        >-->
<!--          <div class="icon bg add"></div>-->
<!--        </div>-->

<!--        <div class="circle"-->
<!--             @mouseenter="changeActive($event)"-->
<!--             @mouseleave="removeActive($event)"-->
<!--             @click="changeShowSelect"-->
<!--             v-if="title == '部门消息'"-->
<!--        >-->
<!--          <div class="icon bg classify"></div>-->
<!--        </div>-->
<!--        <el-select-->
<!--          v-model="departmentSelected"-->
<!--          placeholder="筛选部门信息"-->
<!--          size="small"-->
<!--          v-show="showSelect"-->
<!--        >-->
<!--          <el-option-->
<!--            v-for="(item, index) in departmentList"-->
<!--            :key="index"-->
<!--            :label="item"-->
<!--            :value="item">-->
<!--          </el-option>-->
<!--        </el-select>-->

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
</template>
<script>
  export default {
    props: ['apiUrl'],
    data(){
      return{
        totalNum: 0,
        pageNum: 1,
        pageSize: 10,
        articleList:[],
        search:'',
        timeout:  null,
        showSearch: false
      }
    },
    watch:{
      apiUrl(a){
        this.getData()
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
        this.$api.get(this.apiUrl.queryApi,
          { 'page': this.pageNum},
          res => {
            if (res.status >= 200) {
              this.articleList = res.data.data
              this.pageNum = res.data.pageNum,
                this.pageSize = res.data.pageSize,
                this.totalNum = res.data.totalNum
            } else {
              console.log(res.message);
            }
          }
        )
      },
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
        this.$api.get(this.apiUrl.searchApi,
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
        let routeData = this.$router.resolve({ path: '/article/articleDetail' ,query:{articleType: this.apiUrl.type,id:id}})
        window.open(routeData.href, '_blank');
      },
      goToNoticeEdit(){
        this.$router.push('/article/articleEdit')
      }
    },
  }
</script>
<style scoped lang="less">
  .article-list-component{
    width: 580px;
    letter-spacing:0;
    align-items: center;
    .component-title{
      font-size: 20px;
      color: #003B90;
      font-weight: bold;
      border-bottom: 3px solid #F54785;
      padding-bottom: 10px;
      margin-bottom: 60px;
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
</style>
