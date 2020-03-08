<template>
  <view>
    <!-- 模板中使用子组件(搜索框) -->
    <search/>
  </view>
</template>

<script>
import search from "@/components/search.vue"
export default {
  data() {
    return {
      
    }
  },
  components: {
    search
  }
};
</script>

<style lang="less" scoped>
</style>