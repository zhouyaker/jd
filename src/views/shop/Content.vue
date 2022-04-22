<template>
  <div class="content">
    <!-- 左侧导航 -->
    <div class="left">
      <div class="left_item" :class="{active:index==data.currentIndex}" v-for="(item,index) in classifyList" :key="index" @click="leftClick(index,item.name)">{{item.text}}</div>
    </div>
    <!-- 右侧主体 -->
    <div class="right">
      <div class="right_item" v-for="(item,index) in data.classifyGoods" :key="index">
        <div class="pic">
          <img :src="item.imgUrl" alt="">
        </div>
        <div class="info">
          <div class="title">
            {{item.title}}
          </div>
          <div class="sales">月售{{item.sales}}件</div>
          <div class="price">
            <div>
              <span class="newPrice">￥{{item.newPrice}}</span>
              <span class="oldPrice"><del>￥{{item.oldPrice}}</del></span>
            </div>
            <div class="count">
              <i class="minus iconfont">&#xe780;</i>
              <span class="num">3</span>
              <i class="plus iconfont">&#xe661;</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { get } from '../../utils/request.js'

/**
 * 商品数据相关
 */
const contentEffect = () => {
  const route = useRoute()
  const data = reactive({
    currentIndex: 0,
    currentId: 1,
    currentName: 'all',
    classifyGoods: []
  })
  const shopId = route.params.id
  // 获取分类商品数据
  const getClassifyGoods = async (shopId, currentTab) => {
    const result = await get(`/api/shop/${shopId}/tab/${currentTab}`)
    data.classifyGoods = result.data.data
  }
  // 调用方法
  getClassifyGoods(shopId, 'all')
  return { shopId, data, getClassifyGoods }
}

export default {
  name: 'Content',
  props: ['classifyList'],
  setup() {
    const { shopId, data, getClassifyGoods } = contentEffect()
    const leftClick = (index, name) => {
      data.currentIndex = index
      getClassifyGoods(shopId, name)
    }
    return { data, leftClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/maxin.scss';
.content {
  position: fixed;
  display: flex;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: 153rem 0 49rem;
  .left {
    background-color: #f5f5f5;
    .left_item {
      width: 76rem;
      height: 40rem;
      font-size: 14rem;
      text-align: center;
      line-height: 40rem;
    }
  }
  .active {
    background-color: #fff;
    color: #0091ff;
  }
  .right {
    flex: 1;
    overflow-y: auto;
    background-color: #fff;
    .right_item {
      display: flex;
      border-bottom: 1px solid #f1f1f1;
      padding-bottom: 10rem;
      margin: 10rem 18rem 0 16rem;
      .pic {
        margin-right: 16rem;
        img {
          width: 68rem;
          height: 68rem;
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
        .sales {
          font-size: 12rem;
          margin-bottom: 8rem;
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
            .minus {
              color: #666;
              font-size: 20rem;
            }
            .num {
              font-size: 14rem;
              color: #333;
              margin: 0 10rem;
            }
            .plus {
              font-size: 20rem;
              color: #0091ff;
            }
          }
        }
      }
    }
  }
}
</style>