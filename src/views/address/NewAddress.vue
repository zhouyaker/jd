<template>
  <div class="top">
    <div class="icon-back" @click="backClick"><i>&#xe743;</i></div>
    <div class="title">新建收货地址</div>
  </div>
  <div class="main">
    <div><label for="city">所在城市</label>
      <input class="city" type="text" placeholder="如西安市" v-model="data.city">
    </div>
    <div><label for="area">小区/大厦/学校</label>
      <input class="area" type="text" placeholder="如西安石油大学" v-model="data.area">
    </div>
    <div>
      <label for="floor">楼号-门牌号</label>
      <input class="floor" type="text" placeholder="A楼B层" v-model="data.floor">
    </div>
    <div>
      <label for="name">收货人</label>
      <input class="name" type="text" placeholder="请填写收货人的姓名" v-model="data.name">
    </div>
    <div>
      <label for="phone">联系电话</label>
      <input class="phone" type="text" placeholder="请填写收货人的手机号" v-model="data.phone">
    </div>
    <button class="save" @click="saveClick">保存</button>
  </div>
</template>


<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Address',
  setup() {
    const router = useRouter()
    const data = reactive({
      city: '',
      area: '',
      floor: '',
      name: '',
      phone: ''
    })

    const backClick = () => {
      router.back()
    }
    const saveClick = () => {
      // 将地址保存
      const position = data.city + '-' + data.area + '-' + data.floor
      router.replace({ name: 'Address', params: { address: position, name: data.name, phone: data.phone } })
    }
    return { backClick, data, saveClick }
  }
}
</script>

<style lang="scss" scoped>
.top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 140rem;
  z-index: 10;
  background-image: linear-gradient(0deg, rgba(0, 145, 255, 0) 4%, #0091ff 50%);
  background-repeat: no-repeat;
  .icon-back {
    position: absolute;
    left: 20rem;
    top: 18rem;
    font-size: 30rem;
    color: #fff;
  }
  .title {
    text-align: center;
    padding-top: 25rem;
    font-size: 20rem;
    color: #fff;
  }
}
.main {
  position: relative;
  top: 150rem;
  width: 100%;
  height: 470rem;
  background-color: #efefef;
  text-align: center;
  border-radius: 10rem;
  padding: 10rem;
  div {
    width: 300rem;
    margin: 0 auto;
    label {
      display: block;
      text-align: left;
      color: #333;
      font-size: 20px;
      margin: 10rem 0;
    }
    input {
      width: 300rem;
      height: 35rem;
      color: #999;
      font-size: 16rem;
      border: 1px solid #999;
      padding: 10rem;
    }
  }
  .save {
    width: 300rem;
    height: 30rem;
    background-color: #5cb4fa;
    margin: 20rem 0;
    border-radius: 15rem;
  }
}
</style>