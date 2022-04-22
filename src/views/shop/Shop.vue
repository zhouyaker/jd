<template>
  <div id="shop">
    <!-- 头部搜索框 -->
    <div class="header">
      <div class="left" @click="backClick">
        <i class="back iconfont">&#xe743;</i>
      </div>
      <div class="right">
        <i class="search iconfont">&#xe62d;</i>
        <input type="text" class="input" placeholder="请输入商品名称">
      </div>
    </div>
    <!-- 店铺详情 -->
    <shop-item :item="data.item" />
    <!-- 店铺商品 -->
    <Content :classifyList="data.item.classify" />
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ShopItem from '../../components/shopinfo/NearbyItem.vue'
import Content from './Content.vue'
import { get } from '../../utils/request.js'

/**
 * 商铺信息相关逻辑
 */
const shopInfoEfffect = () => {
  const router = useRouter()
  const route = useRoute()
  const data = reactive({
    item: {}
  })
  // 获取店铺信息
  const id = route.params.id
  const getData = async () => {
    const result = await get(`/api/shop/${id}`)
    data.item = result.data.data
  }
  getData()
  const backClick = () => {
    router.back()
  }
  return { data, backClick }
}

export default {
  name: 'Shop',
  components: {
    ShopItem,
    Content
  },
  setup() {
    const { data, backClick } = shopInfoEfffect()
    return { data, backClick }
  }
}
</script>

<style lang="scss" scoped>
#shop {
  padding: 0 18rem;
  .header {
    width: 100%;
    height: 32rem;
    margin: 16rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      width: 30rem;
      color: #b6b6b6;
      font-size: 30rem;
    }
    .right {
      position: relative;
      text-align: center;
      flex: 1;
      .search {
        color: #b7b7b7;
        font-size: 20rem;
        position: absolute;
        top: 6rem;
        left: 45rem;
      }
      .input {
        width: 250rem;
        height: 32rem;
        background-color: #f5f5f5;
        border-radius: 16rem;
        padding: 0 44rem;
        box-sizing: border-box;
        font-size: 14rem;
        color: #333;
        line-height: 16rem;
      }
    }
  }
}
</style>