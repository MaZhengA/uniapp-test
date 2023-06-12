<template>
  <view class="my-search-container" :style="{ 'background-color': bgColor }">
    <!-- 使用 view 模拟input样式 -->
    <view class="my-search-box" :style="{'border-radius': radius + 'px'}" @click="searchBoxHandler">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    props: {
      // 背景颜色
      bgColor: {
        type: String,
        default: '#c00000'
      },
      // 圆角
      radius: {
        type: Number,
        default: 18
      }
    },
    data() {
      return {
        
      };
    },
    methods: {
      searchBoxHandler() {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
.my-search-container {
  padding: 0px 10px;
  display: flex;
  align-items: center;
  height: 50px;
  // background-color: #c00000;
}
.my-search-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 100%;
  // border-radius: 18px;
  background-color: #fff;
  .placeholder {
    margin-left: 5px;
    font-size: 15px;
  }
}
</style>