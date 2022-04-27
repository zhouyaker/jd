<template>
  <div class="header">我的订单</div>
  <div class="container">
    <div class="order" v-for="item in orderList" :key="item.shopId">
      <div class="top">
        <div class="title">{{item.shopName}}</div>
        <div class="status">已支付</div>
      </div>
      <div class="bottom" @click="showAllClick(item.shopId)">
        <div class="products">
          <img v-for="productItem in item.itemList.slice(0,3)" :key="productItem.id" :src="productItem.imgUrl" alt="" />
          <span v-if="item.itemList.length>3">
            <i class="more" v-if="currentId!=item.shopId">&#xe665;</i>
            <i class="more" v-else>&#xe695;</i>
          </span>

        </div>
        <div class="products" :class="{hide:currentId!==item.shopId}">
          <img v-for="productItem in item.itemList.slice(3)" :key="productItem.id" :src="productItem.imgUrl" alt="" />
        </div>
        <div class="info">
          <span class="price">¥{{calcTotalPrice(item.itemList)}}</span>
          <span class="count">{{item.itemList.length}}种/共{{calcTotalNum(item.itemList)}}件</span>
        </div>
      </div>
    </div>
  </div>
  <tab-bar :currentIndex="1" />
</template>

<script>
import TabBar from '../../components/tabbar/TabBar.vue'
import { ref } from 'vue'
import { get } from '../../utils/request.js'

/**
 * 订单列表相关逻辑
 */

const orderListEffect = () => {
  const userId = localStorage.userId
  const orderList = ref([])

  // 订单是否全部显示
  let showAll = ref(false)
  let currentId = ref(0)
  const showAllClick = id => {
    if (currentId.value == id) {
      currentId.value = 0
    } else {
      currentId.value = id
    }
  }
  // 获取订单数据
  const getOrderList = async () => {
    const orderArr = [] // 用于存放最终的数据
    const results = await get(`/order/${userId}`)
    if (results.data.code == 0) {
      const orderList = results.data.data
      orderList.forEach(j => {
        let flag = false
        // 先遍历数组，看看是否已经存在同商店商品
        orderArr.forEach(k => {
          if (k.shopId == j.shopid) {
            flag = true
            k.itemList.push({
              id: j.id,
              name: j.name,
              imgUrl: j.img,
              newPrice: j.newprice,
              count: j.count,
              checked: j.checked
            })
          }
        })
        // 如果不存在，将商店的数组信息进行添加
        if (!flag) {
          orderArr.push({
            shopId: j.shopid,
            shopName: j.shopname,
            itemList: [
              {
                id: j.id,
                name: j.name,
                imgUrl: j.img,
                newPrice: j.newprice,
                count: j.count,
                checked: j.checked
              }
            ]
          })
        }
      })
    }
    orderList.value = orderArr
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
  return { orderList, calcTotalPrice, calcTotalNum, showAll, currentId, showAllClick }
}

export default {
  name: 'OrderList',
  components: {
    TabBar
  },
  setup() {
    const { orderList, calcTotalPrice, calcTotalNum, showAll, currentId, showAllClick } = orderListEffect()
    return { orderList, calcTotalPrice, calcTotalNum, showAll, currentId, showAllClick }
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
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      .products {
        display: flex;
        align-items: center;
        width: 200rem;
        img {
          width: 40rem;
          height: 40rem;
          margin-right: 12rem;
          margin-bottom: 10rem;
        }
        .more {
          margin-left: 10rem;
          font-size: 20rem;
        }
      }
      .hide {
        display: none;
      }
      .info {
        position: absolute;
        z-index: 10;
        top: 2rem;
        right: 0;
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