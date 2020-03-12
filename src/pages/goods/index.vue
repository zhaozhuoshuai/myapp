<template>
  <view class="wrapper">
    <!-- 商品图片 -->
    <swiper class="pics" indicator-dots indicator-color="rgba(255, 255, 255, 0.6)" indicator-active-color="#fff">
      <swiper-item :key='item.goods_id' v-for='item in goods.pics'>
        <image :src="item.pics_big_url"></image>
      </swiper-item>
    </swiper>
    <!-- 基本信息 -->
    <view class="meta">
      <view class="price">￥{{goods.goods_price}}</view>
      <view class="name">{{goods.goods_name}}</view>
      <view class="shipment">快递: {{goods.goods_state===2?'免邮费': '不包邮'}}</view>
      <text class="collect icon-star">收藏</text>
    </view>
    <!-- 商品详情 -->
    <view class="detail">
      <view v-html='goods.goods_introduce'></view>
      <!-- <rich-text :nodes='goods.goods_introduce'></rich-text> -->
    </view>
    <!-- 操作 -->
    <view class="action">
      <button open-type="getPhoneNumber" class="icon-handset">联系客服</button>
      <text class="cart icon-cart" @click="goCart">购物车</text>
      <text class="add" @click="addCart">加入购物车</text>
      <text class="buy" @click="createOrder">立即购买</text>
    </view>
  </view>
</template>

<script>
  export default {
    data () {
      return {
        id: '',//商品id状态位
        goods: null,//获取数据
        //购物车数据,先查询缓存是否有数据,没有则初始化为空数组
        cart:uni.getStorageSync('mycart') || []
      }
    },
    //生命周期
    onLoad (param) {
      // console.log(param)
      //传过来的id赋值给状态id
      this.id = param.id
      //调用loadData方法
      this.loadData(param.id)
    },
    //方法处理函数
    methods: {
      //添加购物车
      addCart(){
        //先判断用户是否登录
        // if (localStorage.getItem('mytoken')) {
        //   //已经登录,直接把商品信息提交给后台接口
        // }else{
        //   //没有登录,先把商品信息添加到缓存,登录后再提交数据
        // }
        //先按照没有登录处理流程
        //声明对象
        let product = {
          goods_id:this.goods.goods_id,//商品id
          goods_name:this.goods.goods_name,//商品名称
          goods_price:this.goods.goods_price,//商品价格
          goods_num:1,//商品数量
          goods_img:this.goods.goods_small_logo//商品图片
        }
        //加入购物车:判断商品是否在购物车里面返回true或false
        let isExist = this.cart.some(item=>{
          return item.goods_id===this.goods.goods_id
        })
        //有数据的话
        if (isExist) {
          //把商品数量累计
          this.cart.some(item=>{
            if (item.goods_id===this.goods.goods_id) {
              //修改商品数量数据
              item.goods_num+=1
              //找到商品后,终止后续遍历
              return true
            }
          })
        } else {
          // 没有数据的话,首次添加
          this.cart.push(product)
        }
        //将购物车数据进行缓存
        uni.setStorageSync('mytoken',this.cart)
        //加入成功后给个提示
        uni.showToast({
          title:'加入购物车成功'
        })
      },
      // 加载商品的详细数据
      async loadData (id) {
        //解构赋值调用api接口
        const {message} = await this.$request({
          path: 'goods/detail',//地址
          param: {
            goods_id: id//参数
          }
        })
        //把需要的数据放到goods里面去做遍历
        this.goods = message
      },
      goCart () {
        //跳转到购物车页面
        uni.switchTab({
          url: '/pages/cart/index'
        })
      },
      createOrder () {
        //先加入购物车在跳转到购物车页面
        this.addCart()
        uni.switchTab({
          url: '/pages/cart/index'
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .wrapper {
    margin-bottom: 100rpx;
    background-color: #f4f4f4;
  }

  .pics {
    height: 640rpx;
  }
  
  .meta {
    height: 250rpx;
    line-height: 1;
    padding: 30rpx 180rpx 30rpx 20rpx;
    box-sizing: border-box;
    background-color: #fff;
    position: relative;

    .price {
      font-size: 36rpx;
      color: #ea4451;
      margin-bottom: 20rpx;
    }

    .name {
      color: #333;
      line-height: 1.4;
      font-size: 33rpx;

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    .shipment {
      font-size: 27rpx;
      color: #999;
      position: absolute;
      bottom: 30rpx;
    }

    .collect {
      width: 140rpx;
      height: 88rpx;
      text-align: center;
      box-sizing: border-box;
      border-left: 1rpx solid #ddd;
      font-size: 24rpx;
      color: #999;

      position: absolute;
      right: 10rpx;
      top: 91rpx;
    }

    [class*="icon-"]::before {
      display: block;
      font-size: 45rpx;
      margin-bottom: 10rpx;
    }
  }

  .detail image {
    width: 100%;
    height: 480rpx;
    margin-top: 20rpx;
  }

  .action {
    width: 100%;
    height: 98rpx;
    background-color: #fff;

    position: fixed;
    left: 0;
    bottom: 0;

    display: flex;
    align-items: center;

    text {
      display: block;
    }

    .add, .buy {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 210rpx;
      text-align: center;
      font-size: 27rpx;
      color: #fff;
    }

    .add {
      background-color: #f4b73f;
    }

    .buy {
      background-color: #ea4451;
    }

    button {
      padding: 0;
      border-radius: 0;
      background-color: #fff;

      &::after {
        border: none;
      }
    }

    button, .cart {
      flex: 1;
      text-align: center;
      color: #989898;
      font-size: 24rpx;
      box-sizing: border-box;
    }

    [class*="icon"]::before {
      display: block;
      font-size: 45rpx;
      margin-bottom: 2rpx;
    }
  }
</style>
