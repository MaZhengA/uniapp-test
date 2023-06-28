import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('m_cart', ['total'])
  },
  watch: {
    total() {
      this.setBadge()
    }
  },
  onShow() {
    this.setBadge()
  },
  methods: {
    setBadge() {
      // 设置tab的徽标
      uni.setTabBarBadge({
        index: 2,
        text: this.total + ''
      })
    }
  }
}