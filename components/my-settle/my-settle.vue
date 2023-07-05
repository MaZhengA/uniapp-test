<template>
  <view class="my-settle-container">
    <label class="radio">
      <radio :checked="isFullCheck" color="#C00000" @click="radioChangeHandler"><text>全选</text></radio>
    </label>
    
    <view class="amount-box">
      合计<text class="amount">¥{{checkPrice}}</text>
    </view>
    
    <view class="btn-settle" @click="settlement">
      结算({{checkCount}})
    </view>
  </view>
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex';
  export default {
    name:"my-settle",
    computed: {
      ...mapGetters('m_cart', ['checkCount', 'checkPrice', 'total']),
      ...mapGetters('m_user', ['addStr']),
      ...mapState('m_user', ['token']),
      ...mapState('m_cart', ['cart']),
      isFullCheck() {
        return this.total === this.checkCount
      }
    },
    data() {
      return {
        second: 3,
        timer: null
      };
    },
    methods: {
      ...mapMutations('m_user', ['updateRedirecInfo']),
      radioChangeHandler() {
        this.$emit('all-checked', {
          checkState: !this.isFullCheck
        })
      },
      
      showTips(n) {
        uni.showToast({
          icon: 'none',
          title: '请登陆后再结算！' + n + '秒后自动跳转到登陆页',
          mask: true,
          duration: 1500
        })
      },
      
      // 延迟导航到 my 页面
      delayNavigate() {
        this.second = 3;
        
        this.showTips(this.second);
        
        this.timer = setInterval(() => {
          this.second--;
         
          if (this.second <=0) {
            clearInterval(this.timer);
            uni.hideModel
            uni.switchTab({
              url: '/pages/my/my',
              success: () => {
                this.updateRedirecInfo({
                  openType: 'switchTab',
                  from: '/pages/cart/cart'
                })
              }
            })
            return;
          }
          this.showTips(this.second);
        }, 1000)
      },
      
      settlement() {
        if (!this.checkCount) return uni.$showMsg('请选择商品');
        
        if (!this.addStr) return uni.$showMsg('请选择收货地址');
        
        // if (!this.token) return uni.$showMsg('请先登录')
        if (!this.token) return this.delayNavigate();
        // 微信支付功能
        this.payOrder()
      },
      
      async payOrder() {
        const orderInfo = {
          order_price: 0.01, // this.checkPrice
          consignee_addr: this.addStr,
          goods: this.cart.filter(x => x.goods_state).map(x => ({
            goods_id: x.goods_id,
            goods_number: x.goods_count,
            goods_price: x.goods_price
          }))
        };
         // 得到订单编号
        const { data: res } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo);
        
        if (res.meta.status !== 200) return uni.$showMsg('创建订单失败');
        const orderNumber = res.message.order_number;
       
        // 得到订单支付必需的参数
        const { data: res2 } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', { order_number: orderNumber });
       
        if (res2.meta.status !== 200) return uni.$showMsg('预付订单生成失败');
        const payInfo = res2.message.pay;
        
        // 发起微信支付
        const [ err, succ ] = await uni.requestPayment(payInfo);
        if (err) return uni.$showMsg('订单未支付');
        const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number: orderNumber });
        if (res3.meta.status !== 200) uni.$showMsg('订单未支付');
        uni.showToast({
          title: '支付完成',
          icon: 'success'
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