<template>
  <router-view />
</template>
<script>
export default {
  name: 'App',
  mounted() {
    window.onbeforeunload = function (e) {
      var storage = window.localStorage
      storage.clear()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
