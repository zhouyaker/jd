<template>
  <div id="app">
    <span class="app_item active">
      <span class="app_item_iconfont iconfont">&#xe600;</span>
      <span class="app_item_text">首页</span>
    </span>
    <span class="app_item">
      <span class="app_item_iconfont iconfont">&#xe70b;</span>
      <span class="app_item_text">购物车</span>
    </span>
    <span class="app_item">
      <span class="app_item__iconfont iconfont">&#xe645;</span>
      <span class="app_item_text">订单</span>
    </span>
    <span class="app_item">
      <span class="app_item_iconfont iconfont">&#xe601;</span>
      <span class="app_item_text">我的</span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
#app {
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
  .app_item {
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
