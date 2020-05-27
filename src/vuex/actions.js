export default{
  setAccount ({commit}, platform) {
    commit('SET_ACCOUNT', platform);
  },
  setUserInfo ({commit}, platform) {
    commit('SET_USERINFO', platform);
  },
}
