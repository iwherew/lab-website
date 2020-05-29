<template>
  <div class="article-edit bg flex">
    <div class="wrap flex">
      <div class="content">
        <el-form ref="form" label-width="100px">
          <el-form-item label="分区：">
            <el-radio v-for="(item,index) in allDepartment" v-model="checkedDepartment" :label="item" :key="index">{{item}}</el-radio>
          </el-form-item>
          <el-form-item label="标题：">
            <el-input v-model="title" placeholder="请输入文章标题"></el-input>
          </el-form-item>
<!--          <el-form-item label="标签：">-->
<!--            <el-tag-->
<!--              :key="tag"-->
<!--              v-for="tag in context.dynamicTags"-->
<!--              closable-->
<!--              :disable-transitions="false"-->
<!--              @close="handleClose(tag)">-->
<!--              {{tag}}-->
<!--            </el-tag>-->
<!--            <el-input-->
<!--              class="input-new-tag"-->
<!--              v-if="inputVisible"-->
<!--              v-model="inputValue"-->
<!--              ref="saveTagInput"-->
<!--              size="small"-->
<!--              @keyup.enter.native="handleInputConfirm"-->
<!--              @blur="handleInputConfirm"-->
<!--            >-->
<!--            </el-input>-->
<!--            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新标签</el-button>-->
<!--          </el-form-item>-->
          <el-form-item label="内容：">
            <div class="white">
              <editor v-model="context" :isClear="isClear" @change="change"></editor>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="file">
        <el-button type="success" @click="save">保存文章</el-button>
<!--        <el-upload-->
<!--          class="upload-demo"-->
<!--          action="https://jsonplaceholder.typicode.com/posts/"-->
<!--          :on-preview="handlePreview"-->
<!--          :on-remove="handleRemove"-->
<!--          :before-remove="beforeRemove"-->
<!--          multiple-->
<!--          :file-list="context.fileList">-->
<!--          <el-button type="primary">点击上传文件</el-button>-->
<!--        </el-upload>-->
      </div>
    </div>
  </div>
</template>
<script>
  import Editor from "../../../components/wangeditor";

  export default {
    components: {Editor},
    prop:['contextProp'],
    data() {
      return {
        inputVisible: false,
        inputValue: '',
        isClear: false,
        title: null,
        context: null,
        allDepartment: [
          '提问区',
          '分享区',
          '闲聊区',
        ],
        checkedDepartment: '提问区',
      }
    },
    methods: {
      save(){
        this.$api.post('/api/insertAward',
          {
            "title": "【内部论坛："+ this.checkedDepartment +"】" +this.title,
            "content": this.context
          },
          res => {
            if (res.status >= 200) {
              this.$router.back()
            } else {
              console.log(res.message);
            }
          }
        )
      }
    },
  }
</script>
<style scoped lang="less">
  .article-edit {
    width: 100%;
    background-image: url("../../../images/officialWebsite/notice/background01.jpg");
    justify-content: center;
    letter-spacing: 0;

    .wrap {
      width: 1200px;
      padding: 80px 75px 120px;
      background: #F2F2F2;

      .content {
        width: 900px;
      }

      .white {
        background: #FFFFFF;
      }
    }

    .item {
      margin: 20px 0;
    }

    .file {
      margin-top: 170px;
      margin-left: 50px;
    }
  }
</style>
<style lang="less">
  .article-edit {
    .el-checkbox {
      background: #FFFFFF;
      margin-right: 10px;
      margin-bottom: 5px;
    }
    .el-upload-list__item{
      margin-top: 10px;
    }
    .el-button--success{
      margin-bottom: 30px;
    }
    .el-upload-list__item-name{
      width: 200px;
    }
    .el-tag + .el-tag {
      margin-left: 10px;
    }
    .button-new-tag {
      margin-left: 10px;
      height: 32px;
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .input-new-tag {
      width: 90px;
      margin-left: 10px;
      vertical-align: bottom;
    }
  }
</style>
