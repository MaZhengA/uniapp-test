<template>
 <view class="goods-item">
   <view class="goods-item-left">
     <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
   </view>
   <view class="goods-item-right">
     <view class="goods-name">{{ goods.goods_name }}</view>
     <view class="goods-info-box">
       <view class="goods-price">¥ {{ goods.goods_price | tofixed }}</view>
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
    }
  }
</script>

<style lang="scss">
.goods-item {
  display: flex;
  padding: 10px;
  height: 100px;
  border: 1px solid #dfdfdf;
}
.goods-pic {
  width: 140px;
  height: 100%;
}
.goods-item-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 10px;
}
.goods-info-box {
  font-size: 20px;
  color: red;
}
</style>