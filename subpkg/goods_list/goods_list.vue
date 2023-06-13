<template>
  <view>
    <view class="goods-list">
      <view v-for="(item, index) in goodsList" :key="index" @click="gotoDetail(item)">
        <!-- 通过组件的方式渲染item项 -->
        <my-goods :goods="item"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goodsList: [],
        total: 0
      };
    },
    onLoad(options) {
      this.queryObj.query = options.query || '';
      this.queryObj.cid = options.cid || '';
      this.getGoodsList();
    },
    methods: {
      async getGoodsList(cb) {
        const {data: res} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj);
        // 数据请求完毕后，就立即按需调用cb函数
        cb && cb();
        if (res.meta.status !== 200)  return umi.$showMsg()
        // uni.$showMsg('数据请求成功')
        this.goodsList = [...this.goodsList, ...res.message.goods];
        this.total = res.total;
      },
      async gotoDetail(item) {
        uni.navigateTo({
          url: "/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id
        })
      }
    },
    onReachBottom() {
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕')
      this.queryObj.pagenum += 1;
      this.getGoodsList();
    },
    onPullDownRefresh() {
      this.queryObj.pagenum = 1;
      this.total = 0;
      this.goodsList = [];
      this.getGoodsList(() => uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="scss">
.goods-list {
  
}
</style>
