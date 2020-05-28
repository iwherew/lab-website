import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css'
Vue.use(ElementUI);
Vue.use(Router)
import store from '../vuex/state'

let router = new Router({
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
        },
        {
          path: 'notice',
          meta: {title: '通知公告'},
          component: resolve => require(['../pages/officialWebsite/Notice/Notice'], resolve),
        },
        {
          path: 'article',
          component: resolve => require(['../pages/officialWebsite/article/article'], resolve),
          children: [
            {
              path: 'articleDetail',
              name: 'articleDetail',
              meta: {title: '文章详情'},
              component: resolve => require(['../pages/officialWebsite/article/articleDetail'], resolve),
            },
            {
              path: 'articleEdit',
              name: 'articleEdit',
              meta: {title: '文章编辑', requireLogin : true},
              component: resolve => require(['../pages/officialWebsite/article/articleEdit'], resolve),
            },
          ]
        },
        {
          path: 'department',
          meta: {title: '部门介绍'},
          component: resolve => require(['../pages/officialWebsite/Department/department'], resolve),
        },
        {
          path: 'member',
          meta: {title: '成员介绍'},
          component: resolve => require(['../pages/officialWebsite/Member/member'], resolve),
        },
        {
          path: 'recruitment',
          meta: {title: '招生信息'},
          component: resolve => require(['../pages/officialWebsite/Recruitment/recruitment'], resolve),
        },
        {
          path: 'personalPage/:part',
          meta: {title: '个人主页',requireLogin : true},
          component: resolve => require(['../pages/officialWebsite/PersonalPage/PersonalPage'], resolve),
        },
      ],
    },
    {
      path: '/login',
      meta: {title: '登录'},
      component: resolve => require(['../pages/Login/Login'], resolve),
    },
    {
      path: '/forum',
      redirect: '/forum/home',
      meta: {title: '内部论坛', requireLogin : true},
      component: resolve => require(['../pages/forum/Index'], resolve),
      children:[
        {
          path: 'home',
          meta: {title: '内部论坛', requireLogin : true},
          component: resolve => require(['../pages/forum/Home/Home'], resolve),
        },
        {
          path: 'mixed',
          meta: {title: '综合区', requireLogin : true},
          component: resolve => require(['../pages/forum/area/mixedArea'], resolve),
        },
        {
          path: 'askArea',
          meta: {title: '提问区', requireLogin : true},
          component: resolve => require(['../pages/forum/area/askArea'], resolve),
        },
        {
          path: 'shareArea',
          meta: {title: '分享区', requireLogin : true},
          component: resolve => require(['../pages/forum/area/shareArea'], resolve),
        },
        {
          path: 'chatArea',
          meta: {title: '闲聊区', requireLogin : true},
          component: resolve => require(['../pages/forum/area/chatArea'], resolve),
        },
        {
          path: 'articleEdit',
          meta: {title: '文章编辑', requireLogin : true},
          component: resolve => require(['../pages/forum/article/articleEdit'], resolve),
        },
        {
          path: 'articleDetail',
          meta: {title: '文章详情', requireLogin : true},
          component: resolve => require(['../pages/forum/article/articleDetail'], resolve),
        },
        {
          path: 'createTeam',
          meta: {title: '创建团队', requireLogin : true},
          component: resolve => require(['../pages/forum/team/CreateTeam'], resolve),
        },
        {
          path: 'myTeam',
          meta: {title: '我的团队', requireLogin : true},
          component: resolve => require(['../pages/forum/team/myTeam'], resolve),
        },
        {
          path: 'project',
          meta: {title: '项目详情', requireLogin : true},
          component: resolve => require(['../pages/forum/team/project'], resolve),
        },
      ]
    },
    {
      path: '/management',
      redirect: '/management/user',
      meta: {title: '管理系统', requireLogin : true},
      component: resolve => require(['../pages/management/index'], resolve),
      children: [
        {
          path: 'user',
          meta: {title: '原始帐号', requireLogin : true},
          component: resolve => require(['../pages/management/user'], resolve),
        },
        {
          path: 'job',
          meta: {title: '招聘信息', requireLogin : true},
          component: resolve => require(['../pages/management/job'], resolve),
        },
        {
          path: 'department',
          meta: {title: '部门管理', requireLogin : true},
          component: resolve => require(['../pages/management/department'], resolve),
        },
        {
          path: 'apply',
          meta: {title: '入部申请', requireLogin : true},
          component: resolve => require(['../pages/management/apply'], resolve),
        },
        {
          path: 'member',
          meta: {title: '成员管理', requireLogin : true},
          component: resolve => require(['../pages/management/member'], resolve),
        },
        {
          path: 'achievement',
          meta: {title: '研究成果', requireLogin : true},
          component: resolve => require(['../pages/management/achievement'], resolve),
        },
        {
          path: 'announce',
          meta: {title: '通知公告', requireLogin : true},
          component: resolve => require(['../pages/management/announce'], resolve),
        },
        {
          path: 'project',
          meta: {title: '项目管理', requireLogin : true},
          component: resolve => require(['../pages/management/project'], resolve),
        },
      ]
    }
  ],
})

// 解决相同路径不能跳转的问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to, from, next) => {
  if(to.meta.requireLogin){
    let isLogin = store.state.user && store.state.user.userId;
    isLogin = Boolean(isLogin);
    if(isLogin){
      next();
    }else{
      next("/login");
    }
  }else{
    next();
  }
})

export default router
