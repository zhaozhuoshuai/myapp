<template>
  <view class="container">
    <!-- 搜索栏 -->
    <search/>
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
    <!-- 导航菜单 -->
    <view class="navs">
      <navigator url>
        <image src="/static/uploads/icon_index_nav_1@2x.png" />
      </navigator>
      <navigator url>
        <image src="/static/uploads/icon_index_nav_2@2x.png" />
      </navigator>
      <navigator url>
        <image src="/static/uploads/icon_index_nav_3@2x.png" />
      </navigator>
      <navigator url>
        <image src="/static/uploads/icon_index_nav_4@2x.png" />
      </navigator>
    </view>
    <!-- 楼层商品 -->
    <view class="floors">
      <!-- 第一层 -->
      <view class="floor">
        <!-- 标题 -->
        <view class="title">
          <image src="/static/uploads/pic_floor01_title.png" />
        </view>
        <!-- 列表 -->
        <view class="items">
          <navigator url>
            <image src="/static/uploads/pic_floor01_1@2x.png" />
          </navigator>
          <navigator url>
            <image src="/static/uploads/pic_floor01_2@2x.png" />
          </navigator>
          <navigator url>
            <image src="/static/uploads/pic_floor01_3@2x.png" />
          </navigator>
          <navigator url>
            <image src="/static/uploads/pic_floor01_4@2x.png" />
          </navigator>
          <navigator url>
            <image src="/static/uploads/pic_floor01_5@2x.png" />
          </navigator>
        </view>
      </view>
	  <!-- 第二层 -->
      <view class="floor">
        <!-- 标题 -->
        <view class="title">
          <image src="/static/uploads/pic_floor01_title.png" />
        </view>
        <!-- 列表 -->
        <view class="items">
          <navigator url>
            <image src="/static/uploads/pic_floor01_1@2x.png" />
          </navigator>
          <navigator url>
            <image src="/static/uploads/pic_floor01_2@2x.png" />
          </navigator>
          <navigator url>
            <image src="/static/uploads/pic_floor01_3@2x.png" />
          </navigator>
          <navigator url>
            <image src="/static/uploads/pic_floor01_4@2x.png" />
          </navigator>
          <navigator url>
            <image src="/static/uploads/pic_floor01_5@2x.png" />
          </navigator>
        </view>
      </view>
	  <!-- 第三层 -->
      <view class="floor">
        <!-- 标题 -->
        <view class="title">
          <image src="/static/uploads/pic_floor01_title.png" />
        </view>
        <!-- 列表 -->
        <view class="items">
          <navigator url>
            <image src="/static/uploads/pic_floor01_1@2x.png" />
          </navigator>
          <navigator url>
            <image src="/static/uploads/pic_floor01_2@2x.png" />
          </navigator>
          <navigator url>
            <image src="/static/uploads/pic_floor01_3@2x.png" />
          </navigator>
          <navigator url>
            <image src="/static/uploads/pic_floor01_4@2x.png" />
          </navigator>
          <navigator url>
            <image src="/static/uploads/pic_floor01_5@2x.png" />
          </navigator>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import search from '@/components/search.vue'
export default {
  data() {
    return {
      title: "你好"
    };
  },
  components: {
    search
  },
  onLoad() {},
  methods: {}
};
</script>

<style lang="less" scoped>

swiper {
  height: 340rpx;
  image {
    width: 750rpx;
    height: 340rpx;
  }
}
.navs {
  display: flex;
  justify-content: space-between;
  padding: 0 30rpx;
  height: 180rpx;
  align-items: center;
  navigator {
    width: 128rpx;
    height: 140rpx;
  }
}
.floor {
  .title {
    width: 750rpx;
    height: 60rpx;
	padding: 20rpx 0 0 10rpx;
	box-sizing: border-box;
    background-color: #f4f4f4;
  }
  .items {
	  padding: 20rpx 16rpx;
	  overflow: hidden;
    navigator {
		padding-left: 10rpx;
      float: left;
      &:first-child {
        width: 232rpx;
		height: 386rpx;
		padding-left: 0;
      }
      &:nth-child(2),
      &:nth-child(5) {
        width: 273rpx;
        height: 188rpx;
      }
      &:nth-child(3),
      &:nth-child(4) {
        width: 193rpx;
        height: 188rpx;
      }
      &:nth-last-child(-n + 2) {
        margin-top: 10rpx;
      }
    }
  }
  &:first-child {
    .items {
      navigator {
        width: 232rpx;
        height: 188rpx;
        &:first-child {
          width: 232rpx;
          height: 386rpx;
        }
      }
    }
  }
}
</style>
