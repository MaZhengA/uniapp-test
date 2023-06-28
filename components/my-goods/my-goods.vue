<template>
 <view class="goods-item">
   <view class="goods-item-left">
     <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioChangeHandler"></radio>
     <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
   </view>
   <view class="goods-item-right">
     <view class="goods-name">{{ goods.goods_name }}</view>
     <view class="goods-info-box">
       <view class="goods-price">¥ {{ goods.goods_price | tofixed }}</view>
       <uni-number-box :min="1" :value="goods.goods_count" @change="changeValue" v-if="showNum"></uni-number-box>
     </view>
   </view>
 </view>
</template>

<script>
  export default {
    name:"my-goods",
    props: {
      goods: {
        type: Object,
        default: {}
      },
      showRadio: {
        type: Boolean,
        default: false
      },
      showNum: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        defaultPic: 'http://image4.suning.cn/uimg/b2c/newcatentries/0000000000-000000000185518945_2_800x800.jpg'
      };
    },
    filters: {
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    },
    methods: {
      radioChangeHandler() {
        // goods来自props
        this.$emit('radio-change', {
          goods_id: this.goods.goods_id,
          goods_state: !this.goods.goods_state
        })
      },
      changeValue(value) {
        this.$emit('num-change', {
          goods_id: this.goods.goods_id,
          goods_count: value
        })
      },
    }
  }
</script>

<style lang="scss">
.goods-item {
  width: 750rpx;
  box-sizing: border-box;
  display: flex;
  padding: 10px 5px;
  border: 1px solid #dfdfdf;
}
.goods-item-left {
  margin-right: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.goods-pic {
  width: 140px;
  height: 100%;
}
.goods-item-right {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
}

.goods-name {
  font-size: 13px;
}
.goods-info-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .goods-price {
    font-size: 18px;
    color: red;
    width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>