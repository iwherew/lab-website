import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/state'
Vue.config.productionTip = false
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import Api from './axios/index.js';
Vue.prototype.$api = Api;
/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})



router.afterEach((to, from) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
})
