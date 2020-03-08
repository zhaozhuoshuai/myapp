<template>
  <view class="search" :class="{focused:isFocused}">
    <view class="input-box">
      <input type="text" @focus="goSearch" />
      <text class='cancel' @click='handleCancel'>取消</text>
    </view>
    <!-- 搜索结果 -->
    <view class="content"></view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isFocused: false//背景状态定义
    };
  },
  methods: {
    goSearch() {
      //当输入框获取聚焦时,在父元素上改变背景状态
      this.isFocused = true
      this.placeholder = '请输入想要的商品'
    },
    handleCancel(){
      //失去焦点时,恢复原状
      this.isFocused = false
      this.placeholder = ''
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  .input-box {
    background-color: #ff2d4a;
    padding: 20rpx 16rpx;
    display: flex;
    input {
      background-color: #fff;
      flex: 1;
    }
    .cancel {
      display: none;
    }
  }
  &.focused {
    .input-box {
      background-color: #eeeeee;
    }
    .cancel {
      display: block;
      width: 100rpx;
      height: 50rpx;
      line-height: 50rpx;
      font-size: 30rpx;
      text-align: center;
    }
  }
}
</style>
