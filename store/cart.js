// 购物车的 store 模块
export default {
  namespaced: true,
  
  state: () => ({
    // 每个商品的信息对象，都包含6个属性
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    // 从本地获取数据
    cart: JSON.parse(uni.getStorageSync('cart') || '[]'),
    
  }),
  
  // 模块的 mutations 方法
  mutations: {
    addToCart(state, goods) {
      // 根据提交的id，判断否已经存在与购物车，不存在是添加，存在时只添加数量
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id);
      if (!findResult) {
        state.cart.push(goods)
      } else {
        findResult.goods_count++ 
      }
      this.commit('m_cart/saveToStorage')
    },
    
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    
    updateGoodsState(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id);
      
      if (findResult) {
        findResult.goods_state = goods.goods_state;
        this.commit('m_cart/saveToStorage')
      }
    },
    
    updateGoodsCount(state, goods) {
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id);
      
      if (findResult) {
        findResult.goods_count = goods.goods_count;
        this.commit('m_cart/saveToStorage')
      }
    },
    
    removeGoodsById(state, goodsId) {
      state.cart = state.cart.filter(x => x.goods_id !== goodsId);
      this.commit('m_cart/saveToStorage')
    },
    
    updateAllGoodsState(state, checkState) {
      state.cart.forEach(x => x.goods_state = checkState.checkState);
      this.commit('m_cart/saveToStorage')
    }
  },
  
  getters: {
    total(state) {
      return state.cart.reduce((total, item) =>total += item.goods_count, 0)
    },
    
    checkCount(state) {
      // filter 过滤出勾选的商品
      // reduce 求和
      return state.cart.filter(state => state.goods_state).reduce((total, item) => total += item.goods_count, 0)
    },
    
    checkPrice(state) {
      return state.cart.filter(state => state.goods_state).reduce((total, item) => total += (item.goods_count * item.goods_price), 0)
    }
  }
}