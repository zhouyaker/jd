<template>
  <div id="app">
    <router-view />
    <tab-bar />
  </div>
</template>
<script>
import TabBar from './components/tabbar/TabBar.vue'
export default {
  name: 'App',
  components: {
    TabBar
  }
}
</script>
<style lang="scss" scoped>
</style>
