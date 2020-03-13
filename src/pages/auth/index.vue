<template>
  <view>
    <button open-type="getUserInfo" @getuserinfo="getuserinfo" type="primary">点击授权</button>
  </view>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    async getuserinfo(e) {
      // 1、获取微信的授权信息
      const { encryptedData, iv, rawData, signature } = e.detail;
      //2、获取code
      // uni.login({
      //   success: (res) => {
      //     // 获取code之后，可以组合上述4个属性，进而调用接口进行登录
      //     const { code } = res
      //   }
      // })
      const [error, res] = await uni.login();

      //3、调用后台接口获取token信息
      const login=await this.$request({
        method: "post",
        path: "users/wxlogin",
        param: {
          encryptedData,
          iv,
          rawData,
          signature,
          code: res.code
        }
      });
      //4、获取token后，进行缓存，然后跳回到上一个页面
      uni.setStorageSync('mytoken',message.token)
      //返回上一个页面
      // uni.switchTab({
      //   url:'/pages/cart/index'
      // })
      uni.navigateBack({
        delta:1
      })
    }
  }
};
</script>
<style>
</style>