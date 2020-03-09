<template>
  <view class="container" :style="{height:pageHeight,overflow:'hidden'}">
    <!-- 搜索栏 -->
    <search @window-height="handleWindowHeight" />
    <!-- 轮播图 -->
    <swiper indicator-dots>
      <swiper-item :key="item.goods_id" v-for="item in swiperData">
        <image :src="item.image_src" />
      </swiper-item>
    </swiper>
    <!-- 导航菜单 -->
    <view class="navs">
      <navigator :key="item.index" v-for="item in navsData">
        <image :src="item.image_src" />
      </navigator>
    </view>
    <!-- 楼层商品 -->
    <view class="floors">
      <!-- 第一层 -->
      <view class="floor" :key="index" v-for="(item,index) in floorData">
        <!-- 标题 -->
        <view class="title">
          <image :src="item.floor_title.image_src" />
        </view>
        <!-- 列表 -->
        <view class="items">
          <navigator url :key="k" v-for="(img,k) in item.product_list">
            <image :src="img.image_src" />
          </navigator>
        </view>
      </view>
    </view>
    <!-- 回到顶部 -->
    <view class="goTop icon-top" v-if="scrollTop > 200" @click="goTop"></view>
  </view>
</template>

<script>
import search from "@/components/search.vue";
export default {
  data() {
    return {
      title: "你好",
      pageHeight: "auto", //搜索框遮罩层高度状态
      swiperData: [], //获取轮播图数据
      navsData: [], //获取分类图标数据
      floorData: [], //获取楼层商品数据
      scrollTop: 0 //页面滚动的距离
    };
  },
  components: {
    search
  },
  onPageScroll(e) {
    //监听页面的滚动,获取当前滚动的距离
    this.scrollTop = e.scrollTop;
  },
  onLoad() {
    this.querySwiperData();
    this.queryNavsData();
    this.queryFloorData();
  },
  methods: {
    //回到顶部按钮
    goTop() {
      // 调用 API 可以设置页面的滚动位置
      uni.pageScrollTo({ scrollTop: 0 });
    },
    //点击搜索框
    handleWindowHeight(data) {
      this.pageHeight = data.height + "px";
    },
    async querySwiperData() {
      //获取轮播图数据
      const { message } = await this.$request({
        path: "home/swiperdata"
      });
      this.swiperData = message;
    },
    async queryNavsData() {
      //获取导航菜单数据
      const { message } = await this.$request({
        path: "home/catitems"
      });
      this.navsData = message;
    },
    async queryFloorData() {
      //获取商品展示数据
      const { message } = await this.$request({
        path: "home/floordata"
      });
      this.floorData = message;
    }
  }
};
</script>

<style lang="less" scoped>
.goTop {
  position: fixed;
  bottom: 30rpx;
  right: 30rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100rpx;
  height: 100rpx;
  font-size: 48rpx;
  color: #666;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.8);
}
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
