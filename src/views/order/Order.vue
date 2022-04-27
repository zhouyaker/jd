<template>
  <div id="order">
    <div class="top">
      <div class="header">
        <div class="back" @click="backClick()">&#xe743;</div>
        <div class="text">确认订单</div>
      </div>
      <div class="receiver" @click="changeAddress">
        <div class="left" v-if="JSON.stringify(compAddress)!='{}'">
          <div class="title">收货地址</div>
          <div class="address">{{compAddress.position}}</div>
          <div class="info">
            <div class="name">{{compAddress.name}}</div>
            <div class="">{{compAddress.phone}}</div>
          </div>
        </div>
        <div class="left no" v-else>请选择收货地址</div>
        <div class="right">
          <div class="icon">&#xe6a3;</div>
        </div>
      </div>
    </div>
    <!-- 订单 -->
    <div class="order">
      <div class="shop-name">{{shopName}}</div>
      <div class="shop-info">
        <div class="item" v-for="item in Object.keys(cartItemData).slice(0,2)" :key="item.id">
          <div class="left">
            <img :src="cartItemData[item].pic" alt="" class="image" />
          </div>
          <div class="right">
            <div class="name">{{cartItemData[item].name}}</div>
            <div class="price">
              <div class="left">¥{{cartItemData[item].newprice}} x {{cartItemData[item].count}}</div>
              <div class="right">¥{{(cartItemData[item].newprice*cartItemData[item].count).toFixed(2)}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 点击查看更多来显示 -->
      <div class="shop-info" v-show="!showFlag">
        <div v-for="item of Object.keys(cartItemData).slice(2)" :key="item.id" class="item">
          <div class="left">
            <img :src="cartItemData[item].pic" alt="" class="image" />
          </div>
          <div class="right">
            <div class="name">{{ cartItemData[item].name }}</div>
            <div class="price">
              <div class="left">
                ¥{{ cartItemData[item].newprice }} x {{ cartItemData[item].count }}
              </div>
              <div class="right">
                ¥{{ ( cartItemData[item].newprice * cartItemData[item].count ).toFixed(2) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 查看更多 -->
      <div v-show="Object.keys(cartItemData).length>2">
        <div class="more" @click="showMore" v-if="showFlag">
          共计商品{{Object.keys(cartItemData).length}}种/{{sumCount}}件<i>&nbsp;&nbsp; &#xe665;</i>
        </div>
        <div class="more pick-up" @click="showMore" v-else>
          共计商品{{Object.keys(cartItemData).length}}种/{{sumCount}}件<i>&nbsp;&nbsp;&#xe695;</i>
        </div>
      </div>
    </div>
  </div>
  <div class="bottom">
    <div class="left">
      实付金额
      <span class="price">¥{{sumPrise}}</span>
    </div>
    <div class="right" @click="submitClick(shopId)">提交订单</div>
  </div>
  <!-- 离开订单页面时侯弹框提示 -->
  <div class="mask" v-show="showPrompt">
    <div class="black-panel"></div>
    <div class="white-panel" v-show="isExit">
      <div class="title">是否取消订单？</div>
      <div class="content">请尽快完成支付，否则订单将被取消</div>
      <div class="buttons">
        <div class="cancel" @click="cancelClick(shopId)">取消订单</div>
        <div class="confirm" @click="continueClick">继续支付</div>
      </div>
    </div>
    <div class="notice" v-show="isComplete">
      <i class="close-icon" @click="closeClick(shopId)">&#xe65c;</i>
      <i class="finish-icon">&#xe6e1;</i>
      <span class="finish-text">支付成功，等待配送</span>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { post } from '../../utils/request.js'

/**
 * 订单相关逻辑
 */
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
      sumPrice += cartItemData[key].count * cartItemData[key].newprice
    }
    return sumPrice.toFixed(2)
  })
  // 计算商品总数
  const sumCount = computed(() => {
    let sumCount = 0
    for (const key in cartItemData) {
      sumCount += cartItemData[key].count
    }
    return sumCount
  })

  // 页面提示相关逻辑
  // 返回上一页,显示退出提示
  let showPrompt = ref(false)
  let isExit = ref(false)
  let isComplete = ref(false)
  const backClick = () => {
    showPrompt.value = true
    isExit.value = true
  }
  // 提交订单相关事件
  const submitClick = async () => {
    // 获取要提交的基本信息
    const userId = localStorage.userId
    // 发起添加订单请求
    const result = await post(`/order/add/${userId}`, { shopName: shopName, data: cartItemData })
    if (result.data.code == 0) {
      showPrompt.value = true
      isComplete.value = true
      // 清空购物车
      store.commit('clearCart', { shopId })
    } else {
      console.log(result.data.message)
    }
  }
  // 修改收货信息
  const changeAddress = () => {
    router.push({ name: 'Address' })
  }
  // 继续支付
  const continueClick = () => {
    showPrompt.value = false
  }
  // 取消支付
  const cancelClick = shopId => {
    router.replace('/shop/' + shopId)
  }

  // 关闭提示之后页面进行跳转
  const closeClick = () => {
    // 跳转订单页面
    router.replace({ name: 'OrderList' })
  }
  // 获取vuex中的收货地址
  const compAddress = computed(() => {
    const address = store.state.address
    return address
  })
  return { shopId, shopName, cartItemData, sumPrise, sumCount, backClick, cancelClick, showPrompt, isExit, continueClick, submitClick, isComplete, closeClick, changeAddress, compAddress }
}
/**
 * 显示更多相关逻辑
 */
const showMoreEffect = () => {
  // 查看更多商品
  const showFlag = ref(true)
  const showMore = () => {
    showFlag.value = !showFlag.value
  }
  return { showFlag, showMore }
}

export default {
  name: 'Order',
  setup() {
    const { shopId, shopName, cartItemData, sumPrise, sumCount, backClick, cancelClick, showPrompt, isExit, continueClick, submitClick, isComplete, closeClick, changeAddress, compAddress } = orderEffect()
    const { showFlag, showMore } = showMoreEffect()
    return { shopId, shopName, cartItemData, sumPrise, sumCount, backClick, cancelClick, showPrompt, isExit, continueClick, showFlag, showMore, submitClick, isComplete, closeClick, changeAddress, compAddress }
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
        font-size: 20rem;
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
      .no {
        line-height: 70rem;
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
    max-height: 430rem;
    overflow-y: auto;
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
    .more {
      width: 300rem;
      height: 28rem;
      background-color: #0091ff;
      margin: 0 auto;
      font-size: 14rem;
      color: #fff;
      line-height: 28rem;
      text-align: center;
    }
    .pick-up {
      color: #333;
      background-color: #f5f5f5;
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
.mask {
  .black-panel {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .white-panel {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 250rem;
    height: 150rem;
    padding-top: 25rem;
    background-color: #fff;
    .title {
      font-weight: 700;
      font-size: 18rem;
      color: #333;
      text-align: center;
      margin-bottom: 12rem;
    }
    .content {
      text-align: center;
      color: #666;
      margin-bottom: 25rem;
    }
    .buttons {
      display: flex;
      width: 170rem;
      height: 30rem;
      justify-content: space-between;
      margin: 0 auto;
      .cancel {
        width: 80rem;
        height: 30rem;
        line-height: 30rem;
        text-align: center;
        border: 1px solid #4fb0f9;
        border-radius: 15rem;
        font-size: 14rem;
        color: #0091ff;
      }
      .confirm {
        width: 80rem;
        height: 30rem;
        line-height: 30rem;
        text-align: center;
        background-color: #4fb0f9;
        border: 1px solid #4fb0f9;
        border-radius: 15rem;
        font-size: 14rem;
        color: #fff;
      }
    }
  }
  .notice {
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 250rem;
    height: 150rem;
    padding: 10rem;
    background-color: #fff;
    .close-icon {
      text-align: right;
      font-size: 18rem;
      color: #666;
    }
    .finish-icon {
      font-size: 56rem;
      color: #000;
      text-align: center;
      font-weight: bold;
    }
    .finish-text {
      height: 45rem;
      line-height: 45rem;
      font-size: 18rem;
      color: #333;
      text-align: center;
    }
  }
}
</style>