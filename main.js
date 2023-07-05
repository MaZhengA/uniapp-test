import App from './App'
import store from './store'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$adpid = "1111111111"
Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}
App.mpType = 'app'
const app = new Vue({
	store,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.use(store)
	app.config.globalProperties.$adpid = "1111111111"
	app.config.globalProperties.$backgroundAudioData = {
		playing: false,
		playTime: 0,
		formatedPlayTime: '00:00:00'
	}
	return {
		app
	}
}
// #endif

// #ifndef Request
import {
  $http
} from '@escook/request-miniprogram';

uni.$http = $http;

// 请求根路径
// 在小程序后台添加合法域名
// https://mp.weixin.qq.com/wxamp/wadevelopcode/sandbox?lang=zh_CN&token=400273896
$http.baseUrl = 'https://api-hmugo-web.itheima.net';

$http.beforeRequest = function(options) {
  uni.showLoading('数据加载中');
  
  // 判断当前请求的接口是否需要权限
  if (options.url.indexOf('/my') > -1) {
    options.header = {
      Authorization: store.state.m_user.token
    }
  }
  
}

$http.afterRequest = function(options) {
  uni.hideLoading('数据加载完成')
}

// 封装弹窗的方法
uni.$showMsg = function (title = '数据请求失败', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}
// #endif