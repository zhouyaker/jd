<template>
  <div class="toast">
    <slot></slot>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'Toast'
}
export const showToastEffect = () => {
  const toastData = reactive({
    toastShow: false,
    toastMessage: ''
  })
  // 封装一个弹窗
  const showToast = message => {
    toastData.toastShow = true
    toastData.toastMessage = message
    setTimeout(() => {
      toastData.toastShow = false
      toastData.toastMessage = ''
    }, 1500)
  }
  return { toastData, showToast }
}
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.4);
  padding: 10rem;
  border-radius: 5rem;
  color: #fff;
}
</style>