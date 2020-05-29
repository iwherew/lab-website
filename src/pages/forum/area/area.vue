<template>
  <div class="area flex">
    <div></div>
    <div class="article-list">
      <article-brief
        v-for="(item, index) in articleList"
        :key="index"
        :articleItem="item"
      />
    </div>
    <div class="right">
      <quick-access/>
      <tag-group/>
      <article-list title="最新内容" :list="newestList"/>
    </div>
    <div></div>
  </div>
</template>
<script>
  import articleBrief from './articleBrief'
  import quickAccess from '../Home/quickAccess'
  import tagGroup from '../Home/tagGroup'
  import articleList from '../common/articleList'

  export default {
    components: {articleBrief, quickAccess, tagGroup, articleList},
    props: ['articleList', 'newestList'],
    methods: {
    }
  }
</script>
<style scoped lang="less">
  .area {
    width: 100%;
    letter-spacing: 0;
    justify-content: space-between;
    padding-bottom: 100px;
  }
</style>
