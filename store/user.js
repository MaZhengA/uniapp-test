export default {
  namespaced: true,
  
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    token: uni.getStorageSync('token') || '',
    // 用户信息对象
    userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
    // 重定向对象
    redirecInfo: null
  }),
  
  mutations: {
    saveToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    
    updateAddress(state, address) {
      state.address = address;
      this.commit('m_user/saveToStorage');
    },
    
    saveUserInfoToStorage(state) {
       uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
    },
    
    updateUserInfo(state, userinfo) {
      state.userinfo = userinfo;
      this.commit('m_user/saveUserInfoToStorage');
    },
    
    saveTokenToStorage(state) {
      uni.setStorageSync('token', state.token)
    },
    
    updateToken(state, token) {
      state.token = token;
      this.commit('m_user/saveTokenToStorage')
    },
    
    updateRedirecInfo(state, info) {
      state.redirecInfo = info;
    }
  },
  
  getters: {
    // 实现复用
    addStr(state) {
      if (!state.address.provinceName) return '';
      const { provinceName, cityName, countyName, detailInfo } = state.address;
      return provinceName + cityName + countyName + detailInfo
    }
  }
}