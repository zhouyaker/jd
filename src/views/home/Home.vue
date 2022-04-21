<template>
  <div id="home">
    <div class="container">
      <!-- 头部区域 -->
      <div class="header">
        <div class="left">
          <span class="position iconfont">&#xe616;</span>
          <span class="text">北京理工大学国防科技园2号楼10层</span>
        </div>
        <div class="right"><span class="notice iconfont">&#xe70a;</span></div>
      </div>
      <!-- 搜索区域 -->
      <div class="search iconfont">
        <span>&#xe62d;</span>
        <input type="text" class="input" placeholder="山姆会员商店优惠商品">

      </div>
      <!-- banner区域 -->
      <div class="banner">
        <img src="../../assets/img/home/banner.png">
      </div>
      <!-- 首页导航 -->
      <nav-bar />
      <div class="gap" />
      <!-- 附近店铺 -->
      <Nearby />
      <!-- 导航栏 -->
      <tab-bar />
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar.vue'
import Nearby from './Nearby.vue'
import TabBar from '../../components/tabbar/TabBar.vue'
export default {
  name: 'Home',
  components: {
    NavBar,
    Nearby,
    TabBar
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/maxin.scss';
.container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  padding-bottom: 49rem;
  .header {
    display: flex;
    justify-content: space-between;
    padding: 16rem 20rem;
    line-height: 16rem;
    .left,
    .right {
      display: flex;
      align-items: center;
    }
    .iconfont {
      font-size: 20rem;
      margin: 0 10rem;
    }
    .text {
      display: inline-block;
      width: 250rem;
      font-size: 16rem;
      @include ellipsis;
    }
  }
  .search {
    position: relative;
    margin: 0 30rem;
    background-color: #f5f5f5;
    color: #b7b7b7;
    border-radius: 17rem;
    span {
      position: absolute;
      top: 8rem;
      left: 20rem;
      font-size: 20rem;
    }
    .input {
      margin-left: 50rem;
      width: 240rem;
      height: 34rem;
      background-color: #f5f5f5;
      font-size: 14rem;
    }
  }
  .banner {
    text-align: center;
    height: 98rem;
    img {
      width: 339rem;
      height: 86rem;
      margin-top: 12rem;
    }
  }
  .gap {
    width: 375rem;
    height: 10rem;
    background-color: #f1f1f1;
  }
}
</style>