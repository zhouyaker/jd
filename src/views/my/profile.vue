<template>
  <div class="top"></div>
  <div class="card">
    <div class="pic"></div>
  </div>
  <div class="main"></div>
  <tab-bar :currentIndex="2" />
</template>

<script>
import TabBar from '../../components/tabbar/TabBar.vue'
export default {
  name: 'Profile',
  components: {
    TabBar
  }
}
</script>

<style lang="scss" scoped>
.top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 375rem;
  height: 200rem;
  background-image: linear-gradient(239deg, #3a6ff3 0%, #50c7fb 100%);
}
.card {
  position: fixed;
  z-index: 10;
  top: 80rem;
  left: 35rem;
  width: 305rem;
  height: 250rem;
  background-color: yellow;
  .pic {
    position: absolute;
    left: 50%;
    width: 100rem;
    height: 100rem;
    transform: translate(-50%, -50%);
    border-radius: 50rem;
    background-color: pink;
  }
}
.main {
  position: fixed;
  top: 200rem;
  left: 0;
  right: 0;
  bottom: 49rem;
}
</style>