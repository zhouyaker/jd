<template>
  <div class="mask" v-show="cartShow" @click="changeCartShow"></div>
  <div class="settle_detail" v-show="cartShow">
    <div class="top">
      <div class="selectAll" @click="setAllClick">
        <i class="checked" v-if="allChecked">&#xe70f;</i>
        <i class="unChecked" v-else>&#xe619;</i>
        <span>全选</span>
      </div>
      <div class="clear" @click="clearCart">清空购物车</div>
    </div>
    <p v-show="JSON.stringify(currentList)=='{}'" class="prompt">还没有选择任何商品</p>
    <div class="item" v-for="item in currentList" :key="item.id">
      <div class="select" @click="selectClick(item.id)">
        <i class="checked" v-if="item.checked">&#xe70f;</i>
        <i class="unChecked" v-else>&#xe619;</i>
      </div>
      <div class="pic">
        <img :src="item.pic" alt="">
      </div>
      <div class="info">
        <div class="title">
          {{item.name}}
        </div>
        <div class="price">
          <div>
            <span class="newPrice">￥{{item.newprice}}</span>
            <span class="oldPrice"><del>￥{{item.oldprice}}</del></span>
          </div>
          <div class="count">
            <span class="num">
              {{item.count}}
            </span>份
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="settle">
    <div class="left">
      <span @click="changeCartShow"><img src="../../assets/img/home/basket.png" alt="">
        <div class="num">{{total}}</div>
      </span>
      <div class="price">
        <span>总计:</span>
        <p>¥{{sumPrice}}</p>
      </div>
    </div>
    <router-link :to="toOrder" @click="toOrderClick(total,shopId)">
      <div class="right">
        去结算
      </div>
    </router-link>
  </div>
  <toast v-if="toastData.toastShow">{{toastData.toastMessage}}</toast>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import Toast, { showToastEffect } from '../../components/toast/Toast.vue'

/**
 * 购物车隐藏显示相关的逻辑
 */
const cartShowEffect = () => {
  // 购物车默认隐藏

  const cartShow = ref(false)
  // 修改购物车显示状态
  const changeCartShow = () => {
    cartShow.value = !cartShow.value
  }
  return { cartShow, changeCartShow }
}
/**
 * 结算页面条状判断
 */
const orderEffect = (total, shopId, showToast) => {
  const toOrderClick = () => {
    if (!total.value) {
      showToast('未选择任何商品')
    }
  }
  const toOrder = computed(() => {
    let toOrder = ''
    if (total.value) {
      toOrder = '/order/' + shopId
    }
    return toOrder
  })
  return { toOrderClick, toOrder }
}

export default {
  name: 'Settle',
  components: {
    Toast
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const { toastData, showToast } = showToastEffect()
    const { cartShow, changeCartShow } = cartShowEffect()
    // 获取商铺id
    const shopId = route.params.id
    // 获取购物车数据
    const cartData = store.state.cartData
    // 定义商品总数计算属性
    const total = computed(() => {
      // 获取当前商铺的商品
      const goodsList = cartData?.[shopId]?.goodsList || {}
      // 计算选中商品总数,将所有商品的数量相加
      let count = 0
      if (goodsList) {
        for (const key in goodsList) {
          if (goodsList[key].checked) {
            count += goodsList[key].count
          }
        }
      }
      // 这里返回值就是total的值
      if (count < 100) {
        return count
      } else {
        return '99+'
      }
    })
    // 定义计算总价格的计算属性
    const sumPrice = computed(() => {
      // 获取当前商铺的商品
      const goodsList = cartData?.[shopId]?.goodsList || {}
      let sum = 0
      if (goodsList) {
        for (const key in goodsList) {
          if (goodsList[key].checked) {
            sum += goodsList[key].newprice * goodsList[key].count
          }
        }
      }
      return sum.toFixed(2)
    })
    // 定义当前店铺购物车中的商品
    const currentList = computed(() => {
      const list = cartData?.[shopId]?.goodsList || {}
      return list
    })
    // 改变按钮的选中状态
    const selectClick = goodsId => {
      // 修改vuex中的按钮选中状态
      store.commit('selectClick', { shopId, goodsId })
    }
    // 全选按钮的计算属性
    const allChecked = computed(() => {
      const goodsList = cartData?.[shopId]?.goodsList || {}
      let state = true
      if (goodsList) {
        for (const key in goodsList) {
          // 只要有一个没有选中，则没有全选
          if (goodsList[key].checked == false) {
            state = false
          }
        }
      } else {
        state = false
      }
      return state
    })
    // 全选按钮的状态
    const setAllClick = () => {
      const beforeState = allChecked.value
      store.commit('setAllClick', { shopId, beforeState })
    }
    // 清空购物车
    const clearCart = () => {
      if (JSON.stringify(currentList.value) !== '{}') {
        store.commit('clearCart', { shopId })
        showToast('清空购物车完成')
      } else {
        showToast('购物车为空')
      }
      // 清空完毕隐藏购物车
      changeCartShow()
    }
    const { toOrderClick, toOrder } = orderEffect(total, shopId, showToast)
    return { shopId, total, sumPrice, currentList, allChecked, setAllClick, selectClick, clearCart, toastData, cartShow, changeCartShow, toOrderClick, toOrder }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/maxin.scss';
.mask {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  right: 0;
  left: 0;
  bottom: 49rem;
}
.settle_detail {
  position: fixed;
  left: 0;
  right: 0;
  width: 375rem;
  height: 250rem;
  bottom: 48rem;
  overflow-y: auto;
  background-color: #fff;
  .top {
    display: flex;
    align-items: center;
    font-size: 16rem;
    border-bottom: 1rem solid #ccc;
    justify-content: space-between;
    padding: 8rem 15rem;
    .selectAll {
      color: #4fb0f9;
      span {
        margin-left: 10rem;
        color: #111;
      }
    }
  }
  .prompt {
    font-size: 25rem;
    margin: 20rem;
  }
  .item {
    display: flex;
    border-bottom: 1rem solid #f1f1f1;
    padding-bottom: 10rem;
    margin: 10rem 18rem 0 16rem;
    .select {
      width: 30rem;
      height: 50rem;
      line-height: 50rem;
      font-size: 16rem;
      color: #4fb0f9;
    }
    .pic {
      margin-right: 16rem;
      img {
        width: 50rem;
        height: 50rem;
      }
    }
    .info {
      flex: 1;
      .title {
        @include ellipsis;
        width: 180rem;
        font-size: 14rem;
        color: #333;
        margin-bottom: 10rem;
      }
      .price {
        display: flex;
        align-items: center;
        justify-content: space-between;
        div {
          .newPrice {
            font-size: 14rem;
            color: #e93b3b;
            margin-right: 5rem;
          }
          .oldPrice {
            font-size: 10rem;
            color: #999;
          }
        }
        .count {
          display: flex;
          align-items: center;
          .num {
            font-size: 14rem;
            color: #333;
            margin: 0 10rem;
          }
        }
      }
    }
  }
}
.settle {
  position: fixed;
  display: flex;
  bottom: 0;
  left: 0;
  right: 0;
  height: 49rem;
  .left {
    flex: 1;
    display: flex;
    align-items: center;
    img {
      width: 26rem;
      height: 28rem;
      margin: 12rem 24rem;
    }
    .num {
      position: absolute;
      width: 30rem;
      height: 30rem;
      background-color: #e93b3b;
      border-radius: 15rem;
      transform: scale(0.5, 0.5);
      color: #fff;
      text-align: center;
      line-height: 30rem;
      font-size: 18rem;
      top: 5rem;
      left: 35rem;
    }
    .price {
      display: flex;
      align-items: center;
      margin-left: 8rem;
      span {
        font-size: 12rem;
        color: #333;
      }
      p {
        font-size: 18rem;
        color: #e93b3b;
      }
    }
  }
  .right {
    width: 98rem;
    height: 49rem;
    line-height: 49rem;
    text-align: center;
    font-size: 14rem;
    color: #fff;
    background-color: #4fb0f9;
  }
}
</style>