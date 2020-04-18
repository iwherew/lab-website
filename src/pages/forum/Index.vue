<template>
  <div class="forum">
    <forum-nav/>
    <search/>
    <router-view/>
    <forum-footer/>
  </div>
</template>
<script>
  import forumNav from '../../components/forumNav'
  import search from './common/search'
  import forumFooter from './common/footer'
  export default {
    components: {forumNav,search,forumFooter}
  }
</script>
<style scoped lang="less">
  .forum{
    width: 100%;
  }
</style>
