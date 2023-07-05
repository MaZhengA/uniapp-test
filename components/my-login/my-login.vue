<template>
  <view class="login-cotainer">
    <uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
    <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
    <view class="tips-text">登陆后尽享更多权益</view>
  </view>
</template>

<script>
  import { mapMutations, mapState } from 'vuex';
  export default {
    name:"my-login",
    data() {
      return {
        
      };
    },
    computed: {
      ...mapState('m_user', ['userinfo', 'redirecInfo'])
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRedirecInfo']),
      getUserProfile(e) {
        // 基础库2.10.4-2.27.0版本生效
        if(uni.getUserProfile) {
          uni.getUserProfile({
            desc: '开发使用',
            lang: 'zh_CN',
            success: (info) => {
              this.updateUserInfo(info),
              this.getToken(info);
            },
            fail: (err) => uni.$showMsg('你取消了授权')
          })
        }
      },
      // 获取 code 对应的值
      async getToken(info) {
        const [err, res] = await uni.login().catch(err => err)
        if (res.errMsg !== "login:ok") return uni.$showMsg('登陆失败');
        
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          signature: info.signature,
          rawData: info.rawData
        }
        
        // 获取 token
        const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query);
        // if (loginResult.meta.status !== 200) return uni.$showMsg('登陆失败！')
        // 把token保存到vuex中
        // this.updateToken(loginResult.message.token);
        this.updateToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo');
        
        this.navigateBack();
      },
      
      // 返回之前的页面
      navigateBack() {
        if (this.redirecInfo && this.redirecInfo.openType === 'switchTab') {
          uni.switchTab({
            url: this.redirecInfo.from,
            complete: () => {
              this.updateRedirecInfo(null)
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
.login-cotainer {
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.btn-login {
  width: 90%;
  margin: 15px 0;
  background-color: #C00000 !important;
  border-radius: 23px;
}
.tips-text {
  color: #666;
}
</style>