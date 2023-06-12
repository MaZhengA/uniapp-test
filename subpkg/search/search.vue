<template>
  <view>
    <view class="search-box">
      <!-- 点击直接获取焦点 -->
      <uni-search-bar @confirm="search" @input="input" :radius="100" clearButton="none" focus="true"></uni-search-bar>
    </view>
    <view class="sugg-list">
      <view v-for="(item, index) of searchResult" :key="index" class="sugg-item" @click="gotoDetail(item.goods_id)">
        <view class="sugg-name">{{item.goods_name}}</view>
        <uni-icons type="right"></uni-icons>
      </view>
    </view>
    <view class="history-box" v-if="searchResult.length === 0">
      <view class="history-title">
        <view>搜索历史</view>
        <uni-icons type="trash-filled" size="20" color="#797979" @click="clear"></uni-icons>
      </view>
      <view class="history-list">
        <view class="history-item" v-for="item, index of historys" :key="index" @click="gotoGoodsList(item)">{{ item }}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        kw: '',
        searchResult: [],
        historyList: []
      };
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods: {
      // input输入时间的处理函数
      input(value) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.kw = value
          this.getSearchList()
        },500)
      },
      async getSearchList() {
        if (this.kw.length == 0) {
          this.searchResult = [];
          return;
        }
        const { data: res } = await uni.$http.get(`/api/public/v1/goods/qsearch?query=${this.kw}`);
        if (res.meta.status !== 200) return $uni.$showMsg();
        this.searchResult = res.message;
        this.saveSearchHistory();
      },
      // 保存搜索关键词
      saveSearchHistory() {
        this.historyList.push(this.kw);
        // 这种方法不会把新搜索的值放在前边
        // this.historyList = Array.from(new Set([...this.historyList]))
        // 这种方法会把新搜索的值放在前边
        const set = new Set(this.historyList);
        set.delete(this.kw);
        set.add(this.kw);
        this.historyList = Array.from(set);
        // 存储到本地
        uni.setStorageSync('kw', JSON.stringify(this.historyList));
      },
      gotoDetail(id) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + id
        })
      },
      clear() {
        this.historyList = [];
        uni.setStorageSync('kw', '[]')
      },
      gotoGoodsList(kw) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + kw
        })
      }
    },
    computed: {
      historys() {
        return [...this.historyList].reverse();
      }
    }
  }
</script>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
  background-color: #c00000;
}
.sugg-list {
  padding: 0 5px;
}
.sugg-item {
  padding: 13px 0;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  border-bottom: 1px solid #efefef;
  .sugg-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 3px;
  }
}
.history-box {
  padding: 0 10px;
  .history-title {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    border-bottom: 1px solid #d2d2d2;
  }
  .history-list {
    padding-top: 10px;
    display: flex;
    .history-item {
      width: 40px;
      height: 35px;
      background: #ddd;
      line-height: 32px;
      text-align: center;
      margin-right: 10px;
    }
  }
}
</style>
