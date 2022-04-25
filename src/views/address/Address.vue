<template>
  <div class="top">
    <div class="header">
      <div class="back" @click="backClick">&#xe743;</div>
      <div class=" text">收货地址</div>
    </div>
    <div class="main">
      <div class="receiver" v-for="item in addressList" :key="item.id">
        <div class="left">
          <div class="address">{{item.address}}</div>
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
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'Address',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const addressList = ref([])
    addressList.value = [
      { id: 1, address: '北京理工大学-国防科技园-2号楼10层', name: '瑶妹（先生）', phone: '18911024266' },
      { id: 2, address: '西安石油大学-鄠邑校区-15号楼1层', name: '周亚博', phone: '15596363427' }
    ]
    // 获取地址
    const address = route.query
    if (JSON.stringify(address) != '{}') {
      // 如果有id属性，说明这是一个修改的地址，而不是新建的地址
      if (address.id) {
        // 进行替换
        addressList.value[address.id - 1] = address
      } else {
        // 新建的地址添加到最后
        const id = addressList.value[addressList.value.length - 1].id + 1
        address.id = id
        addressList.value.push(address)
      }
    }
    // 返回订单页面
    const backClick = () => {
      router.back(-1)
    }
    // 选择收货地址
    const chooseClick = id => {
      store.commit('setAddress', addressList.value[id - 1])
      router.replace({ path: '/order/1' })
    }
    // 修改收货地址
    const modifyClick = id => {
      router.push({ path: '/modify', query: addressList.value[id - 1] })
    }
    // 添加收货地址
    const addClick = () => {
      router.push({ path: '/add' })
    }

    return { backClick, addressList, chooseClick, addClick, modifyClick }
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