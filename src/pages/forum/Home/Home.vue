<template>
  <div class="home">
    <div class="wrap flex">
      <article-list title="热门内容" :list="popularList"/>
      <article-list title="最新内容" :list="newestList"/>
      <div class="right-part flex-c">
        <create-team/>
        <quick-access/>
        <tag-group/>
      </div>
    </div>
  </div>
</template>
<script>
  import createTeam from './createTeam'
  import quickAccess from './quickAccess'
  import tagGroup from './tagGroup'
  import articleList from '../common/articleList'

  export default {
    components: {createTeam, quickAccess, tagGroup, articleList},
    data() {
      return {
        popularList:[],
        newestList:[]
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        this.$api.get('/api/awards',
          {},
          res => {
            if (res.status >= 200) {
              let articleList = []
              res.data.data.forEach(item => {
                if (item.title.indexOf('【内部论坛') != -1) {
                  articleList.push(item)
                }
              })
              this.newestList = [...articleList].sort(this.compare('datetime')).reverse()
              this.popularList = [...articleList].sort(this.compare('visitCount'))
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
      }
    }
  }
</script>
<style scoped lang="less">
  .home {
    width: 100%;

    .wrap {
      width: 100%;
      margin: 50px 0 100px;
      justify-content: space-around;
    }
  }
</style>
