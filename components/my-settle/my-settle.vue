<template>
  <view class="my-settle-container">
    <label class="radio">
      <radio :checked="isFullCheck" color="#C00000" @click="radioChangeHandler"><text>全选</text></radio>
    </label>
    
    <view class="amount-box">
      合计<text class="amount">¥{{checkPrice}}</text>
    </view>
    
    <view class="btn-settle">
      结算({{checkCount}})
    </view>
  </view>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  export default {
    name:"my-settle",
    computed: {
      ...mapGetters('m_cart', ['checkCount', 'checkPrice', 'total']),
      isFullCheck() {
        return this.total === this.checkCount
      }
    },
    data() {
      return {
        
      };
    },
    methods: {
      radioChangeHandler() {
        this.$emit('all-checked', {
          checkState: !this.isFullCheck
        })
      }
    }
  }
</script>

<style lang="scss">
.my-settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 5px;
  font-size: 14px;
  background-color: white;
  .radio {
    
  }
  .amount-box {
    .amount {
      color: #c00000;
    }
  }
  .btn-settle {
    width: 100px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #c00000;
    color: white;
  }
}
</style>