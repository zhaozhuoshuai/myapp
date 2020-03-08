<template>
  <view class="container">
    <!-- 搜索栏 -->
    <view class="search">
      <view class="input-box">
        <input type="text" />
      </view>
    </view>
    <!-- 轮播图 -->
    <swiper indicator-dots>
      <swiper-item>
        <image src="../../static/uploads/banner1.png" />
      </swiper-item>
      <swiper-item>
        <image src="../../static/uploads/banner2.png" />
      </swiper-item>
      <swiper-item>
        <image src="../../static/uploads/banner3.png" />
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "你好"
    };
  },
  onLoad() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.search {
  .input-box {
    background-color: #ff2d4a;
    padding: 20rpx 16rpx;
    input {
      background-color: #fff;
    }
  }
}
swiper {
	height: 340rpx;
	image{
		width: 750rpx;
		height: 340rpx;
	}
}
</style>
