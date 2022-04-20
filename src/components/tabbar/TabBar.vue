<template>
  <!-- 底部导航 -->
  <div class="tabbar">
    <span class="item" :class="{active:index==currentIndex}" v-for="(item,index) in tabBarList" :key="index">
      <span class="app_item_iconfont iconfont" v-html="item.icon" />
      <span class="app_item_text">{{item.text}}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {
      tabBarList: [
        { icon: '&#xe600;', text: '首页' },
        { icon: '&#xe70b;', text: '购物车' },
        { icon: '&#xe645;', text: '订单' },
        { icon: '&#xe601;', text: '我的' }
      ],
      currentIndex: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.tabbar {
  width: 375rem;
  height: 49rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  box-shadow: 0 -1rem 1rem 0 #f1f1f1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .item {
    display: flex;
    // color: #333;
    flex-direction: column;
    align-items: center;
    .iconfont {
      font-size: 25rem;
    }
    .text {
      font-size: 10rem;
    }
  }
  .active {
    color: #008efb;
  }
}
</style>