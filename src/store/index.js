import { createStore } from 'vuex'



/**
 *  将购物车数据放入缓存
*/
const setLocalCartData = (state) => {
  // 获取购物车数据
  const { cartData } = state
  // 转为JSON存入本地
  const dataString = JSON.stringify(cartData)
  localStorage.setItem('cartData', dataString)
}
/**
 * 从本地读取购物车数据
*/
const getLocalCartData = () => {
  let result = {}
  if (localStorage.cartData) {
    console.log('得到本地存储')
    result = JSON.parse(localStorage.cartData)
  }
  return result

}


// console.log(getLocalCartData())
export default createStore({

  state: {
    // 从缓存获取数据
    cartData: getLocalCartData()
  },
  getters: {
  },
  mutations: {
    /**
     * 添加店铺名称
    */
    addShopName(state, payload) {
      const { shopName, shopId } = payload
      const shopInfo = state.cartData[shopId] || {}
      shopInfo.shopName = shopName
      if (shopInfo.goodsList == undefined) {
        shopInfo.goodsList = {}
      }
      state.cartData[shopId] = shopInfo
    },

    /**
     * 修改购物车中的商品数量
    */
    changeGoodsNum(state, payload) {
      const { shopId, goods, flag } = payload
      const goodsId = goods.id
      // 从state中获取商铺信息
      const shopInfo = state.cartData[shopId]
      // 获取商品信息
      let goodsInfo = {}
      if (shopInfo.goodsList[goodsId]) {
        // state中有商品，直接获取
        goodsInfo = shopInfo.goodsList[goodsId]
      } else {
        // state中没有商品,从传递的参数值中获取，添加count属性
        goodsInfo = goods
        goodsInfo.count = 0
      }
      // 增加或减少数量
      goodsInfo.count += flag

      // 判断数量是否为零
      if (goodsInfo.count == 0) {
        // 如果count减少到0，直接移除该商品(goodsInfo)
        console.log('移除商品', goodsId)
        delete shopInfo.goodsList[goodsId]
      } else {
        // 添加默认选中状态
        goodsInfo.checked = true
        shopInfo.goodsList[goodsId] = goodsInfo
      }
      // 更新信息
      state.cartData[shopId] = shopInfo
      setLocalCartData(state)
    },
    /**
     * 修改购物车中的商品选中状态
    */
    selectClick(state, payload) {
      const { shopId, goodsId } = payload
      // 找到指定的商品信息
      const goodsInfo = state.cartData[shopId].goodsList[goodsId]
      // 对选中状态进行取反
      goodsInfo.checked = !goodsInfo.checked
      setLocalCartData(state)
    },
    /**
     * 清空购物车
    */
    clearCart(state, payload) {
      const { shopId } = payload
      state.cartData[shopId].goodsList = {}
      setLocalCartData(state)
    },
    /**
     * 购物车全选商品
    */
    setAllClick(state, payload) {
      // 获取全选按钮的状态和商铺id
      const { shopId, beforeState } = payload
      const shopInfo = state.cartData[shopId]
      for (const key in shopInfo.goodsList) {
        shopInfo.goodsList[key].checked = !beforeState
      }
      setLocalCartData(state)
    }
  },
  actions: {
  },
  modules: {
  }
})
