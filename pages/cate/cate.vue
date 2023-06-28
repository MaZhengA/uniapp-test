<template>
  <view>
    <!-- 使用自定义搜索组件 my-search -->
    <my-search @click="gotoSearch"></my-search>
    <view class="scroll-view-container">
      <!-- 左侧滑动区域 -->
      <scroll-view 
        scroll-y="true" 
        :style="{height: wh + 'px'}" 
        class="left-scroll-view"
      >
        <block v-for="(item, index) in cateList" :key="index" >
          <view :class="['left-scroll-view-item', active === index ? 'active' : '' ]" @click="handleCate(index)">
            {{item.cat_name}}
          </view>
        </block>
      </scroll-view>
      <!-- 右侧活动区域 -->
      <scroll-view scroll-y="true" :style="{height: wh + 'px'}" class="right-scroll-view" :scroll-top="scrollTop">
        <block v-for="(item, index) in cateLevel2" :key="index">
          <view>
            <view class="level2-cat-name">{{ item.cat_name }}</view>
            <view class="level3-cat-box">
              <view v-for="(item2, index2) in item.children" :key="index2" class="level3-cat-name" @click="gotoGoodsList(item2)">
                <image :src="item2.cat_icon"></image>
                <view>{{ item2.cat_name }}</view>
              </view>
            </view>
          </view>
        </block>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js';
  export default {
    mixins: [badgeMix],
    data() {
      return {
        // 当前设备可用高度
        wh: 0,
        // 左侧列表数据
        cateList: [],
        active: 0, // 是否选中
        cateLevel2: [], // 二级分类
        cateLevel3: [], // 三级分类
        scrollTop: 0 // 滚动条距离顶部的位置
      }
    },
    onLoad() {
      const sysInfo = uni.getSystemInfoSync()
      // 减去搜索区域的50像素，否则会有滚动 bug
      this.wh = sysInfo.windowHeight - 50;
      this.getCateList()
    },
    methods: {
      async getCateList () {
        const { data: res } = await uni.$http.get('/api/public/v1/categories');
        if (res.meta.status !== 200) {
          // 请求失败的提示
          return umi.$showMsg()
        }
        this.cateList = res.message;
        this.cateLevel2 = res.message[0].children;
      },
      handleCate (index) {
        this.active = index;
        this.cateLevel2 = this.cateList[index].children;
        // 切换大分类后，scrollTop 置顶，复制前后值一样的话 scrollTop 不会重新执行
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      // 跳转商品列表
      gotoGoodsList (item) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
        })
      },
      // 跳转到搜索页面
      gotoSearch() {
        uni.navigateTo({
          url:  '/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;
  .left-scroll-view {
    width: 120px;
  }
  .left-scroll-view-item {
    font-size: 12px;
    text-align: center;
    line-height: 60px;
    background-color: #f7f7f7;
    &.active {
      background-color: #fff;
      position: relative;
      &::before {
        content: ' ';
        position: absolute;
        top: 50%;
        left: 0;
        display: block;
        width: 3px;
        height: 30px;
        background-color: #c00000;
        transform: translateY(-50%);
      }
    }
  }
  .level2-cat-name {
    padding: 10px 0 20px;
    text-align: center;
  }
  .level3-cat-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 15px;
  }
  .level3-cat-name {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 80px;
    image {
      width: 80px;
      height: 50px;
    }
    &:last-child:nth-child(3n + 2) {
      margin-right: 86px;
    }
  }
  
}
</style>
