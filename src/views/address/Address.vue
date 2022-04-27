<template>
  <div class="top">
    <div class="header">
      <div class="back" @click="backClick">&#xe743;</div>
      <div class=" text">收货地址</div>
    </div>
    <div class="main">
      <div class="receiver" v-for="item in addressList" :key="item.id">
        <div class="left">
          <div class="address">{{item.position}}</div>
          <div class="info">
            <div class="name">{{item.name}}</div>
            <div class="phone">{{item.phone}}</div>
          </div>
        </div>
        <div class="right">
          <button class="choose" @click="chooseClick(item.id)">选择</button>
          <button class="modify" @click="modifyClick(item.id)">修改</button>

        </div>
      </div>
      <!-- 添加收货地址 -->
      <div class="add" @click="addClick">
        &#xe698;
      </div>
    </div>
  </div>
  <toast v-if="toastData.toastShow">{{toastData.toastMessage}}</toast>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Toast, { showToastEffect } from '../../components/toast/Toast.vue'

import { get, post } from '../../utils/request.js'

/**
 * 收货地址相关的逻辑
 */
const addressEffect = () => {
  // 从内存中获取用户id
  const userId = localStorage.userId
  const addressList = ref([])
  const getAddress = async () => {
    let res = await get('/address/' + userId)
    addressList.value = res.data.data
  }
  getAddress()

  return { getAddress, addressList, userId }
}

export default {
  name: 'Address',
  components: { Toast },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const { toastData, showToast } = showToastEffect()
    const { getAddress, addressList, userId } = addressEffect()
    // 获取要修改的地址
    const address = route.params
    if (JSON.stringify(address) != '{}') {
      // 如果有id属性，说明这是一个修改的地址，而不是新建的地址
      if (address.id) {
        // 进行替换
        post(`/address/modify/${userId}`, address).then(res => {
          getAddress()
          showToast(res.data.message)
        })
      } else {
        // 新建的地址添加到最后
        post(`/address/new/${userId}`, address).then(res => {
          getAddress()
          showToast(res.data.message)
        })
      }
    }

    // 返回订单页面
    const backClick = () => {
      router.back(-1)
    }
    // 选择收货地址
    const chooseClick = id => {
      addressList.value.forEach(item => {
        if (item.id == id) {
          store.commit('setAddress', item)
        }
      })
      router.back()
    }
    // 修改收货地址
    const modifyClick = id => {
      addressList.value.forEach(item => {
        if (item.id == id) {
          router.push({ name: 'ModifyAddress', params: item })
        }
      })
    }
    // 添加收货地址
    const addClick = () => {
      router.push({ path: '/add' })
    }
    return { backClick, addressList, chooseClick, addClick, modifyClick, toastData }
  }
}
</script>

<style lang="scss" scoped>
.top {
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 140rem;
    z-index: 10;
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
  .main {
    position: relative;
    top: 120rem;
    .receiver {
      display: flex;
      width: 340rem;
      height: 110rem;
      background-color: #fff;
      border-radius: 5rem;
      margin: 10rem auto;
      padding: 20rem;
      justify-content: space-between;
      align-items: center;
      .left {
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
        flex-direction: column;
        align-items: center;
        button {
          width: 50rem;
          height: 25rem;
          line-height: 25rem;
          margin: 5rem 0;
          border-radius: 5rem;
        }
        .choose {
          background-color: #0091ff;
          color: #fff;
        }
      }
    }
    .add {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 340rem;
      height: 110rem;
      background-color: #fff;
      border-radius: 5rem;
      margin: 0 auto;
      padding: 20rem;
      font-size: 80rem;
      color: #f1f3f4;
    }
  }
}
</style>  