<template>
  <div class="member">
    <banner/>
    <team/>
    <article-lists :type="achievement"/>
    <article-lists :type="awards" :flexDirection="'row-reverse'"/>
  </div>
</template>
<script>
  import banner from '../../../components/banner'
  import team from "./team";
  import articleLists from "../common/articleLists";
  import achievementImage from '../../../images/officialWebsite/member/achievement.jpg'
  import awardsImage from '../../../images/officialWebsite/member/awards.jpg'
  export default {
    components: {banner,team,articleLists},
    data(){
      return{
        achievement:{
          title: '研究成果',
          imageUrl: achievementImage,
          queryApi: '/api/achievementPage',
          queryIdApi: '/api/achievementId',
          insertApi: '/api/updateAchievement',
          searchApi: '/api/searchAchievement',
          updateApi: '/api/updateAchievement',
          type: "achievementId"
        },
        awards: {
          title: '荣誉奖项',
          imageUrl: awardsImage,
          queryApi: '/api/awardPage',
          queryIdApi: '/api/awardId',
          insertApi: '/api/insertAward',
          searchApi: '/api/searchAward',
          updateApi: '/api/updateAward',
          idName: "awardId",
          type: "award",
        }
      }
    }
  }
</script>
<style scoped lang="less">
</style>
