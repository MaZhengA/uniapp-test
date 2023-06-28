<template>
  <view class="cart-container" v-if="cart.length !== 0">
    <!-- 收货地址组件 -->
    <view>
      <my-address></my-address>
    </view>
    <view class="cart-title">
      <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 循环渲染购物车商品信息 -->
    <uni-swipe-action>
      <block v-for="(goods, index) in cart" :key="index">
        <uni-swipe-action-item :right-options="options" @click="swiperItemClickHandler(goods)">
          <my-goods :goods="goods" :showRadio="true" @radio-change="radioChangeHandler" :showNum="true" @num-change="numChangeHandler"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <!-- 结算 -->
    <my-settle @all-checked="allChecked"></my-settle>
  </view>
  <!-- 空白购物车区域 -->
  <view class="empty-cart" v-else>
    <text>空空如也～</text>
  </view>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import badgeMix from '@/mixins/tabbar-badge.js';
  
  export default {
    mixins: [badgeMix],
    computed: {
      ...mapState('m_cart', ['cart'])
    },
    data() {
      return {
        options: [
          {
            text: '删除',
            style: {
              backgroundColor: '#C00000'
            }
          },
        ]
      }
    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById', 'updateAllGoodsState']),
      
      radioChangeHandler(e) {
        this.updateGoodsState(e)
      },
      
      numChangeHandler(e) {
        this.updateGoodsCount(e)
      },
      
      swiperItemClickHandler(goods) {
        this.removeGoodsById(goods.goods_id)
      },
      
      // 全选
      allChecked(checkState) {
        this.updateAllGoodsState(checkState)
      }
    }
  }
</script>

<style lang="scss">
.cart-container {
  padding-bottom: 50px;
}
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text {
    margin-left: 10px;
  }
}
.empty-cart {
  text-align: center;
  line-height: 555px;
}
</style>
