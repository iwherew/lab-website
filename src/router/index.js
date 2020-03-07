import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css'
Vue.use(ElementUI);
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'home',
      component: resolve => require(['../pages/officialWebsite/Index'], resolve),
      children: [
        {
          path: 'home',
          meta: {title: '首页'},
          component: resolve => require(['../pages/officialWebsite/Home/Home'], resolve),
        }
        ]
    },
  ],
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
