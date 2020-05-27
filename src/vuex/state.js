import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import persistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const state = {
  user: {
    // sno: 16051430,
    // id: 233,
    // nickname: 'amadeus',
    // authorization: 'admin',
    // email: 'iwhere_w@126.com',
    // phone: '18767177777',
    // selfIntroduction: '这个人很懒',
  },
  userInfo:{},
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [persistedState()]
})
