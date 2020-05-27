export default{
  SET_ACCOUNT (state, platform) {
    state.user = platform;
  },
  SET_USERINFO (state, platform) {
    state.userInfo = platform;
  },
}
