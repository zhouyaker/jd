<template>
  <div class="shop">
    <h3>附近店铺</h3>
    <nearby-item v-for="(item,index) in data.shopList" :key="index" :item="item" />
    <toast v-if="toastData.toastShow">{{toastData.toastMessage}}</toast>
  </div>
</template>

<script>
import { reactive } from 'vue'
import Toast, { showToastEffect } from '../../components/toast/Toast.vue'
import NearbyItem from '../../components/shopinfo/NearbyItem.vue'

import { get } from '../../utils/request.js'

const nearbyEffect = showToast => {
  const data = reactive({
    shopList: []
  })
  const getList = async () => {
    try {
      const results = await get('/api/home/nearby')
      if (results.data.code === 0) {
        data.shopList = results.data.data
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
  name: 'NearBy',
  components: {
    Toast,
    NearbyItem
  },
  setup() {
    const { toastData, showToast } = showToastEffect()
    const { data } = nearbyEffect(showToast)
    return { data, toastData }
  }
}
</script>

<style lang="scss" scoped>
.shop {
  h3 {
    margin: 16rem 18rem 14rem;
    font-size: 18rem;
    color: #333;
  }
}
</style>