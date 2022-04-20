<template>
  <div id="app">
    <!-- 首页 -->
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
        <img src="./assets/img/home/banner.png">
      </div>
      <!-- 首页导航 -->
      <div class="nav">
        <div class="nav-item">
          <img src="./assets/img/home/医药健康@3x.png" alt="">
          <span class="text">医药健康</span>
        </div>
        <div class="nav-item">
          <img src="./assets/img/home/大牌免运@3x.png" alt="">
          <span class="text">大牌免运</span>
        </div>
        <div class="nav-item">
          <img src="./assets/img/home/家居@3x.png" alt="">
          <span class="text">家居时尚</span>
        </div>
        <div class="nav-item">
          <img src="./assets/img/home/水果店@3x.png" alt="">
          <span class="text">水果店</span>
        </div>
        <div class="nav-item">
          <img src="./assets/img/home/签到@3x.png" alt="">
          <span class="text">签到</span>
        </div>
        <div class="nav-item">
          <img src="./assets/img/home/红包@3x.png" alt="">
          <span class="text">红包</span>
        </div>
        <div class="nav-item">
          <img src="./assets/img/home/菜市场@3x.png" alt="">
          <span class="text">菜市场</span>
        </div>
        <div class="nav-item">
          <img src="./assets/img/home/蛋糕@3x.png" alt="">
          <span class="text">烘培蛋糕</span>
        </div>
        <div class="nav-item">
          <img src="./assets/img/home/超市@3x.png" alt="">
          <span class="text">超市便利</span>
        </div>
        <div class="nav-item">
          <img src="./assets/img/home/鲜花@3x.png" alt="">
          <span class="text">鲜花绿植</span>
        </div>
      </div>
      <div class="gap"></div>
      <!-- 附近店铺 -->
      <div class="shop">
        <h3>附近店铺</h3>
        <div class="shop-item">
          <div class="item-left">
            <img src="./assets/img/home/shop.png" alt="">
          </div>
          <div class="item-right">
            <div class="title">沃尔玛</div>
            <div class="info">
              <span>月售1万+</span>
              <span>起送￥0</span>
              <span>基础运费￥5</span>
            </div>
            <div class="sale">VIP尊享满89元减4元运费券（每月3张）</div>
          </div>
        </div>
        <div class="shop-item">
          <div class="item-left">
            <img src="./assets/img/home/shop.png" alt="">
          </div>
          <div class="item-right">
            <div class="title">沃尔玛</div>
            <div class="info">
              <span>月售1万+</span>
              <span>起送￥0</span>
              <span>基础运费￥5</span>
            </div>
            <div class="sale">VIP尊享满89元减4元运费券（每月3张）</div>
          </div>
        </div>
        <div class="shop-item">
          <div class="item-left">
            <img src="./assets/img/home/shop.png" alt="">
          </div>
          <div class="item-right">
            <div class="title">沃尔玛</div>
            <div class="info">
              <span>月售1万+</span>
              <span>起送￥0</span>
              <span>基础运费￥5</span>
            </div>
            <div class="sale">VIP尊享满89元减4元运费券（每月3张）</div>
          </div>
        </div>
        <div class="shop-item">
          <div class="item-left">
            <img src="./assets/img/home/shop.png" alt="">
          </div>
          <div class="item-right">
            <div class="title">沃尔玛</div>
            <div class="info">
              <span>月售1万+</span>
              <span>起送￥0</span>
              <span>基础运费￥5</span>
            </div>
            <div class="sale">VIP尊享满89元减4元运费券（每月3张）</div>
          </div>
        </div>
        <div class="shop-item">
          <div class="item-left">
            <img src="./assets/img/home/shop.png" alt="">
          </div>
          <div class="item-right">
            <div class="title">沃尔玛</div>
            <div class="info">
              <span>月售1万+</span>
              <span>起送￥0</span>
              <span>基础运费￥5</span>
            </div>
            <div class="sale">VIP尊享满89元减4元运费券（每月3张）</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部导航 -->
    <div class="tabbar">
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
  </div>
</template>

<style lang="scss" scoped>
@import './style/maxin.scss';
#app {
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
        margin-top: 12px;
      }
    }
    .nav {
      display: flex;
      flex-wrap: wrap;
      margin-top: 16rem;
      .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 20%;
        margin-bottom: 16rem;
        img {
          width: 40rem;
          height: 40rem;
          margin-bottom: 6rem;
        }
      }
    }
    .gap {
      width: 375rem;
      height: 10rem;
      background-color: #f1f1f1;
    }
    .shop {
      h3 {
        margin: 16rem 18rem 14rem;
        font-size: 18rem;
        color: #333;
      }
      .shop-item {
        display: flex;
        align-items: center;
        margin-bottom: 12rem;
        .item-left {
          margin-left: 18rem;
          img {
            width: 56rem;
            height: 56rem;
            margin-right: 16rem;
          }
        }
        .item-right {
          border-bottom: 1px solid #f1f1f1;
          .title {
            margin-bottom: 8rem;
            font-size: 16rem;
            color: #333;
          }
          .info {
            display: flex;
            span {
              font-size: 13rem;
              color: #333;
              margin-right: 16rem;
              margin-bottom: 8rem;
            }
          }
          .sale {
            font-size: 13rem;
            color: #e93b3b;
            margin-bottom: 12rem;
          }
        }
      }
    }
  }
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
}
</style>
