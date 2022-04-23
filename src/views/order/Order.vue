<template>
  <div id="order">
    <div class="top">
      <div class="header">
        <div class="back" @click="backClick(shopId)">&#xe743;</div>
        <div class="text">确认订单</div>
      </div>
      <div class="receiver">
        <div class="left">
          <div class="title">收货地址</div>
          <div class="address">北京理工大学国防科技园2号楼10层</div>
          <div class="info">
            <div class="name">瑶妹（先生）</div>
            <div class="">18911024266</div>
          </div>
        </div>
        <div class="right">
          <div class="icon">&#xe6a3;</div>
        </div>
      </div>
    </div>
    <div class="order">
      <div class="shop-name">{{shopName}}</div>
      <div class="shop-info">
        <div class="item" v-for="item in cartItemData" :key="item.id">
          <div class="left">
            <img :src="item.imgUrl" alt="" class="image" />
          </div>
          <div class="right">
            <div class="name">{{item.title}}</div>
            <div class="price">
              <div class="left">¥{{item.newPrice}} x {{item.count}}</div>
              <div class="right">¥{{(item.newPrice*item.count).toFixed(2)}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bottom">
    <div class="left">
      实付金额
      <span class="price">¥{{sumPrise}}</span>
    </div>
    <div class="right">提交订单</div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { computed } from '@vue/runtime-core'

const orderEffect = () => {
  const store = useStore()
  const route = useRoute()
  const router = useRouter()
  // 获取商铺id
  const shopId = route.params.shopid
  // 获取所有购物车数据
  const cartData = store.state.cartData
  // 获取商铺名称
  const shopName = cartData[shopId].shopName
  // 获取当前商铺购物车数据
  const cartItemData = cartData[shopId].goodsList
  // 计算总价
  const sumPrise = computed(() => {
    let sumPrice = 0
    for (const key in cartItemData) {
      console.log(cartItemData[key])
      sumPrice += cartItemData[key].count * cartItemData[key].newPrice
    }
    return sumPrice.toFixed(2)
  })
  // 返回上一页
  const backClick = shopId => {
    router.replace('/shop/' + shopId)
  }
  return { shopId, shopName, cartItemData, sumPrise, backClick }
}

export default {
  name: 'Order',
  setup() {
    const { shopId, shopName, cartItemData, sumPrise, backClick } = orderEffect()
    return { shopId, shopName, cartItemData, sumPrise, backClick }
  }
}
</script>

<style lang="scss" scoped>
#order {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 49rem;
  background-color: #f8f9f9;
  .top {
    .header {
      height: 140rem;
      background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
      background-repeat: no-repeat;
      .back {
        position: absolute;
        left: 20rem;
        top: 18rem;
        font-size: 30rem;
        color: #fff;
      }
      .text {
        text-align: center;
        padding-top: 25rem;
        font-size: 20rem;
        color: #fff;
      }
    }
    .receiver {
      display: flex;
      position: relative;
      width: 340rem;
      height: 110rem;
      background-color: #fff;
      border-radius: 5rem;
      margin: 0 auto;
      top: -70rem;
      padding: 20rem;
      justify-content: space-between;
      .left {
        .title {
          font-size: 16rem;
          color: #333;
          margin-bottom: 16rem;
        }
        .address {
          font-size: 14rem;
          color: #333;
          margin-bottom: 8rem;
        }
        .info {
          display: flex;
          font-size: 12rem;
          color: #666;
          .name {
            margin-right: 6rem;
          }
        }
      }
      .right {
        display: flex;
        align-items: center;
        font-size: 18rem;
        color: #666;
      }
    }
  }
  .order {
    position: relative;
    border-radius: 4rem;
    width: 339rem;
    margin: 0 auto;
    top: -60rem;
    padding: 15rem;
    background-color: #fff;
    .shop-name {
      font-size: 16rem;
      color: #333;
      margin-bottom: 16rem;
    }
    .shop-info {
      .item {
        display: flex;
        margin-bottom: 6rem;
        .left {
          .image {
            width: 46rem;
            height: 46rem;
            margin-right: 16rem;
          }
        }
        .right {
          flex: 1;
          .name {
            margin-top: 2rem;
            font-size: 14rem;
            color: #333;
            margin-bottom: 8rem;
          }
          .price {
            display: flex;
            justify-content: space-between;
            .left {
              font-size: 14rem;
              color: #e93b3b;
              &::first-letter {
                font-size: 10rem;
              }
            }
            .right {
              font-size: 14rem;
              color: #000;
              text-align: right;
              &::first-letter {
                font-size: 10rem;
              }
            }
          }
        }
      }
    }
  }
}
.bottom {
  position: fixed;
  display: flex;
  align-items: center;
  left: 0;
  right: 0;
  bottom: 0;
  width: 375rem;
  height: 49rem;
  background-color: #fff;
  .left {
    flex: 1;
    padding-left: 24rem;
    font-size: 14rem;
    color: #333;
    .price {
      font-size: 16rem;
    }
  }
  .right {
    width: 98rem;
    background-color: #4fb0f9;
    font-size: 14rem;
    color: #fff;
    height: 49rem;
    line-height: 49rem;
    text-align: center;
  }
}
</style>