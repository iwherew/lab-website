<template>
  <div class="notice">
    <banner/>
    <article-lists :type="type"/>
  </div>
</template>
<script>
  import banner from '../../../components/banner'
  import articleLists from "../common/articleLists";
  import schoolImage from '../../../images/officialWebsite/notice/school.jpg'
  export default {
    components: {banner,articleLists},
    data(){
      return{
        type:{
          title: '通知公告',
          imageUrl: schoolImage,
          queryApi: '/api/announcesPage',
          queryIdApi: '/api/announcesId',
          insertApi: '/api/insertAnnounce',
          searchApi: '/api/searchAnnounce',
          updateApi: '/api/updateAnnounce',
          idName: "announceId",
          type: "announce",
        }
      }
    }
  }
</script>
<style scoped lang="less">
</style>
