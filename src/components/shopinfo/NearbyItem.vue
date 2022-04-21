<template>
  <div class="shop-item">
    <div class="item-left">
      <img :src="item.imgUrl" alt="">
    </div>
    <div class="item-right">
      <div class="title">{{item.title}}</div>
      <div class="info">
        <span v-for="(info_item,index) in item.tags" :key="index">{{info_item}}</span>
      </div>
      <div class="sale">
        {{item.notice}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NearbyItem',
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.shop-item {
  display: flex;
  align-items: center;
  margin-bottom: 12rem;
  .item-left {
    margin-left: 18rem;
    img {
      width: 56rem;
      height: 56rem;
      margin-right: 16rem;
    }
  }
  .item-right {
    border-bottom: 1px solid #f1f1f1;
    .title {
      margin-bottom: 8rem;
      font-size: 16rem;
      color: #333;
    }
    .info {
      display: flex;
      span {
        font-size: 13rem;
        color: #333;
        margin-right: 16rem;
        margin-bottom: 8rem;
      }
    }
    .sale {
      font-size: 13rem;
      color: #e93b3b;
      margin-bottom: 12rem;
    }
  }
}
</style>