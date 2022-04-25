<template>
  <div class="header">我的订单</div>
  <div class="container">
    <div class="order" v-for="item in orderList" :key="item.shopId">
      <div class="top">
        <div class="title">{{item.shopName}}</div>
        <div class="status">已支付</div>
      </div>
      <div class="bottom">
        <div class="products">
          <img v-for="productItem in item.itemList" :key="productItem.id" :src="productItem.imgUrl" alt="" />
        </div>
        <div class="info">
          <span class="price">¥{{calcTotalPrice(item.itemList)}}</span>
          <span class="count">{{item.itemList.length}}种/共{{calcTotalNum(item.itemList)}}件</span>
        </div>
      </div>
    </div>
  </div>
  <tab-bar :currentIndex="2" />
</template>

<script>
import TabBar from '../../components/tabbar/TabBar.vue'
import { ref } from 'vue'
import { get } from '../../utils/request.js'

/**
 * 订单列表相关逻辑
 */

const orderListEffect = () => {
  const orderList = ref([])
  // 获取订单数据
  const getOrderList = async () => {
    const results = await get('/api/orderlist')
    if (results.data.code == 0) {
      orderList.value = results.data.data
    } else {
      orderList.value = []
    }
  }
  getOrderList()
  // 计算订单总价
  const calcTotalPrice = goodsList => {
    let totalPrice = 0
    goodsList.forEach(element => {
      totalPrice += element.count * element.newPrice
    })
    return totalPrice.toFixed(2)
  }
  // 计算商品总数
  const calcTotalNum = goodsList => {
    let totalNum = 0
    goodsList.forEach(element => {
      totalNum += element.count
    })
    return totalNum
  }
  return { orderList, calcTotalPrice, calcTotalNum }
}

export default {
  name: 'OrderList',
  components: {
    TabBar
  },
  setup() {
    const { orderList, calcTotalPrice, calcTotalNum } = orderListEffect()
    return { orderList, calcTotalPrice, calcTotalNum }
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