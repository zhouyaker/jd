<template>
  <!-- 首页导航 -->
  <div class="nav">
    <div class="nav-item" v-for="(item,index) in data.navList" :key="index">
      <img :src="item.url" alt="">
      <span class="text">{{item.text}}</span>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import Toast, { showToastEffect } from '../../components/toast/Toast.vue'

import { get } from '../../utils/request.js'

const NavBarEffect = showToast => {
  const data = reactive({
    navList: []
  })
  const getList = async () => {
    try {
      const results = await get('/api/home/nav')
      if (results.data.code === 0) {
        data.navList = results.data.data
      } else {
        showToast('获取店铺数据失败')
      }
    } catch (err) {
      showToast('请求接口失败')
    }
  }
  getList()
  return { data }
}
export default {
  name: 'NavBar',
  components: {
    Toast
  },
  setup() {
    const { toastData, showToast } = showToastEffect()
    const { data } = NavBarEffect(showToast)
    return { data, toastData }
  }
}
</script>

<style lang="scss" scoped>
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
</style>