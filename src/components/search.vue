<template>
  <view class="search" :class="{focused:isFocused}">
    <view class="input-box">
      <input
        @confirm="handelEnter"
        v-model="keyword"
        @input="handleQuery"
        :placeholder="placeholder"
        type="text"
        @focus="goSearch"
      />
      <text class="cancel" @click="handleCancel">取消</text>
    </view>
    <!-- 搜索结果 -->
    <view class="content">
      <!-- 标题 -->
      <div class="title">
        搜索历史
        <!-- 小图标 -->
        <span class="clear" @click="handleClear"></span>
      </div>
      <!-- 搜索历史关键字 -->
      <div class="history">
        <navigator :url="'/pages/list/index?kw='+item" :key="index" v-for="(item,index) in history">{{item}}</navigator>
      </div>
      <!-- 结果 -->
      <scroll-view v-if="qlist.length>0" scroll-y class="result">
        <navigator url :key="item.goods_id" v-for="item in qlist">{{item.goods_name}}</navigator>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isFocused: false, //背景状态位
      placeholder: "", //搜索框关键字
      keyword: "", //关键字绑定
      qlist: [], //商品列表
      //缓存历史关键字:先查询之前的搜索历史,默认为[]
      history: uni.getStorageSync("history") || [],
      timer:-1//延时器
    };
  },
  methods: {
    //清空搜索历史
    handleClear() {
      // 1、清空缓存
      uni.removeStorageSync("history");
      // 2、清空状态数据
      this.history = [];
    },
    handelEnter(e) {
      // 监听回车事件
      //获取输入框最新的值
      let v = e.detail.value;
      //把数据追加到数组的前面用unshift
      this.history.unshift(v);
      //控制数组的去重操作
      let arr = [...new Set(this.history)];
      //更新状态
      this.history = arr;
      //把当前的历史关键字进行缓存
      uni.setStorageSync("history", arr);
      //回车时跳转到商品列表页面
      uni.navigateTo({
        url:'/pages/list/index?kw='+ v
      })
    },
    //根据关键字调用后台接口查询商品列表
    handleQuery() {
      // 通过函数防抖的方式限制接口调用的频率
      clearTimeout(this.timer)
      this.timer = setTimeout(async ()=>{
      const { message } = await this.$request({
        path: "goods/qsearch?query=" + this.keyword
      });
      //解构出来的赋值给qlist
      this.qlist = message;
      },1000)
    },
    goSearch() {
      //解构赋值获取遮罩层高度;uni.getSystemInfoSync()获取可视区高度
      const { windowHeight } = uni.getSystemInfoSync();
      //组件传值-将可视区高度传到父组件
      this.$emit("window-height", { height: windowHeight });

      //当输入框获取聚焦时,在父元素上改变背景状态
      this.isFocused = true;
      this.placeholder = "请输入想要的商品";
    },
    handleCancel() {
      //点击取消按钮恢复原始状态
      this.$emit("window-height", { height: "auto" });
      //失去焦点时,恢复原状
      this.isFocused = false;
      //清空提示信息
      this.placeholder = "";
      //清除关键字
      this.keyword = "";
      //清空搜索结果
      this.qlist = [];
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  .content {
    position: absolute;
    top: 94rpx;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    background-color: #fff;
    display: none;
    padding: 30rpx;
    .title {
      font-size: 27rpx;
      line-height: 1;
      color: #333;
    }
    .clear {
      display: block;
      width: 27rpx;
      height: 27rpx;
      float: right;
      background-image: url(http://static.botue.com/ugo/images/clear.png);
      background-size: cover;
    }
    .history {
      padding-top: 30rpx;
      navigator {
        display: inline-block;
        line-height: 1;
        padding: 15rpx 20rpx 12rpx;
        background-color: #ddd;
        font-size: 24rpx;
        margin-right: 20rpx;
        margin-bottom: 15rpx;
        color: #333;
      }
    }
    .result {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: #fff;
      navigator {
        line-height: 1;
        padding: 20rpx 30rpx;
        font-size: 24rpx;
        color: #666;
        border-bottom: 1px solid #eee;
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
  .input-box {
    background-color: #ff2d4a;
    padding: 20rpx 16rpx;
    display: flex;
    position: relative;
    input {
      background-color: #fff;
      padding-left: 55rpx;
      height: 60rpx;
      font-size: 27rpx;
      flex: 1;
    }
    .cancel {
      display: none;
    }
    &::before {
      content: "";
      width: 32rpx;
      height: 32rpx;
      display: none;
      position: absolute;
      top: 50%;
      transform: translate(20rpx, -50%);
      background-image: url(http://static.botue.com/ugo/images/icon_search%402x.png);
      background-size: 32rpx;
      background-repeat: no-repeat;
    }
    &::after {
      content: "搜索";
      // display: block;
      position: absolute;
      left: 50%;
      top: 50%;
      padding-left: 40rpx;
      transform: translate(-50%, -50%);
      font-size: 24rpx;
      color: #ccc;
      background-image: url(http://static.botue.com/ugo/images/icon_search%402x.png);
      background-size: 32rpx;
      background-repeat: no-repeat;
    }
  }
  &.focused {
    .input-box {
      background-color: #eeeeee;
      &::before {
        display: block;
      }
      &::after {
        display: none;
      }
    }
    .cancel {
      display: block;
      width: 100rpx;
      height: 50rpx;
      line-height: 50rpx;
      font-size: 30rpx;
      text-align: center;
    }
    .content {
      display: block;
    }
  }
}
</style>
