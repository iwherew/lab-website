import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  user: {
    sno: 16051430,
    nickname: '不也挺好的嘛',
    // 其他网站图片跨域403
    imageUrl: '',
    authorization: 'admin'
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
})
