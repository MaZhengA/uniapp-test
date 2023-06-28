<template>
  <view>
    <!-- 选择收货地址 -->
    <view class="address-choose-boox" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" class="btn-choose-address" @click="chooseAddress">请选择收货地址+</button>
    </view>
    <!-- 收货地址信息 -->
    <view class="address-info-box" v-else @click="chooseAddress">
      <view class="row1">
        <view class="row1-left">
          <view class="username">收货人：<text>{{address.userName}}</text></view>
        </view>
        <view class="row1-right">
          <view class="phone">电话：<text>{{address.telNumber}}</text></view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收货地址：</view>
        <view class="row2-right">{{addStr}}</view>
      </view>
    </view>
    <!-- 底部横线 -->
    <image src="/static/cart_border@2x.png" class="address-border"></image>
  </view>
</template>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex';
  export default {
    name:"my-address",
    data() {
      return {
        // address: {}
      };
    },
    computed: {
      ...mapState('m_user', ['address']),
      ...mapGetters('m_user', ['addStr'])
    },
    methods: {
      ...mapMutations('m_user',['updateAddress']),
      async chooseAddress() {
        // 选择收货地址
        const [err, succ] = await uni.chooseAddress().catch((error) => error);
        
        if (err == null && succ.errMsg === "chooseAddress:ok") {
          this.updateAddress(succ)
        }
        
      }
    }
  }
</script>

<style lang="scss">
.address-border {
  display: block;
  width: 100%;
  height: 5px;
}
.address-choose-boox {
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
}
// .btn-choose-address {
  
// }
.address-info-box {
  margin: 10px 4px;
}
.row1 {
  display: flex;
  justify-content: space-between;
  .row1-left {
    
  }
  .row1-right {
    display: flex;
    justify-content: space-between;
  }
}
.row2 {
  margin-top: 10px;
  display: flex;
  align-items: center;
  .row2-left {
    white-space: nowrap
  }
  .row2-right {

  }
}
</style>