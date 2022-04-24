<template>
  <div class="header">我的订单</div>
  <div class="container">
    <div class="order">
      <div class="top">
        <div class="title">沃尔玛</div>
        <div class="status">已取消</div>
      </div>
      <div class="bottom">
        <div class="products">
          <img src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202261527635.png" alt="" />
          <img src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202261527635.png" alt="" />
        </div>
        <div class="info">
          <span class="price">¥66.69</span>
          <span class="count">共6件</span>
        </div>
      </div>
    </div>
    <div class="order">
      <div class="top">
        <div class="title">沃尔玛</div>
        <div class="status">已取消</div>
      </div>
      <div class="bottom">
        <div class="products">
          <img src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202261527635.png" alt="" />
          <img src="https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202261527635.png" alt="" />
        </div>
        <div class="info">
          <span class="price">¥66.69</span>
          <span class="count">共6件</span>
        </div>
      </div>
    </div>
  </div>
  <tab-bar :currentIndex="2" />
</template>

<script>
import TabBar from '../../components/tabbar/TabBar.vue'
export default {
  name: 'OrderList',
  components: {
    TabBar
  }
}
TabBar
</script>

<style lang="scss" scoped>
.header {
  width: 375rem;
  background-color: #fff;
  height: 44rem;
  font-size: 16rem;
  color: #333;
  text-align: center;
  line-height: 44rem;
}
.container {
  background-color: #efefef;
  position: fixed;
  top: 44rem;
  left: 0;
  right: 0;
  bottom: 49rem;
  .order {
    margin: 10rem auto;
    width: 340rem;
    height: 110rem;
    // overflow: hidden;
    background-color: #fff;
    border-radius: 5rem;
    padding: 16rem;
    .top {
      display: flex;
      justify-content: space-between;
      height: 22rem;
      margin-bottom: 16rem;
      align-items: center;
      .title {
        font-size: 16rem;
        color: #333;
      }
      .status {
        font-size: 14rem;
        color: #999;
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .products {
        img {
          width: 40rem;
          height: 40rem;
          margin-right: 12rem;
        }
      }
      .info {
        display: flex;
        flex-direction: column;
        .price {
          font-size: 14rem;
          color: #e93b3b;
          margin-bottom: 5rem;
        }
        .count {
          font-size: 12rem;
          color: #333;
          text-align: right;
        }
      }
    }
  }
}
</style>