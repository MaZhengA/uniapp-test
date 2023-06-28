<template>
  <view class="goods-detail-container">
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <swiper-item v-for="(item, index) in goods_info.pics" :key="index">
        <image :src="item.pics_big" @click="preview(i)"></image>
      </swiper-item>
    </swiper>
    <view class="goods-info-box" v-if="goods_info.goods_name">
      <view class="price">¥ {{ goods_info.goods_price }}</view>
      <view class="goods-info-body">
        <view class="goods-name">{{ goods_info.goods_name }}</view>
        <view class="collect">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <view class="yf">快递：免运费</view>
    </view>
    <!-- 渲染 html 结构 -->
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    <view class="goods_nav">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'
  
  export default {
    computed: {
      ...mapState('m_cart', []),
      ...mapGetters('m_cart', ['total'])
    },
    data() {
      return {
        goods_info: {},
        options: [
          {
            icon: 'shop',
            text: '店铺',
            // infoBackgroundColor:'#007aff',
            infoColor:"red"
          }, {
            icon: 'cart',
            text: '购物车',
            info: 0
          }
        ],
        buttonGroup: [
          {
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      };
    },
    watch: {
      // 调用 store 中 getters 的 tatal 方法
      // 页面首次加载时不会调用此方法，可以写成第二种形式
      // total(newVal) {
      //   const findResult = this.options.find(item => item.text === '购物车');
      //   if (findResult) {
      //     findResult.info = newVal
      //   }
      // }
      total: {
        handler(newVal) {
          const findResult = this.options.find(item => item.text === '购物车');
          if (findResult) {
            findResult.info = newVal
          }
        },
        immediate: true
      }
    },
    onLoad(options) {
      const goods_id = options.goods_id || '';
      this.getGoodsDetail(goods_id);
    },
    methods: {
      async getGoodsDetail(goods_id) {
        const { data: res } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id });
        if (res.meta.status !== 200) return;
        // 使用replace为img增加行内样式，从而去掉底部间隙，webp格式的图片格式不能显示解决
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img/g, ' <img style="display: block;" ').replace(/webp/g, 'jpg')
        this.goods_info = res.message;
      },
      preview(i) {
        uni.previewImage({
          current: i,
          urls: this.goods_info.pics.map(x => x.pics_big)
        })
      },
      onClick (e) {
        uni.showToast({
          title: `点击${e.content.text}`,
          icon: 'none'
        })
        if (e.content.text == '购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      buttonClick (e) {
        console.log(e)
        if (e.content.text === '加入购物车') {
          const goods = {
            goods_id: this.goods_info.goods_id, 
            goods_name: this.goods_info.goods_name, 
            goods_price: this.goods_info.goods_price, 
            goods_count: 1, 
            goods_small_logo: this.goods_info.goods_small_logo, 
            goods_state: true
          }
          
          this.addToCart(goods)
        }
      },
      // 引入 addToCart 方法
      ...mapMutations('m_cart', ['addToCart'])
    }
  }
</script>

<style lang="scss">
swiper {
  height: 750rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
.goods-info-box {
  padding: 10px;
  padding-right: 0;
}
.price {
  margin: 10px 0;
  font-size: 18px;
  color: #c00000;
}
.goods-info-body {
  display: flex;
  justify-content: space-between;
  .goods-name {
    margin-right: 10px;
    font-size: 13px;
  }
  .collect {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 120px;
    font-size: 12px;
    border: 1px solid #efefef;
    color: gray;
  }
}
.yf {
  margin: 10px 0;
  font-size: 12px;
  color: gray;
}
.goods_nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.goods-detail-container {
  padding-bottom: 50px;
}
</style>
