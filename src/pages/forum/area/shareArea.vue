<template>
  <div class="area">
    <areas :articleList="articleList" :newestList="newestList"/>
  </div>
</template>
<script>
  import areas from './area'
  export default {
    components:{areas},
    data(){
      return{
        articleList:[],
        newestList:[]
      }
    },
    mounted(){
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
                if(item.title.indexOf('【内部论坛：分享区】') != -1){
                  articleList.push(item)
                }
              })
              this.newestList = [...articleList].sort(this.compare('datetime')).reverse()
              this.articleList = articleList
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
    }
  }
</script>
<style scoped lang="less">
  .area{
    width: 100%;
  }
</style>
