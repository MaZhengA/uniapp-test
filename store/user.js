export default {
  namespaced: true,
  
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}')
  }),
  
  mutations: {
    saveToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    
    updateAddress(state, address) {
      state.address = address;
      this.commit('m_user/saveToStorage');
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