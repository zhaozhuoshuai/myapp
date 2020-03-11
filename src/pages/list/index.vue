<template>
  <view>列表页面</view>
</template>

<script>
export default {
  data() {
    return {
      kw: ""
    };
  },
  onLoad(param) {
    this.kw = param.kw;
  }
};
</script>

<style lang="less" scoped>
</style>
