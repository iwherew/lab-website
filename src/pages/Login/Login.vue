<template>
  <div class="wrap flex-c">
    <lab-nav/>
    <div class="login bg">
      <div class="black flex-c">
        <login-box/>
      </div>
    </div>
  </div>

</template>
<script>
  import labNav from "../../components/labNav";
  import loginBox from "./loginBox"
  export default {
    components: {labNav,loginBox},
  }
</script>
<style scoped lang="less">
  .wrap{
    width: 100%;
    height: 100vh;
  }
  .login{
    flex-grow: 1;
    width: 100%;
    background-image: url("../../images/login/login.jpg");
    .black{
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.6);
      justify-content: center;
      align-items: center;
    }
  }
</style>
